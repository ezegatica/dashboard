import React from 'react';
import { LinkIcon } from '@heroicons/react/20/solid';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import Link from 'next/link';
import { ShortURL, getShortenerURL } from '../../../../lib/urls';
import CopyButton from './CopyButton';

export default function UrlsTable({ items }: { items: ShortURL[] }) {
  async function getTargetUrl(name: string) {
    const req = await fetch(`${getShortenerURL()}/${name}.json`);
    // if data is not json then its text
    if (req.headers.get('content-type')?.includes('application/json')) {
      const data = await req.json();
      return data.url;
    }
    return req.text();
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            URLs
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddButton />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Target
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Link
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Views
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-grey">
                {items.map(item => (
                  <tr key={item.name}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {getTargetUrl(item.name)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        href={`${getShortenerURL()}/${item.name}`}
                        className="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkIcon
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                          aria-hidden="true"
                        />
                        <span>Go to site</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(item.metadata.created).toLocaleString("es-AR")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.metadata.count}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <CopyButton itemName={item.name} />
                        <DeleteButton itemName={item.name} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
