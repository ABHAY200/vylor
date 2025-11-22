'use client'

import Image from 'next/image'
import { BRAND, LOGO, FOOTER_LINKS, CONTACT, COPYRIGHT } from '../constants'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Image 
                src={LOGO.white}
                alt={`${BRAND.name} Logo`}
                width={32} 
                height={32}
                className="object-contain brightness-200 sm:w-10 sm:h-10"
              />
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold">{BRAND.name}</h4>
                <p className="text-[10px] sm:text-xs text-gray-400">{BRAND.fullName}</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs">
              {BRAND.description}
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="break-words">Email: {CONTACT.email}</li>
              <li>Phone: {CONTACT.phone}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}

