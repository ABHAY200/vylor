// Brand Information
export const BRAND = {
  name: 'VYLOR',
  fullName: 'The Visionary Tailor',
  tagline: 'Where vision meets craftsmanship. Premium clothing designed for those who dare to be different.',
  description: 'Crafting premium clothing for the modern visionary.',
  established: '2024',
  establishmentTagline: 'Crafting Excellence',
} as const

// Logo Images
export const LOGO = {
  main: '/images/logo-black.jpeg',
  alternate: '/images/logo-black-alternate.jpeg',
} as const

// Collection Data
export const COLLECTIONS = [
  {
    id: 'classic',
    image: 'classic-tee-charcoal.jpeg',
    title: 'Classic Collection',
    description: 'Timeless pieces for everyday elegance',
  },
  {
    id: 'urban',
    image: 'urban-tee-beige.jpeg',
    title: 'Urban Essentials',
    description: 'Modern comfort meets style',
  },
  {
    id: 'premium',
    image: 'premium-tee-golden.jpeg',
    title: 'Premium Line',
    description: 'Luxury craftsmanship at its finest',
  },
] as const

// Featured Products
export const FEATURED_PRODUCTS = [
  {
    id: 'signature-tee',
    image: 'signature-tee-sand.jpeg',
    title: 'Signature Tee',
    color: 'Sand Beige',
  },
  {
    id: 'essential-crew',
    image: 'essential-crew-grey.jpeg',
    title: 'Essential Crew',
    color: 'Stone Grey',
  },
] as const

// About Section Content
export const ABOUT = {
  title: 'The Vision Behind Vylor',
  paragraphs: [
    'Born from a passion for exceptional craftsmanship and timeless design, Vylor represents more than just clothing—it\'s a statement of individuality.',
    'Every piece is thoughtfully designed to empower those who wear it, blending premium materials with meticulous attention to detail.',
  ],
  features: [
    'Premium quality fabrics',
    'Timeless, versatile designs',
    'Sustainable craftsmanship',
    'Limited edition collections',
  ],
  image: 'lifestyle-beige-outdoor.jpeg',
  imageAlt: 'About Vylor',
} as const

// Gallery Images
export const GALLERY_IMAGES = [
  'gallery-beige-oversized.jpeg',
  'gallery-lavender-oversized.jpeg',
  'gallery-colorful-collection.jpeg',
  'logo-black-alternate.jpeg',
  'gallery-brown-tee-lifestyle.jpeg',
  'gallery-black-gold-typography.jpeg',
  'gallery-black-gold-white-tees.jpeg',
  'gallery-visionary-tailor-tee.jpeg',
] as const

// Navigation Links
export const NAV_LINKS = [
  { href: '#collection', label: 'Collection' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Facebook', href: '#', icon: 'facebook' },
] as const

// Contact Information
export const CONTACT = {
  email: 'info@vylor.com',
  phone: '+1 (555) 123-4567',
} as const

// Section Headings
export const HEADINGS = {
  collection: {
    title: 'Our Collection',
    subtitle: 'Meticulously crafted pieces that blend timeless elegance with modern aesthetics',
  },
  featured: {
    title: 'Featured Pieces',
    subtitle: 'Signature styles that define our brand',
  },
  gallery: {
    title: 'Style Gallery',
    subtitle: 'Discover the Vylor aesthetic',
  },
  newsletter: {
    title: 'Join the Vision',
    subtitle: 'Be the first to know about new collections, exclusive releases, and special events.',
  },
} as const

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { href: '#collection', label: 'Collection' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ],
} as const

// Copyright
export const COPYRIGHT = `© ${new Date().getFullYear()} Vylor - The Visionary Tailor. All rights reserved.`

