'use client';

import React from 'react';
import { UserType } from '../../../types';
import { useRouter } from 'next/navigation';
import { BuildSSOUsersRoute } from '../../../../lib/urls';

export default function UsersTable({
  items,
  token
}: {
  items: UserType[];
  token: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(false);
  const toggleRole = async (item: UserType): Promise<void> => {
    setLoading(true);
    const newRole = getRoleToSwitch(item.role);
    const { headers, url } = BuildSSOUsersRoute('change-role', token || '');
    try {
      await fetch(url.replace(':id', item.id.toString()), {
        method: 'POST',
        headers,
        body: JSON.stringify({ role: newRole })
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  function getRoleToSwitch(role: string): string {
    switch (role) {
      case 'admin':
        return 'user';
      case 'user':
        return 'admin';
      default:
        return 'user';
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Usuarios
          </h1>
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rol
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Login Method
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Operaciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-grey">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {item.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.role}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.loginMethod}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          disabled={isLoading}
                          className="disabled:opacity-50 disabled:cursor-default relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                          onClick={() => toggleRole(item)}
                        >
                          Cambiar rol a {getRoleToSwitch(item.role)}
                        </button>
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
