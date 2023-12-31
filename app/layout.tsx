import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ToasterProvider from '@/components/providers/toaster-provider'
import AuthProvider from '@/components/providers/auth-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Un clone de Messenger de la empresa Facebook',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToasterProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
