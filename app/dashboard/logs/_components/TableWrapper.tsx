import React from 'react';
import { LogsRequest } from '../../../types';
import LogTable from './LogTable';
import TableNavigator from './TableNavigator';

export default function TableWrapper({ logs, type }: { logs: LogsRequest; type: 'errors' | 'output' }) {
  return (
    <div className="mt-8 flow-root">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <TableNavigator logs={logs} type={type}/>
          <LogTable logs={logs} />
        </div>
      </div>
    </div>
  );
}
