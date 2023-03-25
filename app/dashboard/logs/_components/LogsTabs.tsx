'use client';

import Tabs from '@components/Tabs';
import { usePathname } from 'next/navigation';

export default function LogsTabs() {
  const pathname = usePathname();
  const tabs = [
    {
      name: 'Output',
      href: '/dashboard/logs/output',
      current: pathname === '/dashboard/logs/output'
    },
    {
      name: 'Errors',
      href: '/dashboard/logs/errors',
      current: pathname === '/dashboard/logs/errors'
    }
  ];

  return <Tabs tabs={tabs} />;
}
