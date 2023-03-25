import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Dashboard force login middleware
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (request.cookies.has('token')) {
      return NextResponse.next()
    }
    const url = new URL('/login', request.url)
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Default fallback
  return NextResponse.next()
}
