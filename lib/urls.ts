export const getShortenerURL = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'development':
    case 'preview':
    case 'production':
      return 'https://eze.net.ar';
    default:
      return 'http://127.0.0.1:8788';
  }
};

export const getAuthURL = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'development':
    case 'preview':
    case 'production':
      return 'https://sso.eze.net.ar';
    default:
      return 'http://127.0.0.1:8787';
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
