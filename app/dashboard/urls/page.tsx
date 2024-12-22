import React from 'react';
import UrlsTable from './_components/UrlTable';
import { cookies } from 'next/headers';
import { ShortURL, getShortenerURL } from '../../../lib/urls';

export const revalidate = 0;
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function VentasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const url = getShortenerURL();
  const items = await fetch(`${url}/api/url`, {
    headers: {
      Authorization: `Bearer ${token!.value}`
    },
    cache: 'no-store',
    next: {
      revalidate: 0
    }
  });
  const data = (await items.json()) as ShortURL[];
  return (
    <main>
      <UrlsTable items={data} />
    </main>
  );
}
