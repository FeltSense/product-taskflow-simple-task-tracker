import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow - Simple Task Tracker',
  description: 'To help individuals and small teams achieve their goals through simple, intuitive task management that eliminates overwhelm and maximizes productivity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
