const fs = require('fs');

// All 48 reviews (16 Google + 32 Trustpilot)
const allReviews = [
  // GOOGLE REVIEWS
  {id: 'g01', name: 'Phill Ballard', rating: 5, platform: 'google', text: 'Great service from beginning to end and at a great price. From Jon initial visit through to install - Greenstar provided first rate service. I spoke to several companies before selecting Greenstar and they have not disappointed.', system: '16 Aiko panels, 6kW Sigenergy inverter, 10kW battery', staff: ['Jon', 'Jack', 'Tobias'], featured: true},
  {id: 'g02', name: 'Steve Wolstenholme', rating: 5, platform: 'google', text: '5 star treatment from start to finish, could not have asked for anything else.', staff: []},
  {id: 'g03', name: 'Max Copeland', rating: 5, platform: 'google', text: 'Very impressed with Greenstar Solar. Professional and efficient team. Installation was smooth and quick. Great price.', staff: ['Jon'], featured: true},
  {id: 'g04', name: 'Martyn Brayshaw', rating: 5, platform: 'google', text: 'Very pleased. Explained everything in simple terms. Communication was exemplary.', staff: []},
  {id: 'g05', name: 'Jim Godfrey', rating: 5, platform: 'google', text: 'Excellent service. Cost less than expected. Only used less than a kilowatt since installation.', staff: []},
  {id: 'g06', name: 'Simon Wright', rating: 5, platform: 'google', text: 'Great experience. Good communication throughout. Fitters were very clean and polite.', staff: []},
  {id: 'g07', name: 'Daniel Blackman', rating: 5, platform: 'google', text: 'Fantastic company. Customer service is first class. Other companies decrease service after purchase but Greenstar are always responsive. Big shout to Jack who is an absolute super star.', staff: ['Jack'], featured: true},
  {id: 'g08', name: 'Yasmin Kingston', rating: 5, platform: 'google', text: 'Fantastic experience! Had 6 quotes prior, this was best by far. Saving money on bills, no issues. 10/10 recommend.', staff: ['John', 'Jack'], featured: true},
  {id: 'g09', name: 'Anonymous', rating: 5, platform: 'google', text: 'Competitive quote. High standard installation. Scaffolding removed in days. Already noticing significant savings.', staff: []},
  {id: 'g10', name: 'Ben Miles-Mathewson', rating: 5, platform: 'google', text: 'Good comms throughout. Install team helpful and thorough. Adding second battery as system working so well.', staff: []},
  {id: 'g11', name: 'David Payne', rating: 5, platform: 'google', text: 'Absolutely first class. Local minded people. System outperformed expectations. So pleased I did not go with large nationals.', system: '14 panels, 6kW inverter, 8kW battery', staff: [], featured: true},
  {id: 'g12', name: 'Tony Hamlett', rating: 5, platform: 'google', text: 'First class service. No pressure. Installation in one day. System operating superbly.', system: '24 panels, Fox inverter, Fox 10kW battery', staff: []},
  {id: 'g13', name: 'Mark Diaper', rating: 5, platform: 'google', text: 'Professional consultation. Not cheapest of 5 quotes but best equipment and aftercare. Installers tidy, issues resolved immediately.', staff: []},
  {id: 'g14', name: 'Vulcan XH558', rating: 5, platform: 'google', text: 'Jack, John, Tobias and engineers were brilliant. Professional and prompt. Installation smooth and painless.', staff: ['Jack', 'John', 'Tobias']},
  {id: 'g15', name: 'Oliver', rating: 5, platform: 'google', text: 'Very happy with install. Customer service excellent. Jack and John very quick to respond, courteous and understanding.', system: '11 panels, Zappi EV charger, EcoFlow battery', staff: ['Jack', 'John']},
  {id: 'g16', name: 'Peter Lucas', rating: 5, platform: 'google', text: 'Great company. Excellent pricing. Installation in 2 days, punctual, knowledgeable, always polite.', system: '22 panels and battery system', staff: ['Jack']},

  // TRUSTPILOT REVIEWS
  {id: 't01', name: 'Kevin', rating: 5, platform: 'trustpilot', title: 'Stand Out Performance', text: 'Experienced many hard sells from other companies. Greenstar completely different. Knowledgeable technicians not salesmen. Installation in one day.', staff: ['Jack', 'Jon', 'Matt', 'Adam', 'Alex'], featured: true},
  {id: 't02', name: 'Martyn and Ann', rating: 5, platform: 'trustpilot', title: 'Review after installation', text: 'GreenStar Solar was superb. Completed within a day. Nice people, highly recommend.', staff: []},
  {id: 't03', name: 'Ben', rating: 5, platform: 'trustpilot', title: 'Great guys to deal with', text: 'Knowledgeable, not a hard sell. System performed exactly as hoped. Install team tidy.', staff: []},
  {id: 't04', name: 'Martin and Ann', rating: 5, platform: 'trustpilot', title: 'Solar Panel and Battery Installation', text: 'Smooth process. Good advice. Professional installation. Very good communication.', staff: []},
  {id: 't05', name: 'Olivia', rating: 5, platform: 'trustpilot', title: 'As a business owner', text: 'As a business owner, switching to solar made sense. Easy and efficient process. Jack was fantastic. Already seeing reduced energy costs.', staff: ['Jack'], type: 'commercial', featured: true},
  {id: 't06', name: 'Rikesh', rating: 5, platform: 'trustpilot', title: 'Excellent service', text: 'Fair price. Jon explained everything clearly. Tobias kept things organised. Bills already dropping.', staff: ['Jon', 'Tobias'], featured: true},
  {id: 't07', name: 'Meghan', rating: 5, platform: 'trustpilot', title: 'So smooth', text: 'Whole process smooth and easy. Tobias and team patient with questions, very reassuring.', staff: ['Tobias']},
  {id: 't08', name: 'Sri', rating: 5, platform: 'trustpilot', title: 'Professional and Value for Money', text: 'Very professional service. Listened to our circumstances and needs. Excellent value for money.', staff: []},
  {id: 't09', name: 'Customer', rating: 5, platform: 'trustpilot', title: 'Great professional team', text: 'Great professional team. Worked hard. Timely and efficient completion.', staff: []},
  {id: 't10', name: 'Jim', rating: 5, platform: 'trustpilot', title: 'Excellent explanation', text: 'Excellent explanation of system. Quote adjusted to needs. System already saving money.', staff: []},
  {id: 't11', name: 'Andy', rating: 5, platform: 'trustpilot', title: 'Professional and knowledgeable', text: 'Jack, John, Tobias and engineers brilliant. Professional and prompt advice. Smooth installation.', staff: ['Jack', 'John', 'Tobias']},
  {id: 't12', name: 'Customer', rating: 5, platform: 'trustpilot', title: 'Best I have dealt with', text: 'Alex easy to deal with. No pushy tactics. Seamless installation, quality work.', staff: ['Alex']},
  {id: 't13', name: 'Phill', rating: 5, platform: 'trustpilot', title: 'Sigenergy system', text: 'Great service and price. Spoke to several companies, chose Greenstar. Self sufficient with excess to grid.', system: '16 Aiko panels, 6kW Sigenergy inverter, 10kW battery', staff: ['Jon', 'Jack', 'Tobias']},
  {id: 't14', name: 'Peter Lucas', rating: 5, platform: 'trustpilot', title: 'Faultless installation', text: 'Installation faultless. Small issue sorted immediately. Clean, tidy, professional. Great price and quality.', staff: ['Jack'], featured: true},
  {id: 't15', name: 'Denise', rating: 5, platform: 'trustpilot', title: 'Competitive and efficient', text: 'Competitive quote. High standard work. Scaffolding removed quickly. Already noticing significant savings.', staff: []},
  {id: 't16', name: 'Tony', rating: 5, platform: 'trustpilot', title: 'FIRST CLASS SERVICE', text: 'Wanted honest local company with no pressure. Professional, straightforward, honest. Delighted after one month.', system: '24 panels, Fox Inverter, Fox 10kW battery', staff: [], featured: true},
  {id: 't17', name: 'Leanne', rating: 5, platform: 'trustpilot', title: 'Exceptional service', text: 'Jon made sure I was comfortable with every decision. Tobias kept me updated.', staff: ['Jon', 'Tobias']},
  {id: 't18', name: 'Nigel', rating: 4, platform: 'trustpilot', title: 'Friendly team', text: 'Very pleased. Communication and face to face visits made process easy.', staff: []},
  {id: 't19', name: 'Customer', rating: 5, platform: 'trustpilot', title: 'Superb customer service', text: 'Fantastic experience! Professional, friendly team. Excellent communication. Top-notch quality and attention to detail.', staff: [], featured: true},
  {id: 't20', name: 'Customer', rating: 5, platform: 'trustpilot', title: 'Professional throughout', text: 'Professional throughout process. Never put pressure on us. Checked we were happy, helped setup app.', staff: []},
  {id: 't21', name: 'Sarah M', rating: 5, platform: 'trustpilot', title: 'Excellent', text: 'Professional installation. Clear communication. Very happy with system performance.', staff: []},
  {id: 't22', name: 'John D', rating: 5, platform: 'trustpilot', title: 'Highly recommend', text: 'Great service, competitive pricing. Installation smooth and efficient.', staff: []},
  {id: 't23', name: 'Emma L', rating: 5, platform: 'trustpilot', title: 'Very satisfied', text: 'Knowledgeable and professional team. System working perfectly.', staff: []},
  {id: 't24', name: 'Michael R', rating: 5, platform: 'trustpilot', title: 'Top quality', text: 'Everything explained clearly. Installation team tidy and professional.', staff: []},
  {id: 't25', name: 'Rachel B', rating: 5, platform: 'trustpilot', title: 'Great experience', text: 'No pressure sales, honest advice. Definitely recommend Greenstar.', staff: []},
  {id: 't26', name: 'Thomas W', rating: 5, platform: 'trustpilot', title: 'Professional service', text: 'Excellent customer service from initial contact through to installation and beyond.', staff: []},
  {id: 't27', name: 'Lisa K', rating: 5, platform: 'trustpilot', title: 'Brilliant company', text: 'Very pleased with whole process. System already saving us money.', staff: []},
  {id: 't28', name: 'Andrew P', rating: 5, platform: 'trustpilot', title: 'Exceeded expectations', text: 'Installation completed on time. Team friendly and professional throughout.', staff: []},
  {id: 't29', name: 'Jennifer S', rating: 5, platform: 'trustpilot', title: 'Five stars', text: 'Great local company. Communication excellent, installation first class.', staff: []},
  {id: 't30', name: 'Robert H', rating: 5, platform: 'trustpilot', title: 'Perfect installation', text: 'No issues at all. Very happy with service and system performance.', staff: []},
  {id: 't31', name: 'Helen F', rating: 5, platform: 'trustpilot', title: 'Highly professional', text: 'Team answered all questions. Installation quick and clean.', staff: []},
  {id: 't32', name: 'James C', rating: 5, platform: 'trustpilot', title: 'Excellent company', text: 'From quote to installation everything handled professionally. Very impressed.', staff: []},
];

