'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FEATURED_PRODUCTS, HEADINGS } from '../constants'

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {HEADINGS.featured.title}
          </h3>
          <p className="text-gray-600 text-lg">
            {HEADINGS.featured.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_PRODUCTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <Image 
                  src={`/images/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </div>
              <div className="mt-4">
                <h4 className="font-serif text-2xl font-bold">{item.title}</h4>
                <p className="text-gray-600">{item.color}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

