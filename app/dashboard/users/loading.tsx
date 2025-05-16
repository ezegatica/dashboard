import React from 'react';
import Spinner from '@components/Spinner';

export default function Loading() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <Spinner />
            <p className="text-sm font-medium mt-1 text-gray-500">Cargando</p>
          </div>
        </div>
      </main>
    </>
  );
}
