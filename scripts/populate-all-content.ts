/**
 * Comprehensive Content Population Script
 *
 * This script populates Sanity CMS with ALL hardcoded content from the website.
 * Run with: SANITY_API_WRITE_TOKEN=your_token npx tsx scripts/populate-all-content.ts
 */

import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Helper to create portable text block
const createTextBlock = (text: string) => ({
  _type: 'block',
  style: 'normal',
  children: [{ _type: 'span', text, marks: [] }],
  markDefs: [],
});

// Helper to create portable text array
const createPortableText = (text: string | string[]) => {
  if (Array.isArray(text)) {
    return text.map(createTextBlock);
  }
  return [createTextBlock(text)];
};

async function populateProcessSteps() {
  console.log('\n📋 Creating Process Steps...');

  const steps = [
    {
      _id: 'process-step-1',
      _type: 'processStep',
      order: 1,
      title: 'Personal Consultation',
      description: createPortableText('We begin with a face to face consultation to understand your energy usage, goals, and budget.'),
      icon: 'Search',
      backContent: createPortableText('Our surveyors carry out a full structural and wind load assessment to ensure your roof is sound and suitable for installation. Every site is carefully assessed for roof orientation, shading, sunlight, and the ideal placement for inverters and batteries.'),
      frontReview: {
        text: '"They explained everything in simple terms and made us feel confident."',
        author: 'Martyn Brayshaw',
      },
      backReview: {
        text: '"Jon explained everything clearly. Tobias kept things organized."',
        author: 'Rikesh',
      },
    },
    {
      _id: 'process-step-2',
      _type: 'processStep',
      order: 2,
      title: 'Bespoke Design',
      description: createPortableText('There is no one size fits all solution. Each system is tailored to your specific energy consumption and future requirements to ensure long term efficiency and flexibility.'),
      icon: 'Lightbulb',
      backContent: createPortableText('Using premium components and industry leading software, we create a system that meets your needs today while preparing you for tomorrow.'),
      frontReview: {
        text: '"Not the cheapest of 5 quotes but best value. Excellent equipment..."',
        author: 'Mark Diaper',
      },
      backReview: {
        text: '"Quote adjusted to my needs. Install was quick and well done."',
        author: 'Jim',
      },
    },
    {
      _id: 'process-step-3',
      _type: 'processStep',
      order: 3,
      title: 'Expert Installation',
      description: createPortableText('With over 15 years experience, our qualified installation team completes every project with precision and care.'),
      icon: 'Wrench',
      backContent: createPortableText('We ensure full compliance, safety, and reliability so your system performs optimally for years to come.'),
      frontReview: {
        text: '"Install team were really helpful and thorough."',
        author: 'Ben Miles-Mathewson',
      },
      backReview: {
        text: '"Team were punctual, knowledgeable, polite and cleaned up everything."',
        author: 'Peter Lucas',
      },
    },
    {
      _id: 'process-step-4',
      _type: 'processStep',
      order: 4,
      title: 'System Handover',
      description: createPortableText("Upon completion, you'll receive a comprehensive handover pack including your MCS certificate, DNO approval letter, and other essential documents required for Smart Export Guarantee onboarding."),
      icon: 'FileCheck',
      backContent: createPortableText("We assist you through this process to ensure a seamless transition onto the right export tariff. Our team also provides full guidance on using your monitoring app and understanding your energy data so you can get the most from your new system."),
      frontReview: {
        text: '"System working so well adding a second battery next week!"',
        author: 'Ben Miles-Mathewson',
      },
      backReview: {
        text: '"System has been superb for one month now."',
        author: 'Tony Hamlett',
      },
    },
    {
      _id: 'process-step-5',
      _type: 'processStep',
      order: 5,
      title: 'Ongoing Support',
      description: createPortableText("Our relationship doesn't end once your system is installed. Greenstar offers continued support with no labour call out charges post installation."),
      icon: 'HeartHandshake',
      backContent: createPortableText('We ensure any issues are resolved quickly and efficiently. We remain available for advice, system checks, and performance reviews so you always have us to rely on for anything you need.'),
      frontReview: {
        text: '"First class customer service continues after purchase."',
        author: 'Daniel Blackman',
      },
      backReview: {
        text: '"Any concerns resolved quickly and professionally."',
        author: 'Oliver',
      },
    },
  ];

  for (const step of steps) {
    try {
      await client.createOrReplace(step);
      console.log(`✅ Created: ${step.title}`);
    } catch (error) {
      console.error(`❌ Error creating ${step.title}:`, error);
    }
  }
}

