import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAuthURL } from './lib/urls';

export async function middleware(request: NextRequest) {
  // Dashboard force login middleware
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (request.cookies.has('token')) {
      const isValid = await validateToken(request.cookies.get('token')?.value!);
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
      const isValid = await validateToken(request.cookies.get('token')?.value!);
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

const validateToken = async (token: string): Promise<boolean> => {
  const returnable = await fetch(`${getAuthURL()}/validate?app=dashboard-local`, {
    method: 'POST',
    body: JSON.stringify({
      token
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data: {valid: boolean}) => {
      return data.valid;
    })
    .catch((err) => {
      console.error(err);
      return false;
  })

  console.log({returnable})

  return returnable;
};
