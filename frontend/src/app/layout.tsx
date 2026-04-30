import type { Metadata } from 'next'
import { dmSans, fraunces } from './fonts'
// @ts-ignore - Next.js handles CSS imports natively
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ModalProvider } from '@/context/ModalContext'

export const metadata: Metadata = {
  title: "Bene'nw — Ethiopian Gift Registry",
  description: "Create your gift list, your way. Ethiopia's #1 gift registry platform.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased`}>
        <AuthProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}