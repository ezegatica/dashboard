import LogsTabs from './_components/LogsTabs';

export default function DashboardLogsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LogsTabs />
      {children}
    </>
  );
}
