# Vylor - The Visionary Tailor

A beautiful, modern static website for Vylor clothing brand built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, elegant UI with premium aesthetics
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Fully Responsive**: Optimized for all device sizes
- **Static Export**: Pre-rendered for optimal performance
- **Type-Safe**: Built with TypeScript for reliability

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

To create a static export:

```bash
npm run build
```

This will generate a static site in the `out/` directory that can be deployed to any static hosting service.

### Deploy

The static files in the `out/` directory can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## Project Structure

```
vylor-website/
├── app/
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── public/
│   └── images/          # Product and brand images
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Technologies Used

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Google Fonts**: Inter and Playfair Display

## Brand

- **Full Name**: The Visionary Tailor
- **Short Name**: Vylor
- **Tagline**: Where vision meets craftsmanship

## License

Copyright © 2024 Vylor - The Visionary Tailor. All rights reserved.

