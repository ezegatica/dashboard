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

export const SSOUsersApiURLBase = `${getAuthURL()}/users`;
export const SSOUsersRoutes = {
  list: `${SSOUsersApiURLBase}/`,
  "change-role": `${SSOUsersApiURLBase}/:id/change-role`,
} as const;
export const BuildSSOUsersRoute = (endpoint: keyof typeof SSOUsersRoutes, token: string) => {
  const fullURL = SSOUsersRoutes[endpoint];
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');
  return {
    url: fullURL,
    headers
  }
};

export const buildSSOURL = (action: 'validate' | 'login' | 'logout' | 'revoke'): string => {
  const baseURL = getAuthURL();
  const appName = process.env.NEXT_PUBLIC_SSO_APP_NAME || 'dashboard';
  
  const returnURL = new URL(baseURL);
  returnURL.pathname = action;
  returnURL.searchParams.set('app', appName);
  console.log({returnURL: returnURL.toString()})
  return returnURL.toString();
}

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
