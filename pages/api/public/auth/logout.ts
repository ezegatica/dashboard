// Make a proxy to jesse.eze.net.ar/login

import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';
import { getAuthURL } from '../../../../lib/urls';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const token = req.cookies['token']
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await fetch(`${getAuthURL()}/revoke`, {
    method: 'POST',
    body: JSON.stringify({
      access_token: token
    })
  });

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/'
    })
  );
  res.status(200).json({ done: true });
}
