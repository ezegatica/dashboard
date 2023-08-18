import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { revalidatePath } from '../../../../lib/cache';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  if (!query.id) {
    return res
      .status(400)
      .json({ error: 'Invalid ID, must be specified in query' });
  }

  const idString = Array.isArray(query.id) ? query.id.join('') : query.id;

  const id = parseInt(idString, 10);

  if (req.method === 'GET') {
    const item = await prisma.item.findUnique({
      where: {
        id
      }
    });
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(item);
  }
  if (req.method === 'PUT' || req.method === 'PATCH') {
    const item = await prisma.item.update({
      where: {
        id
      },
      data: {
        ...req.body
      }
    });
    await revalidatePath(item.slug);
    return res.status(200).json(item);
  }
  if (req.method === 'DELETE') {
    const item = await prisma.item.delete({
      where: {
        id
      }
    });
    await revalidatePath(item.slug);
    return res.status(200).json(item);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
