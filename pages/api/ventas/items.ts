import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const items = await prisma.items.findMany();
    if (!items) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const item = await prisma.items.create({
      data: {
        ...req.body
      }
    });
    return res.status(200).json(item);
  }
}
