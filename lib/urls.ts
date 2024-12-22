export const getShortenerURL = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'development':
    case 'preview':
    case 'production':
      return 'https://eze.net.ar';
    default:
      return 'http://localhost:8787';
  }
};

export type ShortURL = {
    name: string;
    metadata: {
        count: number
        created: string;
    }
};

export type RequestURL = {
    slug: string;
    url: string;
}
