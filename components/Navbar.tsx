'use client';
import { usePathname, useRouter } from 'next/navigation';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from './Spinner';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/public/auth/logout', {
        method: 'POST'
      });
      router.push('/login');
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      current: pathname === '/dashboard'
    },
    {
      name: 'Ventas',
      href: '/dashboard/ventas',
      current: pathname === '/dashboard/ventas'
    },
    {
      name: 'Logs',
      href: '/dashboard/logs',
      current: pathname?.startsWith('/dashboard/logs')
    },
    {
      name: 'Images',
      href: '/dashboard/images',
      current: pathname?.startsWith('/dashboard/images')
    }
  ];
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8"
                      src="https://ezegatica.com/assets/images/logo-64.png"
                      width={'64'}
                      height={'64'}
                      alt="Eze Gatica"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="
                  hidden md:block
                  flex items-center
                  space-x-4
                "
                >
                  <span
                    onClick={logout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
                  >
                    {loading ? <Spinner size="small" /> : 'Logout'}
                  </span>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Panel de Control
          </h1>
        </div>
      </header>
    </>
  );
}
