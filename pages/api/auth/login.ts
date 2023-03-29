import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const response = await fetch('https://jesse.eze.net.ar/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  const message = await response.text();

  if (response.status !== 200) {
    return res.status(401).json({ error: message });
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', message, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      path: '/'
    })
  );
  res.status(200).json({ token: message });
}
