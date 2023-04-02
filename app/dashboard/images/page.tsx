import React from 'react';
import { Files } from './types';
import ImageCard from './_components/ImageCard';
import AddImage from './_components/AddImage';

export const revalidate = 1;

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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Imagenes
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddImage token={process.env.SIRV_API_KEY as string}/>
        </div>
      </div>
        <ul
          role="list"
          className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {images &&
            images.contents &&
            images.contents.map(file => (
              <ImageCard image={file} key={file.filename} />
            ))}
        </ul>
      </div>
    </main>
  );
}
