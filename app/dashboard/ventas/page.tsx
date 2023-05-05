import prisma from '@lib/prisma';
import React from 'react';
import ItemsTable from './_components/ItemsTable';

export const revalidate = 0;
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function VentasPage() {
  const items = await prisma.item.findMany({
    orderBy: {
      id: 'desc'
    }
  });
  return (
    <main>
      <ItemsTable items={items.map((i) => ({...i, createdAt: null, updatedAt: null}))} />
    </main>
  );
}
