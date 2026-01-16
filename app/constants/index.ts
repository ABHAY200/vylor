import { getImagePath } from "../lib/assets";

// Brand Information
export const BRAND = {
  name: "VYLOR",
  fullName: "The Visionary Tailor",
  tagline:
    "Where vision meets craftsmanship. Premium clothing designed for those who dare to be different.",
  description: "Crafting premium clothing for the modern visionary.",
  established: "2024",
  establishmentTagline: "Crafting Excellence",
} as const;

// Logo Images
export const LOGO = {
  main: getImagePath("/images/logo-black.png"),
  white: getImagePath("/images/logo-white.png"),
  alternate: getImagePath("/images/logo-black-alternate.png"),
} as const;

// Collection Data
export const COLLECTIONS = [
  {
    id: "classic",
    image: "classic-tee-charcoal.jpeg",
    title: "Classic Collection",
    description: "Timeless pieces for everyday elegance",
  },
  {
    id: "urban",
    image: "urban-tee-beige.jpeg",
    title: "Urban Essentials",
    description: "Modern comfort meets style",
  },
  {
    id: "premium",
    image: "premium-tee-golden.jpeg",
    title: "Premium Line",
    description: "Luxury craftsmanship at its finest",
  },
] as const;

// Featured Products
export const FEATURED_PRODUCTS = [
  {
    id: "signature-tee",
    image: "signature-tee-sand.jpeg",
    title: "Signature Tee",
    color: "Sand Beige",
  },
  {
    id: "essential-crew",
    image: "essential-crew-grey.jpeg",
    title: "Essential Crew",
    color: "Stone Grey",
  },
] as const;

// About Section Content
export const ABOUT = {
  title: "The Vision Behind Vylor",
  paragraphs: [
    "Born from a passion for exceptional craftsmanship and timeless design, Vylor represents more than just clothing—it's a statement of individuality.",
    "Every piece is thoughtfully designed to empower those who wear it, blending premium materials with meticulous attention to detail.",
  ],
  features: [
    "Premium quality fabrics",
    "Timeless, versatile designs",
    "Sustainable craftsmanship",
    "Limited edition collections",
  ],
  image: "lifestyle-beige-outdoor.jpeg",
  imageAlt: "About Vylor",
} as const;

// Gallery Images
export const GALLERY_IMAGES = [
  "gallery-beige-oversized.jpeg",
  "gallery-lavender-oversized.jpeg",
  "gallery-colorful-collection.jpeg",
  "logo-black-alternate.jpeg",
  "gallery-brown-tee-lifestyle.jpeg",
  "gallery-black-gold-typography.jpeg",
  "gallery-black-gold-white-tees.jpeg",
  "gallery-visionary-tailor-tee.jpeg",
] as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/#collection", label: "Collection" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/balan_ajai333",
    icon: "instagram",
  },
  { name: "Twitter", href: "#", icon: "twitter" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/17ndSnb3Qe/?mibextid=wwXIfr",
    icon: "facebook",
  },
] as const;

// Contact Information
export const CONTACT = {
  email: "ajaibalan@333gmail.com",
  phone: "+1(647) 554-4344",
  whatsapp: "+91 9074434078",
  whatsappLink: "https://wa.me/919074434078",
} as const;

// Section Headings
export const HEADINGS = {
  collection: {
    title: "Our Collection",
    subtitle:
      "Meticulously crafted pieces that blend timeless elegance with modern aesthetics",
  },
  featured: {
    title: "Featured Pieces",
    subtitle: "Signature styles that define our brand",
  },
  gallery: {
    title: "Style Gallery",
    subtitle: "Discover the Vylor aesthetic",
  },
  newsletter: {
    title: "Join the Vision",
    subtitle:
      "Be the first to know about new collections, exclusive releases, and special events.",
  },
} as const;

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { href: "/#collection", label: "Collection" },
    { href: "/#about", label: "About Us" },
    { href: "/#contact", label: "Contact" },
  ],
} as const;

// Copyright
export const COPYRIGHT = `© ${new Date().getFullYear()} Vylor - The Visionary Tailor. All rights reserved.`;

