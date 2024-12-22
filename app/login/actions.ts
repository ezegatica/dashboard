'use server';
import { cookies } from 'next/headers';
import { User } from '../types';

export async function loginUser(user: User): Promise<void> {
  const response = await fetch('https://jesse.eze.net.ar/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  const message = await response.text();

  if (response.status !== 200) {
    throw new Error(message);
  }
  const cookieJar = await cookies();
  cookieJar.set('token', message, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    path: '/',
    sameSite: 'strict'
  });
}
