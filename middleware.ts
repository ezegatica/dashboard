import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Dashboard force login middleware
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (request.cookies.has('token')) {
      const isValid = await validateToken(request.cookies.get('token')?.value);
      if (isValid) {
        return NextResponse.next();
      } else {
        const url = new URL('/login', request.url);
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }
    const url = new URL('/login', request.url);
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // API not public middleware
  if (
    request.nextUrl.pathname.startsWith('/api') &&
    !request.nextUrl.pathname.startsWith('/api/public')
  ) {
    if (request.cookies.has('token')) {
      const isValid = await validateToken(request.cookies.get('token')?.value);
      if (isValid) {
        return NextResponse.next();
      } else {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
          status: 403
        });
      }
    } else {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401
      });
    }
  }

  // Default fallback
  return NextResponse.next();
}

const validateToken = async (token?: string): Promise<boolean> => {
  const response = await fetch(`https://jesse.eze.net.ar/check`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
  return response.valid;
};
