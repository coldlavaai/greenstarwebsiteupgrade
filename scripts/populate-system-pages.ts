import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

// Helper to convert plain text to Portable Text
function toPortableText(text: string) {
  return [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

async function populateBatteryStorageHome() {
  console.log('🚀 Populating Battery Storage - Home page...')

  const doc = {
    _type: 'systemPage',
    title: 'Battery Storage - Home',
    slug: {
      _type: 'slug',
      current: 'battery-storage-home',
    },
    pageType: 'battery-storage-home',

    // Hero Section
    heroMiniBadge: {
      icon: 'Battery',
      text: 'Residential Battery Solutions',
    },
    heroHeading: {
      line1: 'Battery Storage',
      line2: 'for Your Home',
    },
    heroDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Store the energy your solar panels generate during the day and use it whenever you need it, even after the sun goes down. With intelligent battery storage, you can power your home using your own renewable energy around the clock and significantly reduce your reliance on the grid.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    heroCta: {
      text: 'Get Free Quote',
      link: '/#contact',
    },

    // Benefits Section
    benefitsHeading: 'Why Add Battery Storage',
    benefitsSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Maximize your solar investment and energy independence',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    benefits: [
      {
        _key: 'benefit-1',
        icon: 'Battery',
        title: 'Store Excess Energy',
        description: toPortableText('Capture surplus solar energy during the day and use it when you need it most'),
      },
      {
        _key: 'benefit-2',
        icon: 'TrendingDown',
        title: 'Maximize Savings',
        description: toPortableText('Reduce grid dependence and avoid peak electricity rates with stored power'),
      },
      {
        _key: 'benefit-3',
        icon: 'Moon',
        title: 'Power at Night',
        description: toPortableText('Use your stored solar energy throughout the evening and night'),
      },
      {
        _key: 'benefit-4',
        icon: 'Shield',
        title: 'Backup Power',
        description: toPortableText('Keep essential appliances running during power outages'),
      },
      {
        _key: 'benefit-5',
        icon: 'Power',
        title: 'Energy Independence',
        description: toPortableText('Take control of your energy supply and reduce grid reliance'),
      },
      {
        _key: 'benefit-6',
        icon: 'Zap',
        title: 'Smart Management',
        description: toPortableText('Intelligent system optimizes when to store and when to use power'),
      },
    ],

    // Process Section
    processHeading: 'Our Process',
    processSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Simple steps to energy independence',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    processSteps: [
      {
        _key: 'step-1',
        number: '01',
        title: 'Energy Assessment',
        description: toPortableText('We analyze your energy usage patterns and solar generation to size the perfect battery'),
      },
      {
        _key: 'step-2',
        number: '02',
        title: 'System Design',
        description: toPortableText('Custom battery solution designed to integrate seamlessly with your solar panels'),
      },
      {
        _key: 'step-3',
        number: '03',
        title: 'Expert Installation',
        description: toPortableText('Professional installation by certified technicians with minimal disruption'),
      },
      {
        _key: 'step-4',
        number: '04',
        title: 'Smart Setup',
        description: toPortableText('Configure intelligent charging and usage patterns for maximum savings'),
      },
    ],

    // FAQ Section
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        _key: 'faq-1',
        question: 'How much does a home battery storage system cost?',
        answer: toPortableText(
          'Home battery systems typically range from £4,000-£8,000 depending on capacity. Most customers see payback within 10-15 years through energy savings and avoiding peak rates.'
        ),
      },
      {
        _key: 'faq-2',
        question: 'How long do solar batteries last?',
        answer: toPortableText(
          'Modern lithium-ion batteries typically last 10-15 years with a warranty of 10 years. They maintain 70-80% capacity after this period.'
        ),
      },
      {
        _key: 'faq-3',
        question: 'Can I add battery storage to my existing solar panels?',
        answer: toPortableText(
          'Yes! Battery storage can be retrofitted to most existing solar panel systems. We assess your current setup and recommend compatible battery solutions.'
        ),
      },
      {
        _key: 'faq-4',
        question: 'Will a battery power my whole home during an outage?',
        answer: toPortableText(
          'Battery capacity varies, but most systems can power essential appliances for several hours to days. We help you prioritize which circuits to backup based on your needs.'
        ),
      },
    ],

    // CTA Section
    ctaHeading: 'Ready to Store Your Solar Energy?',
    ctaDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Get a free battery storage assessment and quote',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    ctaButton: {
      text: 'Get Started',
      link: '/#contact',
    },

    // SEO
    metaTitle: 'Home Battery Storage Systems | Green Star Solar',
    metaDescription:
      'Store your solar energy and use it 24/7. Expert battery storage installation. Power your home day and night with renewable energy. Get your free quote.',

    // Settings
    published: true,
    showNavigation: true,
    showFooter: true,
  }

  try {
    const result = await client.create(doc)
    console.log('✅ Successfully created Battery Storage - Home!')
    console.log(`   Document ID: ${result._id}`)
    return result
  } catch (error) {
    console.error('❌ Error creating document:', error)
    throw error
  }
}

