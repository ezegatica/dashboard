// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (request.cookies.has('token')) {
      return NextResponse.next()
    }
    const url = new URL('/login', request.url)
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/dashboard/:path*',
// }