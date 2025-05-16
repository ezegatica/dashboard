import React from 'react';
import UrlsTable from './_components/UrlTable';
import { cookies } from 'next/headers';
import { BuildSSOUsersRoute, ShortURL, getShortenerURL } from '../../../lib/urls';

export const revalidate = 0;
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function VentasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const {headers,url} = BuildSSOUsersRoute('list', token?.value || '');

  const users = await fetch(url, {
    headers,
    method: 'GET'
  })

  const data = (await users.json()) as ShortURL[];
  return (
    <main>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
