import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Company Information
const companyInfo = [
  {
    _type: 'companyInfo',
    _id: 'company-about-greenstar',
    title: 'About Greenstar Solar',
    slug: { _type: 'slug', current: 'about-greenstar-solar' },
    category: 'about',
    tagline: 'Energy for Life',
    experienceYears: 35,
    summary: 'At Greenstar Solar, our approach is simple: clear advice, honest education, and tailored solutions. We believe solar is an investment, not just a purchase.',
    servicesOffered: [
      'Solar Panel Installation',
      'Battery Storage Systems',
      'EV Charging Solutions',
      'Hybrid Inverter Systems',
      'Energy Management Systems',
    ],
    servicesNotOffered: ['Heat Pumps'],
    priority: 10,
    isPublished: true,
  },
]

// Customer Reviews
const reviews = [
  {
    _type: 'review',
    _id: 'review-google-phill-ballard',
    customerName: 'Phill Ballard',
    rating: 5,
    platform: 'google',

    reviewText: `Great service from beginning to end and at a great price. From Jon's initial visit and proposal through to decision and install - Greenstar provided a first rate service.`,
    systemDetails: '16 Aiko panels, 6kW Sigenergy inverter, 10kW Sigenstor battery',
    staffMentioned: ['Jon', 'Jack', 'Tobias'],
    customerType: 'residential',
    featured: true,
    isPublished: true,
    order: 1,
  },
  {
    _type: 'review',
    _id: 'review-google-yasmin',
    customerName: 'Yasmin Kingston',
    rating: 5,
    platform: 'google',

    reviewText: `Had a fantastic experience! I had about 6 quotes prior and this was the best by far. We are saving money in bills and have had no issues at all. 10/10 recommend.`,

    staffMentioned: ['John', 'Jack'],
    customerType: 'residential',
    featured: true,
    isPublished: true,
    order: 2,
  },
  {
    _type: 'review',
    _id: 'review-google-david-payne',
    customerName: 'David Payne',
    rating: 5,
    platform: 'google',

    reviewText: `Absolutely first class from start to finish. The system installation out performed my expectations and I'm so pleased I didn't go with one of large nationals.`,
    systemDetails: '14 panels, 6kW inverter, 8kW battery',
    staffMentioned: [],
    customerType: 'residential',
    featured: true,
    isPublished: true,
    order: 3,
  },
  {
    _type: 'review',
    _id: 'review-tp-kevin',
    customerName: 'Kevin',
    rating: 5,
    platform: 'trustpilot',
    reviewTitle: 'Stand Out Performance',
    reviewText: `I experienced so many hard sells from other companies. My first call with Jack & Jon was completely different. Speaking to knowledgeable technicians rather than tricky Salesmen. Installation in just one day.`,

    staffMentioned: ['Jack', 'Jon', 'Matt', 'Adam', 'Alex'],
    customerType: 'residential',
    featured: true,
    isPublished: true,
    order: 4,
  },
  {
    _type: 'review',
    _id: 'review-tp-olivia',
    customerName: 'Olivia',
    rating: 5,
    platform: 'trustpilot',
    reviewTitle: 'As a business owner',
    reviewText: `As a business owner, switching to solar made sense. GreenStar Solar made the whole process easy and efficient. Jack was fantastic. I'm already seeing reduced energy costs.`,

    staffMentioned: ['Jack'],
    customerType: 'commercial',
    featured: true,
    isPublished: true,
    order: 5,
  },
]

async function populateData() {
  try {
    console.log('🚀 Starting population...\n')

    console.log('🏢 Creating company information...')
    for (const info of companyInfo) {
      await client.createOrReplace(info)
      console.log(`  ✓ ${info.title}`)
    }

    console.log('\n⭐ Creating customer reviews...')
    for (const review of reviews) {
      await client.createOrReplace(review)
      console.log(`  ✓ ${review.customerName} (${review.platform})`)
    }

    console.log('\n✅ Population completed!')
    console.log(`📊 Total: ${reviews.length} reviews`)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

populateData()
