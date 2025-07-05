import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web App - Full-Stack Monorepo',
  description: 'A modern full-stack application built with Next.js and FastAPI',
  keywords: ['Next.js', 'FastAPI', 'TypeScript', 'Python', 'Full-stack'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Web App - Full-Stack Monorepo',
    description: 'A modern full-stack application built with Next.js and FastAPI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web App - Full-Stack Monorepo',
    description: 'A modern full-stack application built with Next.js and FastAPI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}