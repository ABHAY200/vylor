import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://vylor.in'),
  title: {
    default: 'Vylor - The Visionary Tailor',
    template: '%s | Vylor'
  },
  description: 'Where vision meets craftsmanship. Premium clothing designed for those who dare to be different. Discover timeless style with Vylor.',
  keywords: ['fashion', 'clothing', 'premium', 'tailor', 'vylor', 'streetwear', 'lifestyle', 'visionary tailor', 'custom design'],
  authors: [{ name: 'Vylor' }],
  creator: 'Vylor',
  publisher: 'Vylor',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vylor.in',
    siteName: 'Vylor',
    title: 'Vylor - The Visionary Tailor',
    description: 'Premium clothing brand crafted with vision and precision. Discover timeless style with Vylor.',
    images: [
      {
        url: '/images/logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Vylor - The Visionary Tailor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vylor - The Visionary Tailor',
    description: 'Premium clothing brand crafted with vision and precision.',
    images: ['/images/logo-black.png'],
  },
  icons: {
    icon: '/images/logo-black.png',
    apple: '/images/logo-black.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

