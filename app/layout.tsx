import './globals.css';

export const metadata = {
  title: "<Eze page='Admin'/>",
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
        {children}
        </body>
    </html>
    );
}
