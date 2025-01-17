'use server';
import { get } from '@vercel/edge-config';

export const revalidateRoot = async () => {
  const secret = await get('secret');
  const url = getVentasURL();
  console.info(`Revalidating root in ${url}`);

  const revalidateUrl = new URL(
    `${url}/api/revalidate`
  );
  revalidateUrl.searchParams.append('secret', secret?.toString() || '');

  const res = await fetch(revalidateUrl, {
    method: 'POST'
  });
  
  if (!res.ok) {
    console.error({ res });
    if (res.body) {
      const text = await res.text();
      console.error({ res: text });
    }
    throw res;
  }

  if (res.headers.get('content-type')?.includes('application/json')) {
    const json = await res.json();
    console.info({ res: json });
  } else {
    const text = await res.text();
    console.info({ res: text });
  }

  return res;
};

export const revalidatePath = async (path: string) => {
  const secret = await get('secret');

  console.log({ secret });

  const url = getVentasURL();
  console.info(`Revalidating path ${path} in ${url}`);

  const revalidateUrl = new URL(
    `${url}/api/revalidate`
  );

  revalidateUrl.searchParams.append('secret', secret?.toString() || '');
  revalidateUrl.searchParams.append('path', `/p/${path}`);

  console.log({revalidateUrl});

  const res = await fetch(revalidateUrl, {
    method: 'POST'
  });

  if (!res.ok) {
    console.error({ res });
    if (res.body) {
      const text = await res.text();
      console.error({ res: text });
    }
    throw res;
  }

  if (res.headers.get('content-type')?.includes('application/json')) {
    const json = await res.json();
    console.info({ res: json });
  } else {
    const text = await res.text();
    console.info({ res: text });
  }

  return res;
};

export async function revalidateAll() {
  const secret = await get('secret');
  const url = getVentasURL();
  console.info(`Revalidating <ALL> in ${url}`);

  const res = await fetch(
    `${url}/api/revalidate?secret=${secret}&path="/p/[slug]"`,
    {
      method: 'POST'
    }
  );
  const json = await res.json();
  console.info({ res: json });
}

const getVentasURL = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'development':
    case 'preview':
      return 'https://ventas.preview.ezegatica.com';
    case 'production':
      return 'https://ventas.ezegatica.com';
    default:
      return 'http://localhost:3000';
  }
};
