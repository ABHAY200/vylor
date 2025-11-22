'use client'

import Image from 'next/image'
import { BRAND, LOGO, FOOTER_LINKS, CONTACT, COPYRIGHT } from '../constants'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src={LOGO.main}
                alt={`${BRAND.name} Logo`}
                width={40} 
                height={40}
                className="object-contain brightness-200"
              />
              <div>
                <h4 className="font-serif text-xl font-bold">{BRAND.name}</h4>
                <p className="text-xs text-gray-400">{BRAND.fullName}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {BRAND.description}
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm text-gray-400">
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
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: {CONTACT.email}</li>
              <li>Phone: {CONTACT.phone}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}

