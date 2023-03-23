import Navbar from '@components/Navbar';

export const metadata = {
  title: "<Eze page='Admin' dashboard/>",
  description: 'Página Admin'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">
        <div className="min-h-full">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
