import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const id = query.id as string;
  const prisma = new PrismaClient();
  const objectId = /^[a-f\d]{24}$/i;
  if (!objectId.test(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID, must follow Mongo's ObjectId format" });
  }

  if (req.method === 'GET') {
    const item = await prisma.items.findUnique({
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
    const item = await prisma.items.update({
      where: {
        id
      },
      data: {
        ...req.body
      }
    });
    return res.status(200).json(item);
  }
  if (req.method === 'DELETE') {
    const item = await prisma.items.delete({
      where: {
        id
      }
    });
    return res.status(200).json(item);
  }
  if (req.method === 'POST') {
    const item = await prisma.items.create({
      data: {
        ...req.body
      }
    });
    return res.status(200).json(item);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