async function populateBatteryStorageBusiness() {
  console.log('🚀 Populating Battery Storage - Business page...')

  const doc = {
    _type: 'systemPage',
    title: 'Battery Storage - Business',
    slug: {
      _type: 'slug',
      current: 'battery-storage-business',
    },
    pageType: 'battery-storage-business',

    // Hero Section
    heroMiniBadge: {
      icon: 'Battery',
      text: 'Commercial Battery Solutions',
    },
    heroHeading: {
      line1: 'Battery Storage',
      line2: 'for Your Business',
    },
    heroDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Optimize energy costs and ensure business continuity with commercial battery storage. Reduce peak demand charges, participate in grid services, and maximize your solar investment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    heroCta: {
      text: 'Get Free Quote',
      link: '/#contact',
    },

    // Benefits Section
    benefitsHeading: 'Why Commercial Battery Storage',
    benefitsSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Reduce costs and increase energy resilience',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    benefits: [
      {
        _key: 'benefit-1',
        icon: 'Battery',
        title: 'Peak Shaving',
        description: toPortableText('Reduce peak demand charges by storing energy during off-peak hours'),
      },
      {
        _key: 'benefit-2',
        icon: 'TrendingDown',
        title: 'Cost Optimization',
        description: toPortableText('Maximize savings with intelligent charging and discharging strategies'),
      },
      {
        _key: 'benefit-3',
        icon: 'Clock',
        title: 'Time-of-Use Management',
        description: toPortableText('Store cheap electricity and use it during expensive peak periods'),
      },
      {
        _key: 'benefit-4',
        icon: 'Shield',
        title: 'Business Continuity',
        description: toPortableText('Ensure uninterrupted operations during power outages with backup storage'),
      },
      {
        _key: 'benefit-5',
        icon: 'Power',
        title: 'Grid Services Revenue',
        description: toPortableText('Participate in grid services and generate additional revenue streams'),
      },
      {
        _key: 'benefit-6',
        icon: 'Target',
        title: 'Scalable Capacity',
        description: toPortableText('Expand storage capacity as your business energy needs grow'),
      },
    ],

    // Process Section
    processHeading: 'Our Process',
    processSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'From analysis to optimization',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    processSteps: [
      {
        _key: 'step-1',
        number: '01',
        title: 'Energy Analysis',
        description: toPortableText('Comprehensive analysis of your energy usage patterns, tariff structure, and solar generation'),
      },
      {
        _key: 'step-2',
        number: '02',
        title: 'Storage Strategy',
        description: toPortableText('Custom battery solution with optimized charge/discharge cycles for maximum ROI'),
      },
      {
        _key: 'step-3',
        number: '03',
        title: 'Professional Installation',
        description: toPortableText('Expert installation with minimal operational disruption and full compliance'),
      },
      {
        _key: 'step-4',
        number: '04',
        title: 'Intelligent Management',
        description: toPortableText('AI-powered system manages storage for optimal performance and cost savings'),
      },
    ],

    // FAQ Section
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        _key: 'faq-1',
        question: 'What is the ROI for commercial battery storage?',
        answer: toPortableText(
          'ROI typically ranges from 4-7 years depending on your energy tariff, usage patterns, and system size. Businesses with high peak demand charges see the fastest returns.'
        ),
      },
      {
        _key: 'faq-2',
        question: 'How much capacity do I need?',
        answer: toPortableText(
          'Capacity depends on your energy consumption patterns and objectives. We analyze your usage data to recommend optimal capacity, typically ranging from 50kWh to 500kWh+'
        ),
      },
      {
        _key: 'faq-3',
        question: 'Can battery storage work without solar panels?',
        answer: toPortableText(
          'Yes! Battery storage can be used independently to capitalize on time-of-use tariffs, storing cheap off-peak electricity for use during expensive peak periods.'
        ),
      },
      {
        _key: 'faq-4',
        question: 'What is the lifespan of commercial batteries?',
        answer: toPortableText(
          'Commercial battery systems typically last 10-15 years with warranties of 10 years. Modern lithium-ion systems maintain 70-80% capacity throughout their lifespan.'
        ),
      },
    ],

    // CTA Section
    ctaHeading: 'Ready to Optimize Your Energy Costs?',
    ctaDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Get a free commercial battery storage analysis',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    ctaButton: {
      text: 'Get Started',
      link: '/#contact',
    },

    // SEO
    metaTitle: 'Commercial Battery Storage Solutions | Green Star Solar',
    metaDescription:
      'Reduce peak demand charges and optimize energy costs with commercial battery storage. Expert installation and AI-powered management. Get your free analysis.',

    // Settings
    published: true,
    showNavigation: true,
    showFooter: true,
  }

  try {
    const result = await client.create(doc)
    console.log('✅ Successfully created Battery Storage - Business!')
    console.log(`   Document ID: ${result._id}`)
    return result
  } catch (error) {
    console.error('❌ Error creating document:', error)
    throw error
  }
}

