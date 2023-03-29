import React from 'react';
import TableWrapper from '../_components/TableWrapper';
import { LogsRequest } from '../../../types';

export default async function LogsOutputPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const logs: LogsRequest = await fetch(
    `https://api-bot.eze.net.ar/output?page=${searchParams?.page || 1}`,
    {
      cache: 'no-store'
    }
  ).then(res => res.json());

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Gati-Bot {'"output"'} logs
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the commands users executed, and some extra info, like
            the user, timestamp, server and interaction.
          </p>
        </div>
      </div>
      <TableWrapper logs={logs} type="output"/>
    </div>
  );
}
