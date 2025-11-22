'use client'

import { motion } from 'framer-motion'
import { HEADINGS, SOCIAL_LINKS } from '../constants'

export default function NewsletterSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {HEADINGS.newsletter.title}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {HEADINGS.newsletter.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="px-5 sm:px-6 py-3 sm:py-4 rounded-full w-full sm:flex-1 border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              Subscribe
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-600">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                className="hover:text-black transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

