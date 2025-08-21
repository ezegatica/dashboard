import React from 'react';
import { cookies } from 'next/headers';
import { BuildSSOUsersRoute } from '../../../lib/urls';
import UsersTable from './_components/UsersTable';

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

  const data = (await users.json());
  return (
    <main>
      <UsersTable items={data} token={token!.value} />
    </main>
  );
}
