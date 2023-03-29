'use client';

import ErrorPage from "@components/Error";

function ErrorsErrorPage({error}: {error: {message: string}}) {
  return <ErrorPage error={error} />;
}

export default ErrorsErrorPage;