'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FEATURED_PRODUCTS, HEADINGS } from '../constants'
import { getImagePath } from '../lib/assets'

export default function FeaturedProducts() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
            {HEADINGS.featured.title}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            {HEADINGS.featured.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FEATURED_PRODUCTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5]">
                <Image 
                  src={getImagePath(`/images/${item.image}`)}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </div>
              <div className="mt-3 sm:mt-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold">{item.title}</h4>
                <p className="text-gray-600 text-sm sm:text-base">{item.color}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

