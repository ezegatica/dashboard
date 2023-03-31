import React from 'react';
import { Files } from './types';
import Image from 'next/image';

export default async function ImagesPage() {
  const images: Files = await fetch(
    'https://api.sirv.com/v2/files/readdir?dirname=%2Fimg',
    {
      headers: {
        Authorization: `Bearer ${process.env.SIRV_API_KEY}`
      }
    }
  ).then(response => response.json());

  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {images &&
            images.contents &&
            images.contents.map(file => (
              <li key={file.filename} className="relative">
                <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <Image
                    src={`https://gatica.sirv.com/img/${file.filename}`}
                    alt=""
                    className="pointer-events-none object-cover group-hover:opacity-75"
                    width={500}
                    height={500}
                    quality={25}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {file.filename}
                    </span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {file.filename}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
