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
      heading: 'Power Your Home with Clean',
      subheading: 'Bespoke solar energy systems designed to perfectly match your unique requirements. Save money, reduce your carbon footprint, and achieve true energy independence.',
      ctaText: 'Get Free Survey',
      ctaLink: '#contact',
      secondaryCtaText: 'Explore Systems',
      secondaryCtaLink: '#systems',
      stats: [
        { _key: 'stat-1', value: '15+', label: 'Years Experience' },
        { _key: 'stat-2', value: '500+', label: 'Happy Customers' }
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

    // Create Individual Services/Systems
    const services = [
      {
        _id: 'service-solar-home',
        _type: 'service',
        position: 1,
        title: 'Solar Panels for Home',
        category: 'solar-panels',
        description: 'Transform your home with our premium residential solar panel installations. Reduce your electricity bills and increase your property value.',
        features: ['Free energy assessment', 'Custom system design', '25-year warranty', 'Smart monitoring'],
        icon: 'Sun',
        featured: true,
      },
      {
        _id: 'service-battery-home',
        _type: 'service',
        position: 2,
        title: 'Battery Storage for Home',
        category: 'battery-storage',
        description: 'Store excess solar energy and use it when you need it most. Achieve energy independence with our advanced battery solutions.',
        features: ['24/7 backup power', 'Peak shaving', 'Seamless integration', 'Smart controls'],
        icon: 'Battery',
        featured: true,
      },
      {
        _id: 'service-solar-business',
        _type: 'service',
        position: 3,
        title: 'Solar Panels for Business',
        category: 'solar-panels',
        description: 'Reduce operational costs and demonstrate environmental responsibility with commercial solar installations.',
        features: ['ROI analysis', 'Scalable solutions', 'Tax incentives', 'Minimal downtime'],
        icon: 'Building2',
        featured: true,
      },
      {
        _id: 'service-battery-business',
        _type: 'service',
        position: 4,
        title: 'Battery Storage for Business',
        category: 'battery-storage',
        description: 'Ensure business continuity and optimize energy costs with commercial-grade battery storage systems.',
        features: ['Demand response', 'Grid independence', 'Load management', 'Remote monitoring'],
        icon: 'Zap',
        featured: true,
      },
    ]

    for (const service of services) {
      await client.createOrReplace(service)
      console.log(`✅ Service created: ${service.title}`)
    }

    // Create Process Steps
    const processSteps = [
      {
        _id: 'process-step-1',
        _type: 'processStep',
        order: 1,
        title: 'Personal Consultation',
        description: 'We begin with a thorough face to face consultation to understand your energy usage patterns, environmental goals, and budget. Our expert surveyors conduct a comprehensive site assessment, analysing roof orientation, shading, sunlight, cable runs, and optimal placement for inverters and batteries.',
        icon: 'Search',
      },
      {
        _id: 'process-step-2',
        _type: 'processStep',
        order: 2,
        title: 'Bespoke Design',
        description: 'Using cutting edge technology and high quality products, we design a bespoke solution that maximises energy efficiency and cost savings tailored specifically to your unique requirements.',
        icon: 'Lightbulb',
      },
      {
        _id: 'process-step-3',
        _type: 'processStep',
        order: 3,
        title: 'Expert Installation',
        description: 'Our skilled technicians handle the entire installation process with precision, ensuring your system is ready to perform reliably and efficiently for years to come.',
        icon: 'Wrench',
      },
      {
        _id: 'process-step-4',
        _type: 'processStep',
        order: 4,
        title: 'Ongoing Support',
        description: 'Our commitment continues with comprehensive aftercare appointments, app training, and ongoing system monitoring. We stay in close communication so you feel informed and confident at every step.',
        icon: 'HeartHandshake',
      },
    ]

    for (const step of processSteps) {
      await client.createOrReplace(step)
      console.log(`✅ Process step created: Step ${step.order}`)
    }

    // Create Gallery Items
    const galleryItems = [
      {
        _id: 'gallery-1',
        _type: 'galleryItem',
        position: 1,
        title: 'Residential Solar Installation',
        location: 'Manchester, UK',
        systemSize: '8kW System',
        category: 'residential',
        featured: true,
      },
      {
        _id: 'gallery-2',
        _type: 'galleryItem',
        position: 2,
        title: 'Commercial Rooftop Array',
        location: 'Birmingham, UK',
        systemSize: '45kW System',
        category: 'commercial',
        featured: true,
      },
      {
        _id: 'gallery-3',
        _type: 'galleryItem',
        position: 3,
        title: 'Home Battery Storage',
        location: 'London, UK',
        systemSize: '13.5kWh Battery',
        category: 'battery',
        featured: true,
      },
      {
        _id: 'gallery-4',
        _type: 'galleryItem',
        position: 4,
        title: 'Office Building Solar',
        location: 'Leeds, UK',
        systemSize: '65kW System',
        category: 'commercial',
        featured: true,
      },
      {
        _id: 'gallery-5',
        _type: 'galleryItem',
        position: 5,
        title: 'Warehouse Solar Installation',
        location: 'Liverpool, UK',
        systemSize: '120kW System',
        category: 'commercial',
        featured: true,
      },
      {
        _id: 'gallery-6',
        _type: 'galleryItem',
        position: 6,
        title: 'Farm Solar Project',
        location: 'Bristol, UK',
        systemSize: '95kW System',
        category: 'commercial',
        featured: true,
      },
    ]

    for (const item of galleryItems) {
      await client.createOrReplace(item)
      console.log(`✅ Gallery item created: ${item.title}`)
    }

    // Create Testimonials
    const testimonials = [
      {
        _id: 'testimonial-1',
        _type: 'testimonial',
        position: 1,
        customerName: 'Sarah Johnson',
        location: 'Manchester',
        rating: 5,
        testimonial: "Greenstar Solar transformed our home! The installation was seamless, and we're already seeing significant savings on our energy bills. The team was professional, knowledgeable, and incredibly helpful throughout the entire process.",
        serviceType: 'solar-panels',
        featured: true,
      },
      {
        _id: 'testimonial-2',
        _type: 'testimonial',
        position: 2,
        customerName: 'Michael Davies',
        location: 'Birmingham',
        rating: 5,
        testimonial: 'Outstanding service from start to finish. The consultation was thorough, the installation was quick and clean, and the aftercare support has been excellent. Our business is now saving thousands on energy costs.',
        serviceType: 'solar-panels',
        featured: true,
      },
      {
        _id: 'testimonial-3',
        _type: 'testimonial',
        position: 3,
        customerName: 'Emma Wilson',
        location: 'London',
        rating: 5,
        testimonial: 'We were nervous about making the switch to solar, but Greenstar made it so easy. They explained everything clearly, handled all the paperwork, and the system has been performing brilliantly. Highly recommend!',
        serviceType: 'battery-storage',
        featured: true,
      },
      {
        _id: 'testimonial-4',
        _type: 'testimonial',
        position: 4,
        customerName: 'James Thompson',
        location: 'Leeds',
        rating: 5,
        testimonial: "Excellent company! Professional installation, great communication, and the solar panels look fantastic on our roof. The monitoring app is brilliant - we can see exactly how much energy we're generating in real-time.",
        serviceType: 'solar-panels',
        featured: true,
      },
    ]

    for (const testimonial of testimonials) {
      await client.createOrReplace(testimonial)
      console.log(`✅ Testimonial created: ${testimonial.customerName}`)
    }

    console.log('🎉 All sections and content populated successfully!')

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
