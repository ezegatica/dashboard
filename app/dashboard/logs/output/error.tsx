'use client';

import ErrorPage from "@components/Error";

function OutputErrorPage({ error }: { error: { message: string } }) {
  return <ErrorPage error={error} />;
}

export default OutputErrorPage;
