import React from 'react';
import { FileContent } from '../types';
import Image from 'next/image';

export default function ImageCard({ image }: { image: FileContent }) {
  return (
    <li key={image.filename} className="relative">
      <a href={`https://i.ezegatica.com/${image.filename}`} target="_blank">
        <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            src={`https://i.ezegatica.com/${image.filename}`}
            alt=""
            className="pointer-events-none object-cover group-hover:opacity-75"
            width={400}
            height={400}
            quality={25}
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {image.filename}</span>
          </button>
        </div>
      </a>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {image.filename}
      </p>
      <p className="pointer-events-none block text-sm font-medium text-gray-500">
        {(image.size / (1024 * 1024)).toFixed(2)} MB
      </p>
    </li>
  );
}