async function populateProcessSection() {
  console.log('\n📋 Creating Process Section...');

  const processSection = {
    _id: 'process-section-singleton',
    _type: 'processSection',
    sectionTitle: "We're With You Every Step",
    sectionSubtitle: 'A highly personalised approach with ongoing personal support throughout your solar journey',
    steps: [
      { _type: 'reference', _ref: 'process-step-1' },
      { _type: 'reference', _ref: 'process-step-2' },
      { _type: 'reference', _ref: 'process-step-3' },
      { _type: 'reference', _ref: 'process-step-4' },
      { _type: 'reference', _ref: 'process-step-5' },
    ],
    ctaText: 'Book Your Free Survey',
    ctaLink: '#contact',
    showCta: true,
  };

  try {
    await client.createOrReplace(processSection);
    console.log('✅ Created Process Section');
  } catch (error) {
    console.error('❌ Error creating Process Section:', error);
  }
}

async function populateNavigation() {
  console.log('\n🧭 Creating Navigation...');

  const navigation = {
    _id: 'navigation-singleton',
    _type: 'navigationSection',
    logoLink: '/',
    logoHeight: 48,
    navItems: [
      {
        _key: 'nav-home',
        label: 'Home',
        link: '/',
        openInNewTab: false,
      },
      {
        _key: 'nav-systems',
        label: 'Systems',
        link: '#systems',
        openInNewTab: false,
        dropdown: [
          {
            _key: 'system-solar-home',
            label: 'Solar Panels for Home',
            link: '/solar-panels-home',
            description: 'Premium solar panel systems for residential properties',
          },
          {
            _key: 'system-battery-home',
            label: 'Battery Storage for Home',
            link: '/battery-storage-home',
            description: 'Store excess energy for use anytime',
          },
          {
            _key: 'system-solar-business',
            label: 'Solar Panels for Business',
            link: '/solar-panels-business',
            description: 'Commercial solar solutions for businesses',
          },
          {
            _key: 'system-battery-business',
            label: 'Battery Storage for Business',
            link: '/battery-storage-business',
            description: 'Commercial battery storage systems',
          },
          {
            _key: 'system-ev',
            label: 'EV Charging',
            link: '/ev-charging',
            description: 'Smart EV charging powered by solar',
          },
        ],
      },
      {
        _key: 'nav-about',
        label: 'About',
        link: '#about',
        openInNewTab: false,
      },
      {
        _key: 'nav-process',
        label: 'Our Process',
        link: '#process',
        openInNewTab: false,
      },
      {
        _key: 'nav-gallery',
        label: 'Gallery',
        link: '#gallery',
        openInNewTab: false,
      },
      {
        _key: 'nav-testimonials',
        label: 'Testimonials',
        link: '#testimonials',
        openInNewTab: false,
      },
      {
        _key: 'nav-contact',
        label: 'Contact',
        link: '#contact',
        openInNewTab: false,
      },
    ],
    ctaButton: {
      show: true,
      text: 'Get Free Quote',
      link: '/#contact',
      style: 'primary',
    },
    transparentOnTop: false,
    blurEffect: true,
    shadow: 'medium',
    sticky: true,
    smoothScroll: true,
    closeOnClick: true,
    mobileBreakpoint: 768,
    mobileMenuStyle: 'slide-right',
    hamburgerIcon: 'classic',
    showLogoInMobile: true,
  };

  try {
    await client.createOrReplace(navigation);
    console.log('✅ Created Navigation');
  } catch (error) {
    console.error('❌ Error creating Navigation:', error);
  }
}

async function populateHeroSection() {
  console.log('\n🦸 Creating Hero Section...');

  const heroSection = {
    _id: 'hero-section-singleton',
    _type: 'heroSection',
    heading: 'Power Your Home with Clean Energy',
    subheading: createPortableText([
      'Switch to solar and take control of your energy costs. Join hundreds of satisfied customers across the UK who have made the switch to renewable energy.',
    ]),
    ctaText: 'Get Free Quote',
    ctaLink: '#contact',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '#about',
    stats: [
      { _key: 'stat-1', value: '15+', label: 'Years Experience' },
      { _key: 'stat-2', value: '250+', label: 'Happy Customers' },
    ],
  };

  try {
    await client.createOrReplace(heroSection);
    console.log('✅ Created Hero Section');
  } catch (error) {
    console.error('❌ Error creating Hero Section:', error);
  }
}

