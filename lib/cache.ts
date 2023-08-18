import { get } from '@vercel/edge-config';

export const revalidateRoot = async () => {
  const secret = await get('secret');
  const url = getVentasURL();
  console.info(`Revalidating root in ${url}`);

  const res = await fetch(`${url}/api/revalidate?secret=${secret}`, {
    method: 'POST'
  });
  const json = await res.json();
  console.info({ res: json });
  return res;
};

export const revalidatePath = async (path: string) => {
  const secret = await get('secret');
  const url = getVentasURL();
  console.info(`Revalidating path ${path} in ${url}`);

  const res = await fetch(
    `${url}/api/revalidate?secret=${secret}&path=${path}`,
    {
      method: 'POST'
    }
  );
  const json = await res.json();
  console.info({ res: json });

  return res;
};

const getVentasURL = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'development':
    case 'preview':
      return 'https://ventas.preview.ezegatica.com';
    case 'production':
      return 'https://ventas.ezegatica.com';
    default:
      console.warn("No VERCEL_ENV entry found, using 'http://localhost:3000' > " + process.env.NEXT_PUBLIC_VERCEL_ENV)
      return 'http://localhost:3000';
  }
};
