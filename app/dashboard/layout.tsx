import Navbar from '@components/Navbar';

export const metadata = {
  title: "<Eze page='Admin' dashboard/>",
  description: 'Página Admin'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <Navbar />
      {children}
    </div>
  );
}