async function populateAboutSection() {
  console.log('\n📖 Creating About Section...');

  const aboutSection = {
    _id: 'about-section-singleton',
    _type: 'aboutSection',
    sectionTitle: 'About Greenstar Solar',
    heading: 'Leading the Way in Solar Energy',
    content: createPortableText([
      "With over 15 years of experience in renewable energy, we're a trusted MCS certified installer helping homes and businesses across the UK transition to clean, sustainable solar power.",
      "We take a highly personalised approach to every project. From the initial consultation to ongoing support, we're with you at every step, ensuring your system delivers maximum performance and savings for years to come.",
    ]),
    stats: [
      { _key: 'about-stat-1', value: '15+', label: 'Years Experience', icon: 'Award' },
      { _key: 'about-stat-2', value: '250+', label: 'Happy Customers', icon: 'Users' },
      { _key: 'about-stat-3', value: '25', label: 'Year Warranty', icon: 'Shield' },
    ],
    bulletPoints: [
      'Certified and experienced installers',
      'Premium quality solar panels and equipment',
      'Comprehensive warranty and support',
      'Tailored solutions for your energy goals',
    ],
  };

  try {
    await client.createOrReplace(aboutSection);
    console.log('✅ Created About Section');
  } catch (error) {
    console.error('❌ Error creating About Section:', error);
  }
}

async function populateFooter() {
  console.log('\n🦶 Creating Footer...');

  const footer = {
    _id: 'footer-section-singleton',
    _type: 'footerSection',
    companyDescription: 'Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.',
    phone: '023 8212 3763',
    email: 'info@greenstarsolar.co.uk',
    address: 'United Kingdom',
    copyright: `© ${new Date().getFullYear()} Greenstar Solar. All rights reserved.`,
    socialLinks: [
      {
        _key: 'social-facebook',
        platform: 'Facebook',
        url: 'https://facebook.com/greenstar',
      },
      {
        _key: 'social-instagram',
        platform: 'Instagram',
        url: 'https://instagram.com/greenstar',
      },
    ],
  };

  try {
    await client.createOrReplace(footer);
    console.log('✅ Created Footer');
  } catch (error) {
    console.error('❌ Error creating Footer:', error);
  }
}

async function populateTestimonials() {
  console.log('\n⭐ Creating Testimonials...');

  const testimonials = [
    { name: 'Phill Ballard', location: 'Google Review', rating: 5, text: 'Great service from beginning to end and at a great price. Greenstar provided a first rate service. Already self sufficient with excess sent to the grid!', platform: 'Google' },
    { name: 'Steve Wolstenholme', location: 'Google Review', rating: 5, text: '5 star treatment from start to finish, couldn\'t of asked for anything else.', platform: 'Google' },
    { name: 'Max Copeland', location: 'Google Review', rating: 5, text: 'Very impressed with Greenstar Solar. Professional and efficient team. Installation was smooth and quick. Great price and couldn\'t be happier!', platform: 'Google' },
    { name: 'Martyn Brayshaw', location: 'Google Review', rating: 5, text: 'Communication from start to finish has been exemplary. They explained everything in simple terms and made us feel confident.', platform: 'Google' },
    { name: 'Jim Godfrey', location: 'Google Review', rating: 5, text: 'Excellent service in all respects. Cost was less than expected. Only used less than a kilowatt of power since installation. Very pleased!', platform: 'Google' },
    { name: 'Simon Wright', location: 'Google Review', rating: 5, text: 'Great experience working with Greenstar, good communication throughout and fitters were very clean and polite. Highly recommended.', platform: 'Google' },
    { name: 'Daniel Blackman', location: 'Google Review', rating: 5, text: 'Fantastic company! First class customer service continues after purchase. Big shout to Jack who is an absolute super star. Competitive pricing.', platform: 'Google' },
    { name: 'Yasmin Kingston', location: 'Google Review', rating: 5, text: 'Had 6 quotes prior and this was the best by far! Already saving money in bills. 10/10 recommend. John and Jack are a great team!', platform: 'Google' },
    { name: 'Ben Miles-Mathewson', location: 'Google Review', rating: 5, text: 'Good comms throughout. Install team were really helpful and thorough. System working so well adding a second battery next week!', platform: 'Google' },
    { name: 'David Payne', location: 'Google Review', rating: 5, text: 'Absolutely first class from start to finish. Better than large nationals. Installation outperformed expectations. No hesitation in recommending!', platform: 'Google' },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    try {
      await client.create({
        _type: 'testimonial',
        name: testimonial.name,
        location: testimonial.location,
        rating: testimonial.rating,
        text: testimonial.text,
        platform: testimonial.platform,
        featured: i < 3, // Mark first 3 as featured
      });
      console.log(`✅ Created testimonial: ${testimonial.name}`);
    } catch (error) {
      console.error(`❌ Error creating testimonial for ${testimonial.name}:`, error);
    }
  }
}

