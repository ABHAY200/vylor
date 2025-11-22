'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GALLERY_IMAGES, HEADINGS } from '../constants'
import { getImagePath } from '../lib/assets'

export default function GallerySection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
            {HEADINGS.gallery.title}
          </h3>
          <p className="text-gray-400 text-base sm:text-lg px-4">
            {HEADINGS.gallery.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl cursor-pointer"
            >
              <Image 
                src={getImagePath(`/images/${img}`)}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

