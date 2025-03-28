'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { User, IError } from '../types';
import { useRouter } from 'next/navigation';
import Toast from '@components/Toast';
import Spinner from '@components/Spinner';
import { loginUser } from './actions';

export const dynamic = 'force-dynamic';

export default function Login() {
  // const searchParams = useSearchParams(); // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  const router = useRouter();

  const [error, setError] = useState<IError>({
    message: '',
    show: false
  });

  const [loading, setLoading] = useState<boolean>(false);

  const login = async (formData: FormData) => {
    const user: User = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };
    setLoading(true);
    try {
      await loginUser(user);

      // if (searchParams?.has('next')) {
      //   return router.push(searchParams.get('next') || '/dashboard');
      // }
      router.push('/dashboard');
    } catch (error: any) {
      console.log(error);
      setError({ message: error.message, show: true });
    } finally {
      setLoading(false);
    }
  };

  const hideError = () => {
    if (error.show) {
      setError({ message: '', show: false });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-12 w-auto"
            src="https://ezegatica.com/assets/images/logo-64.png"
            width={'64'}
            height={'64'}
            alt="Eze Gatica"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action={login} onChange={hideError}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus:outline-none disabled:opacity-50"
                >
                  {loading ? <Spinner size="small" /> : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toast
        title="Login failed!"
        message={error.message}
        onClose={hideError}
        show={error.show}
        variant="error"
      />
    </>
  );
}
