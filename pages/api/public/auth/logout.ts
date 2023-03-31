// Make a proxy to jesse.eze.net.ar/login

import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
