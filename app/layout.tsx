import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'মিটার টোকেন হেল্পার | Meter220',
  description: 'প্রিপেইড মিটারে সহজে টোকেন প্রবেশ করান',
  openGraph: {
    title: 'মিটার টোকেন হেল্পার',
    description: 'প্রিপেইড মিটারে সহজে টোকেন প্রবেশ করান',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
