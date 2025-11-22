'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BRAND, LOGO, NAV_LINKS } from '../constants'

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <Image 
            src={LOGO.main}
            alt={`${BRAND.name} Logo`}
            width={40} 
            height={40}
            className="object-contain"
          />
          <div>
            <h1 className="font-serif text-xl font-bold">{BRAND.name}</h1>
            <p className="text-xs text-gray-600">{BRAND.fullName}</p>
          </div>
        </motion.div>
        <div className="hidden md:flex space-x-8 text-sm">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="hover:text-gray-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