// Churidhar Data
export const CHURIDHAR_PRODUCTS = [
  {
    id: 1,
    name: "Cream Floral Bouquet Churidhar",
    fabric: "Cotton",
    color: "Cream",
    price: 1290,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_7994.jpg?raw=true",
  },
  {
    id: 2,
    name: "Mauve Embroidered Border Churidhar",
    fabric: "Cotton",
    color: "Mauve",
    price: 1499,
    lengthMeters: 4,
    occasion: "Festive",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_7996.jpg?raw=true",
  },
  {
    id: 3,
    name: "Sage Green Floral Churidhar",
    fabric: "Cotton",
    color: "Sage Green",
    price: 1190,
    lengthMeters: 4,
    occasion: "Daily Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_7997.jpg?raw=true",
  },
  {
    id: 4,
    name: "Lavender Blossom Churidhar",
    fabric: "Cotton",
    color: "Lavender",
    price: 1090,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: false,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_7998.jpg?raw=true",
  },
  {
    id: 5,
    name: "Sage Leaf Pattern Churidhar",
    fabric: "Cotton",
    color: "Sage Green",
    price: 1899,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_7999.jpg?raw=true",
  },
  {
    id: 6,
    name: "Steel Blue Ethnic Churidhar",
    fabric: "Cotton",
    color: "Steel Blue",
    price: 1699,
    lengthMeters: 4,
    occasion: "Festive",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8002.jpg?raw=true",
  },
  {
    id: 7,
    name: "Olive Green Classic Churidhar",
    fabric: "Cotton",
    color: "Olive Green",
    price: 1399,
    lengthMeters: 4,
    occasion: "Daily Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8003.jpg?raw=true"
  },
  {
    id: 8,
    name: "Peach Rose Lace Churidhar",
    fabric: "Cotton",
    color: "Peach",
    price: 1499,
    lengthMeters: 4,
    occasion: "Traditional",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8006.jpg?raw=true"
  },
  {
    id: 9,
    name: "Wine Floral Embroidered Churidhar",
    fabric: "Cotton",
    color: "Wine",
    price: 1599,
    lengthMeters: 4,
    occasion: "Festive",
    inStock: false,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8007.jpg?raw=true"
  },
  {
    id: 10,
    name: "Sea Green Neck Embroidered Churidhar",
    fabric: "Cotton",
    color: "Sea Green",
    price: 2499,
    lengthMeters: 4,
    occasion: "Party Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8009.jpg?raw=true"
  },
  {
    id: 11,
    name: "Lavender Floral Border Churidhar",
    fabric: "Cotton",
    color: "Lavender",
    price: 1199,
    lengthMeters: 4,
    occasion: "Daily Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8010.jpg?raw=true"
  },
  {
    id: 12,
    name: "Peach Heavy Lace Churidhar",
    fabric: "Cotton",
    color: "Peach",
    price: 2799,
    lengthMeters: 4,
    occasion: "Wedding",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8014.jpg?raw=true"
  },
  {
    id: 13,
    name: "Light Green Floral Print Churidhar",
    fabric: "Cotton",
    color: "Light Green",
    price: 1399,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8015.jpg?raw=true"
  },
  {
    id: 14,
    name: "Grey Floral Print Churidhar",
    fabric: "Cotton",
    color: "Grey",
    price: 1299,
    lengthMeters: 4,
    occasion: "Daily Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8016.jpg?raw=true"
  },
  {
    id: 15,
    name: "Pale Yellow Large Floral Churidhar",
    fabric: "Cotton",
    color: "Pale Yellow",
    price: 2999,
    lengthMeters: 4,
    occasion: "Festive",
    inStock: false,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8017.jpg?raw=true"  },
  {
    id: 16,
    name: "Coffee Gold Print Churidhar",
    fabric: "Cotton",
    color: "Coffee Brown",
    price: 1099,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8018.jpg?raw=true"  },
  {
    id: 17,
    name: "Olive Green Embroidered Churidhar",
    fabric: "Cotton",
    color: "Olive Green",
    price: 1499,
    lengthMeters: 4,
    occasion: "Office Wear",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8019.png?raw=true",
  },
  {
    id: 18,
    name: "Beige Floral Cutwork Churidhar",
    fabric: "Cotton",
    color: "Beige",
    price: 1599,
    lengthMeters: 4,
    occasion: "Traditional",
    inStock: true,
    image:
      "https://github.com/ABHAY200/vylor-be/blob/main/product-images/churidar_8020.png?raw=true"
  },
];
