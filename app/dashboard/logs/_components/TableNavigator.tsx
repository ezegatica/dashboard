import Link from 'next/link';
import React from 'react';
import { LogsRequest } from '../../../types';

export default function TableNavigator({
  logs,
  type
}: {
  logs: LogsRequest;
  type: 'errors' | 'output';
}) {
  return logs.data.length ? (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-gray-300 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">
            {logs.page * logs.perPage - logs.perPage + 1}
          </span>{' '}
          to <span className="font-medium">{logs.page * logs.perPage}</span> of{' '}
          <span className="font-medium">{logs.totalLogs}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={logs.page <= 1}
          aria-disabled={logs.page <= 1}
          className="disabled:opacity-50 disabled:cursor-default relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          <Link
            aria-disabled={logs.page <= 1}
            href={`/dashboard/logs/${type}?page=${
              logs.page > 1 ? logs.page - 1 : '1'
            }`}
          >
            Previous
          </Link>
        </button>
        <button
          disabled={logs.page >= logs.totalPages}
          aria-disabled={logs.page <= 1}
          className="disabled:opacity-50 relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          <Link
            href={`/dashboard/logs/${type}?page=${
              logs.page < logs.totalPages ? logs.page + 1 : logs.totalPages
            }`}
            aria-disabled={logs.page <= 1}
          >
            Next
          </Link>
        </button>
      </div>
    </nav>
  ) : null;
}
