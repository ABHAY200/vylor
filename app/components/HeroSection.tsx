'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BRAND, LOGO } from '../constants'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 pt-20 sm:pt-0">
      <motion.div 
        style={{ opacity, scale }}
        className="text-center z-10 px-4 sm:px-6 py-8 sm:py-0"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <Image 
            src={LOGO.main}
            alt={`${BRAND.name} Logo`}
            width={100} 
            height={100}
            className="mx-auto sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px]"
          />
        </motion.div>
        
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          {BRAND.fullName}
        </motion.h2>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 leading-relaxed"
        >
          {BRAND.tagline}
        </motion.p>
        
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-800 transition-all w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          Explore Collection
        </motion.button>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-gray-200/30 to-transparent rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-gray-200/30 to-transparent rounded-full"
        />
      </div>
    </section>
  )
}

