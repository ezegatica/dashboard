import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const items = await prisma.item.findMany();
    if (!items) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const item = await prisma.item.create({
      data: {
        ...req.body
      }
    });
    return res.status(200).json(item);
  }
}
