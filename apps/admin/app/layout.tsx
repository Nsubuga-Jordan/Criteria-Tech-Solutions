import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'UgPay Admin', description: 'Admin dashboard' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">UgPay Admin</h1>
            <a className="text-sm text-blue-600" href="/">Dashboard</a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