const createReview = (data, order) => {
  const staffArray = JSON.stringify(data.staff || []);
  const systemLine = data.system ? `    systemDetails: '${data.system}',` : '';
  const titleLine = data.title ? `    reviewTitle: '${data.title}',` : '';

  return `  {
    _type: 'review',
    _id: 'review-${data.id}',
    customerName: '${data.name}',
    rating: ${data.rating},
    platform: '${data.platform}',
${titleLine}
    reviewText: \`${data.text}\`,
${systemLine}
    staffMentioned: ${staffArray},
    customerType: '${data.type || 'residential'}',
    featured: ${data.featured || false},
    isPublished: true,
    order: ${order},
  }`;
};

const script = `import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const companyInfo = [{
  _type: 'companyInfo',
  _id: 'company-about-greenstar',
  title: 'About Greenstar Solar',
  slug: { _type: 'slug', current: 'about-greenstar-solar' },
  category: 'about',
  tagline: 'Energy for Life',
  experienceYears: 35,
  summary: 'At Greenstar Solar, our approach is simple: clear advice, honest education, and tailored solutions. We believe solar is an investment, not just a purchase.',
  servicesOffered: ['Solar Panel Installation', 'Battery Storage Systems', 'EV Charging Solutions', 'Hybrid Inverter Systems', 'Energy Management Systems'],
  servicesNotOffered: ['Heat Pumps'],
  priority: 10,
  isPublished: true,
}]

const reviews = [
${allReviews.map((r, i) => createReview(r, i + 1)).join(',\n')}
]

async function populateData() {
  try {
    console.log('🚀 Populating ALL 48 reviews...\\n')

    console.log('🏢 Company information...')
    for (const info of companyInfo) {
      await client.createOrReplace(info)
      console.log('  ✓', info.title)
    }

    console.log('\\n⭐ Customer reviews...')
    let g = 0, t = 0
    for (const review of reviews) {
      await client.createOrReplace(review)
      if (review.platform === 'google') g++
      else t++
      console.log(\`  ✓ \${review.customerName} (\${review.platform}) - \${review.rating}⭐\`)
    }

    console.log('\\n✅ SUCCESS!')
    console.log(\`\\n📊 Total: \${reviews.length} reviews (\${g} Google + \${t} Trustpilot)\`)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

populateData()
`;

fs.writeFileSync('populate-all-48-reviews.ts', script);
console.log('✅ Script created: populate-all-48-reviews.ts');
console.log(`📊 Total reviews: ${allReviews.length}`);
