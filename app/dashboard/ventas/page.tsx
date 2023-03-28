import { PrismaClient } from '@prisma/client';
import React from 'react';
import ItemsTable from './_components/ItemsTable';

export default async function VentasPage() {
  const prisma = new PrismaClient();
  const items = await prisma.items.findMany();
  return (
    <main>
      <ItemsTable items={items} />
    </main>
  );
}
