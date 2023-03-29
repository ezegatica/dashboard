import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Dashboard force login middleware
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (request.cookies.has('token')) {
      return NextResponse.next();
    }
    const url = new URL('/login', request.url);
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // API ventas middleware
  if (request.nextUrl.pathname.startsWith('/api/ventas')) {
    if (request.cookies.has('token')) {
      const response = await fetch(`https://jesse.eze.net.ar/check`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${request.cookies.get('token')?.value}`
        }
      }).then(res => res.json());
      if (response.valid) {
        return NextResponse.next();
      } else {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
          status: 403
        });
      }
    }
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401
    });
  }

  // Default fallback
  return NextResponse.next();
}
