import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentic Product Builder',
  description: 'Research niches and generate digital products automatically.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}
