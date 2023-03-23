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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
