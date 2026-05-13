import './globals.css';

import type { Metadata } from 'next';

import { AuthProvider } from '@/context/AuthContext';
import { ModalProvider } from '@/context/ModalContext';

export const metadata: Metadata = {
  title: "Bene'nw",
  description: 'Gift registry platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
          <ModalProvider>

            {children}

          </ModalProvider>
        </AuthProvider>

      </body>
    </html>
  );
}