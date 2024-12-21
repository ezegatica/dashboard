'use server';

import { cookies } from 'next/headers';
import { RequestURL, getShortenerURL } from '../../../lib/urls';

export async function createUrl(formData: RequestURL) {
  const cookie = await cookies();
  const authCookie = cookie.get('token')!.value;
  await fetch(`${getShortenerURL()}/api/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authCookie}`
    },
    body: JSON.stringify(formData)
  });
}

export async function deleteUrl(slug: string) {
    const cookie = await cookies();
    const authCookie = cookie.get('token')!.value;
    await fetch(`${getShortenerURL()}/api/url/${slug}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authCookie}`
        }
    });
}