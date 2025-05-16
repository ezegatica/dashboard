import Image from 'next/image';
import React, { type JSX } from 'react';
import { KeyIcon } from '@heroicons/react/24/outline';

export default async function LoginPage(): Promise<JSX.Element> {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-green-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-24 w-auto"
            src="https://ezegatica.com/assets/images/logo-256.png"
            width={'256'}
            height={'256'}
            alt="Eze Gatica"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Dashboard
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-gray-100 px-6 pb-6 pt-2 shadow sm:rounded-lg sm:px-12">
            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-gray-100 px-6 text-gray-900">
                    Iniciar sesión con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <a href="/api/public/auth/login">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-black/90 focus-visible:outline-wh px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 "
                  >
                    <KeyIcon className="h-5 w-5 text-white" />
                    <span className="text-sm font-semibold leading-6">
                      SSO (admin-only)
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
