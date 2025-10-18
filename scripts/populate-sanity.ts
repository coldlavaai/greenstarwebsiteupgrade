import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

async function populateSanity() {
  console.log('🚀 Populating Sanity with existing website content...')

  try {
    // Hero Section
    await client.createOrReplace({
      _id: 'heroSection',
      _type: 'heroSection',
      heading: 'Power Your Home with Clean Energy',
      subheading: 'Join thousands of UK homeowners saving money and the planet with solar energy. Get a free quote today.',
      ctaText: 'Get Free Quote',
      ctaLink: '#contact',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '#about',
      stats: [
        { value: '15+', label: 'Years Experience' },
        { value: '500+', label: 'Happy Customers' }
      ]
    })
    console.log('✅ Hero Section created')

    // About Section
    await client.createOrReplace({
      _id: 'aboutSection',
      _type: 'aboutSection',
      heading: 'About GreenStar Solar',
      content: 'We are a leading solar energy company dedicated to providing sustainable energy solutions.',
      stats: [
        { value: '15+', label: 'Years Experience', icon: 'award' },
        { value: '500+', label: 'Installations', icon: 'home' },
        { value: '98%', label: 'Satisfaction', icon: 'star' }
      ]
    })
    console.log('✅ About Section created')

    // Systems Section
    await client.createOrReplace({
      _id: 'systemsSection',
      _type: 'systemsSection',
      heading: 'Our Solar Solutions',
      subheading: 'Choose the perfect solar system for your needs'
    })
    console.log('✅ Systems Section created')

    // Process Section
    await client.createOrReplace({
      _id: 'processSection',
      _type: 'processSection',
      heading: 'Our Process',
      subheading: 'Simple steps to solar energy'
    })
    console.log('✅ Process Section created')

    // Testimonials Section
    await client.createOrReplace({
      _id: 'testimonialsSection',
      _type: 'testimonialsSection',
      heading: 'What Our Customers Say',
      subheading: 'Real experiences from real customers'
    })
    console.log('✅ Testimonials Section created')

    // Gallery Section
    await client.createOrReplace({
      _id: 'gallerySection',
      _type: 'gallerySection',
      heading: 'Our Work',
      subheading: 'Browse our portfolio of installations'
    })
    console.log('✅ Gallery Section created')

    // Contact Section
    await client.createOrReplace({
      _id: 'contactSection',
      _type: 'contactSection',
      heading: 'Get In Touch',
      subheading: 'Ready to start your solar journey?',
      email: 'info@greenstar-solar.co.uk',
      phone: '0800 123 4567',
      address: '123 Solar Street, London, UK'
    })
    console.log('✅ Contact Section created')

    // Navigation Section
    await client.createOrReplace({
      _id: 'navigationSection',
      _type: 'navigationSection',
      title: 'Main Navigation',
      navItems: [
        { label: 'Home', href: '#home', order: 1 },
        { label: 'About Us', href: '#about', order: 2 },
        { label: 'Systems', href: '#systems', order: 3 },
        { label: 'Process', href: '#process', order: 4 },
        { label: 'Contact', href: '#contact', order: 5 }
      ],
      ctaButton: {
        text: 'Get Free Quote',
        href: '#contact'
      }
    })
    console.log('✅ Navigation Section created')

    // Footer Section
    await client.createOrReplace({
      _id: 'footerSection',
      _type: 'footerSection',
      title: 'Footer',
      companyDescription: 'Leading UK solar energy company providing sustainable solutions.',
      copyright: '© 2024 GreenStar Solar. All rights reserved.',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' }
      ]
    })
    console.log('✅ Footer Section created')

    console.log('🎉 All sections populated successfully!')

  } catch (error) {
    console.error('❌ Error populating Sanity:', error)
    throw error
  }
}

populateSanity()
  .then(() => {
    console.log('✨ Migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
