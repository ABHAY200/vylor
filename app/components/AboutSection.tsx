'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ABOUT, BRAND } from '../constants'
import { getImagePath } from '../lib/assets'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {ABOUT.title}
            </h3>
            {ABOUT.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-lg mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="space-y-4">
              {ABOUT.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-black rounded-full" />
                  <span className="text-gray-800">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
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
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-2xl"
            >
              <p className="font-serif text-3xl font-bold">Est. {BRAND.established}</p>
              <p className="text-gray-600">{BRAND.establishmentTagline}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

