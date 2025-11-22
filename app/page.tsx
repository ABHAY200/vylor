'use client'

import { useEffect, useState } from 'react'
import {
  Navigation,
  HeroSection,
  CollectionSection,
  FeaturedProducts,
  AboutSection,
  GallerySection,
  NewsletterSection,
  Footer,
} from './components'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CollectionSection />
      <FeaturedProducts />
      <AboutSection />
      <GallerySection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
