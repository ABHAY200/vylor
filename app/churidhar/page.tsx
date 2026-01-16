'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CHURIDHAR_PRODUCTS } from '../constants'
import { Navigation, Footer, WhatsAppCard } from '../components'

export default function ChuridharListing() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section for Category */}
      <section className="pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors group"
            >
              <svg 
                className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Womens Churidhar Collection
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover our exquisite range of Churidhar materials and sets, 
              crafted with premium fabrics and traditional patterns for the modern visionary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
            {(CHURIDHAR_PRODUCTS || []).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                      Out of Stock
                    </div>
                  )}
                  <motion.div 
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 px-4"
                  >
                    <button className="w-full bg-white text-black py-3 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </motion.div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-lg font-bold group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                    {/* <span className="font-semibold text-lg">
                      ₹{product.price.toLocaleString()}
                    </span> */}
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>{product.fabric}</span>
                    <span>•</span>
                    <span>{product.occasion}</span>
                    <span>•</span>
                    <span>{product.lengthMeters}m</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div 
                      className="w-3 h-3 rounded-full border border-gray-200" 
                      style={{ backgroundColor: product.color.toLowerCase().replace(' ', '') }}
                    />
                    <span className="text-xs text-gray-400">{product.color}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <WhatsAppCard />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
