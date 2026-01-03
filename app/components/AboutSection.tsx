'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ABOUT, BRAND } from '../constants'
import { getImagePath } from '../lib/assets'

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {ABOUT.title}
            </h3>
            {ABOUT.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
              {ABOUT.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                  <span className="text-gray-800 text-sm sm:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4]">
              <Image 
                src={getImagePath(`/images/${ABOUT.image}`)}
                alt={ABOUT.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl max-w-[160px] sm:max-w-none"
            >
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">Est. {BRAND.established}</p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">{BRAND.establishmentTagline}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

