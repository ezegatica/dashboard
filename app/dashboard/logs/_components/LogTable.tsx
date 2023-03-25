import { LogsRequest } from '../../types';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LogTable({ logs }: { logs: LogsRequest }) {
  return {
    ...(logs.data.length !== 0 ? (
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-0 z-10 border-b border-gray-300 bg-gray-300 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
            >
              <span className="lg:hidden">Date & Message</span>
              <span className="hidden lg:inline">Date</span>
            </th>
            <th
              scope="col"
              className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
            >
              Message
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {logs.data.map((log, logIdx) => (
            <tr key={logIdx}>
              <td
                className={classNames(
                  logIdx !== logs.data.length - 1
                    ? 'border-b border-gray-200'
                    : '',
                  'max-w-0 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900'
                )}
              >
                <span
                  data-te-toggle="tooltip"
                  title={`UTC: ${log.timestamp.toString()}`}
                >
                  {new Date(log.timestamp).toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires'
                  })}{' '}
                </span>
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Message</dt>
                  <dd className="mt-1 truncate text-gray-700">{log.message}</dd>
                </dl>
              </td>
              <td
                // className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                className={classNames(
                  logIdx !== logs.data.length - 1
                    ? 'border-b border-gray-200'
                    : '',
                  'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell'
                )}
              >
                {log.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          No hay logs para mostrar
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Aún no hay logs para mostrar. Intentá más tarde.
        </p>
      </div>
    ))
  };
}
