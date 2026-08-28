import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kalingga Bangkit',
  description: 'Architecture and Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
