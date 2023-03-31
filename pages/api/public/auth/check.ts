import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch('https://jesse.eze.net.ar/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.cookies?.token}`
    }
  }).then(res => res.json());
  return res.json({
    valid: response.valid
  });
}
