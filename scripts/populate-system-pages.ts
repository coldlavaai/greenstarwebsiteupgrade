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
