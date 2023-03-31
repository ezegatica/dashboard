import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log("OMSODEASDASD")
    const images = await fetch(
      'https://api.sirv.com/v2/files/readdir?dirname=%2Fimg',
      {
        headers: {
          Authorization: `Bearer ${process.env.SIRV_API_KEY}`
        }
      }
    ).then(response => response.json());
    console.log({ images });
    return res.json(images);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
