import type { Metadata } from 'next';
import { AuthProvider } from '@/providers/auth-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow - Simple Task Tracker',
  description: 'To provide the simplest yet effective task tracking experience that helps users stay organized and productive without getting lost in feature complexity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