async function populateSolarPanelsBusiness() {
  console.log('🚀 Populating Solar Panels - Business page...')

  const doc = {
    _type: 'systemPage',
    title: 'Solar Panels - Business',
    slug: {
      _type: 'slug',
      current: 'solar-panels-business',
    },
    pageType: 'solar-panels-business',

    // Hero Section
    heroMiniBadge: {
      icon: 'Building2',
      text: 'Commercial Solar Solutions',
    },
    heroHeading: {
      line1: 'Solar Panels',
      line2: 'for Your Business',
    },
    heroDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Reduce operating costs, achieve sustainability goals, and future-proof your business with commercial solar. Our scalable systems are designed to maximize ROI and energy independence.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    heroCta: {
      text: 'Get Free Quote',
      link: '/#contact',
    },

    // Benefits Section
    benefitsHeading: 'Why Choose Commercial Solar',
    benefitsSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Transform your business with clean, cost-effective energy',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    benefits: [
      {
        _key: 'benefit-1',
        icon: 'TrendingDown',
        title: 'Reduce Operating Costs',
        description: toPortableText(
          'Cut electricity bills by up to 75% and improve your bottom line with commercial solar'
        ),
      },
      {
        _key: 'benefit-2',
        icon: 'Target',
        title: 'Achieve Sustainability Goals',
        description: toPortableText(
          'Meet corporate sustainability targets and reduce your carbon footprint significantly'
        ),
      },
      {
        _key: 'benefit-3',
        icon: 'Award',
        title: 'Enhanced Brand Value',
        description: toPortableText(
          'Demonstrate environmental leadership and attract eco-conscious customers'
        ),
      },
      {
        _key: 'benefit-4',
        icon: 'Shield',
        title: 'Energy Price Protection',
        description: toPortableText(
          'Lock in energy costs and protect against rising electricity prices'
        ),
      },
      {
        _key: 'benefit-5',
        icon: 'Users',
        title: 'Tax Incentives',
        description: toPortableText(
          'Benefit from accelerated capital allowances and business energy schemes'
        ),
      },
      {
        _key: 'benefit-6',
        icon: 'Zap',
        title: 'Scalable Solutions',
        description: toPortableText(
          'Flexible systems that grow with your business needs and energy demands'
        ),
      },
    ],

    // Process Section
    processHeading: 'Our Process',
    processSubheading: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'From consultation to installation, we make going solar seamless',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    processSteps: [
      {
        _key: 'step-1',
        number: '01',
        title: 'Business Consultation',
        description: toPortableText(
          'We analyze your energy consumption, costs, and facility to design the optimal system'
        ),
      },
      {
        _key: 'step-2',
        number: '02',
        title: 'Custom Proposal',
        description: toPortableText(
          'Detailed ROI analysis, financing options, and system specifications tailored to your business'
        ),
      },
      {
        _key: 'step-3',
        number: '03',
        title: 'Professional Installation',
        description: toPortableText(
          'Minimal disruption to operations with scheduled installation by certified commercial teams'
        ),
      },
      {
        _key: 'step-4',
        number: '04',
        title: 'Monitoring & Maintenance',
        description: toPortableText(
          'Ongoing performance monitoring and maintenance to maximize your investment'
        ),
      },
    ],

    // FAQ Section
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        _key: 'faq-1',
        question: 'What is the typical ROI for commercial solar?',
        answer: toPortableText(
          'Most businesses see a return on investment within 5-8 years. With 25+ year system lifespans, this means 15-20 years of significant energy savings.'
        ),
      },
      {
        _key: 'faq-2',
        question: 'How much roof space do I need?',
        answer: toPortableText(
          'A typical 50kW commercial system requires approximately 250-300 square meters. We can design systems for various roof sizes and configurations, including ground-mounted options.'
        ),
      },
      {
        _key: 'faq-3',
        question: 'Will installation disrupt business operations?',
        answer: toPortableText(
          'We schedule installations to minimize disruption, often working outside business hours or in phases. Most installations are completed within 1-4 weeks depending on system size.'
        ),
      },
      {
        _key: 'faq-4',
        question: 'What financing options are available?',
        answer: toPortableText(
          'We offer multiple financing options including outright purchase, business loans, and Power Purchase Agreements (PPAs) where we install at no upfront cost and you buy the power.'
        ),
      },
    ],

    // CTA Section
    ctaHeading: 'Ready to Reduce Your Energy Costs?',
    ctaDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Get a free commercial solar assessment and ROI analysis',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    ctaButton: {
      text: 'Get Started',
      link: '/#contact',
    },

    // SEO
    metaTitle: 'Commercial Solar Panels for Business | Green Star Solar',
    metaDescription:
      'Reduce operating costs by up to 75% with commercial solar. Expert installation, ROI analysis, and ongoing support. Get your free business solar quote today.',

    // Settings
    published: true,
    showNavigation: true,
    showFooter: true,
  }

  try {
    const result = await client.create(doc)
    console.log('✅ Successfully created systemPage document!')
    console.log(`   Document ID: ${result._id}`)
    console.log(`   URL: /solar-panels-business`)
    return result
  } catch (error) {
    console.error('❌ Error creating document:', error)
    throw error
  }
}

// Main execution
async function main() {
  console.log('🎯 Starting system pages population...\n')

  try {
    // Check existing documents
    const existing = await client.fetch(
      `*[_type == "systemPage" && slug.current == "solar-panels-business"][0]`
    )

    if (existing) {
      console.log('⚠️  Document already exists!')
      console.log(`   Document ID: ${existing._id}`)
      console.log(`   To re-create, delete the existing document first.`)
      process.exit(0)
    }

    await populateSolarPanelsBusiness()

    console.log('\n🎉 Population complete!')
    console.log('\n📝 Next steps:')
    console.log('   1. Visit Sanity Studio to verify the content')
    console.log('   2. Create the server-rendered component')
    console.log('   3. Test in draft mode before going live')
  } catch (error) {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  }
}

main()
