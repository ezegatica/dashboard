// Make a proxy to jesse.eze.net.ar/login

import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      path: '/'
    })
  );
  res.status(200).json({ done: true });
}
