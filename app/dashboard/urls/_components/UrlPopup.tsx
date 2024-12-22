'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Spinner from '@components/Spinner';
import { useRouter } from 'next/navigation';
import { RequestURL, getShortenerURL } from '../../../../lib/urls';
import { createUrl } from '../actions';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function UrlPopup({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  const router = useRouter();
  const [data, setData] = useState<RequestURL>({
    slug: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      await createUrl(data);
      setData({
        slug: '',
        url: ''
      });
      // After create, refresh the page
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                    onSubmit={onSubmit}
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Nueva URL
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Acortá una url y eso
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Item Slug */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="nombre"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              URL Corta
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="mt-2 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                eze.net.ar/
                              </span>
                              <input
                                type="text"
                                name="slug"
                                id="slug"
                                required
                                value={data.slug}
                                onChange={onChange}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="video1"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Url target */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="nombre"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Destino
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="url"
                              name="url"
                              id="url"
                              value={data.url}
                              onChange={onChange}
                              required
                              placeholder='https://www.youtube.com/watch?v=...'
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="disabled:opacity-50 disabled:cursor-default inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loading ? <Spinner size="small" /> : 'Create'}
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
