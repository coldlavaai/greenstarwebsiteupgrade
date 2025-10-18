/**
 * Initialize Sanity Content
 *
 * Run this script to create initial singleton documents in Sanity.
 * This fixes the "missing document ID" error.
 *
 * Usage:
 *   npx ts-node scripts/init-sanity-content.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to create this in Sanity dashboard
  useCdn: false,
})

const singletonDocuments = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Green Star Solar',
    tagline: 'Energy for Life',
    phone: '0800 123 4567',
    email: 'info@greenstarsolar.co.uk',
    brandColor: '#8cc63f',
  },
  {
    _id: 'brandTheme',
    _type: 'brandTheme',
  },
  {
    _id: 'heroSection',
    _type: 'heroSection',
    heading: 'Power Your Future with Solar Energy',
    subheading: 'Bespoke solar energy systems designed to perfectly match your unique requirements',
    ctaText: 'Get Free Survey',
    ctaLink: '#contact',
    secondaryCtaText: 'Explore Systems',
    secondaryCtaLink: '#systems',
  },
  {
    _id: 'aboutSection',
    _type: 'aboutSection',
    heading: 'Leading the Way in Renewable Energy',
    subheading: 'Over 15 years of solar expertise',
    description: 'At Greenstar Solar, we\'re committed to making solar energy accessible and affordable for everyone.',
  },
  {
    _id: 'systemsSection',
    _type: 'systemsSection',
    sectionTitle: 'Our Solar Solutions',
    sectionSubtitle: 'Tailored renewable energy systems for homes and businesses',
    ctaText: 'Learn More',
    ctaLink: '#contact',
  },
  {
    _id: 'processSection',
    _type: 'processSection',
    sectionTitle: 'Our Simple Process',
    sectionSubtitle: 'From consultation to installation in four easy steps',
    ctaText: 'Start Your Journey',
    ctaLink: '#contact',
  },
  {
    _id: 'testimonialsSection',
    _type: 'testimonialsSection',
    sectionTitle: 'What Our Customers Say',
    sectionSubtitle: 'Real experiences from real customers',
    stats: [
      { value: '500+', label: 'Happy Customers' },
      { value: '4.9/5', label: 'Average Rating' },
      { value: '100%', label: 'Satisfaction Rate' },
    ],
  },
  {
    _id: 'gallerySection',
    _type: 'gallerySection',
    sectionTitle: 'Our Projects',
    sectionSubtitle: 'Browse our portfolio of successful installations',
  },
  {
    _id: 'contactSection',
    _type: 'contactSection',
    title: 'Get Your Free Solar Survey',
    subtitle: 'Transform your energy future today',
    description: 'Ready to make the switch to solar? Get in touch today for a free, no-obligation survey and quote.',
    formTitle: 'Request Your Free Survey',
    submitButtonText: 'Send Message',
    successMessage: 'Thank you! We\'ll be in touch shortly.',
    placeholders: {
      name: 'Your Name',
      email: 'Your Email',
      phone: 'Your Phone',
      message: 'Tell us about your project...',
    },
  },
  {
    _id: 'navigationSection',
    _type: 'navigationSection',
    logoAlt: 'Greenstar Solar',
    navItems: [
      { label: 'Home', href: '#home', order: 1 },
      { label: 'About', href: '#about', order: 2 },
      { label: 'Systems', href: '#systems', order: 3 },
      { label: 'Process', href: '#process', order: 4 },
      { label: 'Testimonials', href: '#testimonials', order: 5 },
      { label: 'Contact', href: '#contact', order: 6 },
    ],
    ctaButton: {
      text: 'Get Free Quote',
      href: '#contact',
      show: true,
    },
    sticky: true,
  },
  {
    _id: 'footerSection',
    _type: 'footerSection',
    companyDescription: 'Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.',
    copyrightText: 'Greenstar Solar. All rights reserved. | MCS Certified Installer',
    companyLinks: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#process' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
    systemsLinks: [
      { name: 'Solar Panels for Home', href: '#solar-home' },
      { name: 'Battery Storage for Home', href: '#battery-home' },
      { name: 'Solar Panels for Business', href: '#solar-business' },
      { name: 'Battery Storage for Business', href: '#battery-business' },
    ],
    resourcesLinks: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Warranty Info', href: '#warranty' },
    ],
    legalLinks: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
    showScrollToTop: true,
  },
]

async function initializeSanityContent() {
  console.log('🚀 Initializing Sanity content...\n')

  for (const doc of singletonDocuments) {
    try {
      console.log(`Creating ${doc._type}...`)
      await client.createOrReplace(doc)
      console.log(`✅ ${doc._type} created successfully`)
    } catch (error) {
      console.error(`❌ Error creating ${doc._type}:`, error)
    }
  }

  console.log('\n✨ Done! All singleton documents have been initialized.')
  console.log('\n📝 Next steps:')
  console.log('1. Visit http://localhost:3000/studio')
  console.log('2. Click on any Page Section to edit content')
  console.log('3. Add images, customize colors, and personalize text')
  console.log('4. Click "Publish" to make changes live')
}

initializeSanityContent()
