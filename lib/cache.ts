import { get } from '@vercel/edge-config';

export const revalidateRoot = async () => {
  const secret = await get('secret');
  const url = getVentasURL();
  console.log(`Revalidating root in ${url}`);

  const res = await fetch(`${url}/api/revalidate?secret=${secret}`, {
    method: 'POST'
  });
  const json = await res.json();
  console.log({ res:  json });
  return res;
};

export const revalidatePath = async (path: string) => {
  const secret = await get('secret');
  const url = getVentasURL();
  console.log(`Revalidating path ${path} in ${url}`);

  const res = await fetch(
    `${url}/api/revalidate?secret=${secret}&path=${path}`,
    {
      method: 'POST'
    }
  );
  const json = await res.json();
  console.log({ res:  json });

  return res;
};

const getVentasURL = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'https://ventas.preview.ezegatica.com';
    case 'production':
      return 'https://ventas.ezegatica.com';
    default:
      return 'http://localhost:3000';
  }
};