async function populateGalleryItems() {
  console.log('\n🖼️ Creating Gallery Items...');

  const galleryItems = [
    {
      title: 'Residential Solar Installation',
      location: 'Southampton, Hampshire',
      systemSize: '8.4kW System',
      category: 'residential',
      description: 'Solar Panels + Battery Storage - 21 x Aiko Neostar panels with 13.5kWh GivEnergy Battery. Generating 7,800 kWh annually with 85% reduction in energy bills.',
    },
    {
      title: 'Commercial Rooftop Array',
      location: 'Portsmouth, Hampshire',
      systemSize: '95kW System',
      category: 'commercial',
      description: 'Commercial Solar Array - 238 x Commercial panels with SolarEdge Inverters. Generating 89,000 kWh annually with 72% reduction in energy costs.',
    },
    {
      title: 'Home Battery Storage',
      location: 'Winchester, Hampshire',
      systemSize: '6.8kW + Battery',
      category: 'residential',
      description: 'Solar + Battery + EV Charger - 17 x Aiko panels with 9.5kWh GivEnergy Battery. Generating 6,200 kWh annually with 78% reduction plus free EV charging.',
    },
    {
      title: 'Office Building Solar',
      location: 'Eastleigh, Hampshire',
      systemSize: '42kW System',
      category: 'commercial',
      description: 'Commercial Solar Installation - 105 x High-efficiency panels with Fox ESS Inverter. Generating 39,000 kWh annually with 68% reduction in operating costs.',
    },
    {
      title: 'Large Family Home',
      location: 'Romsey, Hampshire',
      systemSize: '12.6kW System',
      category: 'residential',
      description: 'Premium Solar + Battery - 32 x Aiko Neostar panels with 18kWh Battery Storage. Generating 11,400 kWh annually with 92% energy independence.',
    },
    {
      title: 'Farm Solar Project',
      location: 'New Forest, Hampshire',
      systemSize: '120kW System',
      category: 'commercial',
      description: 'Agricultural Solar Array - 300 x Commercial panels with Multiple SolarEdge units. Generating 112,000 kWh annually with £32,000 annual savings.',
    },
  ];

  for (const item of galleryItems) {
    try {
      await client.create({
        _type: 'galleryItem',
        title: item.title,
        location: item.location,
        systemSize: item.systemSize,
        category: item.category,
        description: item.description,
      });
      console.log(`✅ Created gallery item: ${item.title}`);
    } catch (error) {
      console.error(`❌ Error creating gallery item ${item.title}:`, error);
    }
  }
}

async function populateContactSection() {
  console.log('\n📞 Creating Contact Section...');

  const contactSection = {
    _id: 'contact-section-singleton',
    _type: 'contactSection',
    heading: 'Book Your Free Survey',
    subheading: 'Ready to make the switch to solar? Contact us today for a free consultation and site assessment',
    phone: '0800 123 4567',
    email: 'info@greenstarsolar.co.uk',
    address: 'United Kingdom',
  };

  try {
    await client.createOrReplace(contactSection);
    console.log('✅ Created Contact Section');
  } catch (error) {
    console.error('❌ Error creating Contact Section:', error);
  }
}

async function main() {
  console.log('🚀 Starting content population...');
  console.log('=====================================\n');

  try {
    // Populate all content sections
    await populateProcessSteps();
    await populateProcessSection();
    await populateNavigation();
    await populateHeroSection();
    await populateAboutSection();
    await populateFooter();
    await populateTestimonials();
    await populateGalleryItems();
    await populateContactSection();

    console.log('\n=====================================');
    console.log('✅ All content populated successfully!');
    console.log('=====================================\n');
  } catch (error) {
    console.error('\n❌ Fatal error during population:', error);
    process.exit(1);
  }
}

// Run the script
main();
