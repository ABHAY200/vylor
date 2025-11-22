'use client'

import { motion } from 'framer-motion'
import { HEADINGS, SOCIAL_LINKS } from '../constants'

export default function NewsletterSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            {HEADINGS.newsletter.title}
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {HEADINGS.newsletter.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full w-full sm:w-80 border border-gray-300 focus:outline-none focus:border-black transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Subscribe
            </motion.button>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-gray-600">
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

