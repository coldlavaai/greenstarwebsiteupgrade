/**
 * Service Pages Population Script
 *
 * Creates CMS pages for all 6 service pages with their hardcoded content converted to sections.
 * Run with: SANITY_API_WRITE_TOKEN=your_token npx tsx scripts/populate-service-pages.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const createTextBlock = (text: string) => ({
  _type: 'block',
  style: 'normal',
  children: [{ _type: 'span', text, marks: [] }],
  markDefs: [],
});

async function createSolarPanelsHomePage() {
  console.log('\n☀️ Creating Solar Panels for Home page...');

  const page = {
    _id: 'page-solar-panels-home',
    _type: 'page',
    title: 'Solar Panels for Home',
    slug: { _type: 'slug', current: 'solar-panels-home' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Solar Panels for Home | Greenstar Solar',
      metaDescription: 'Premium residential solar panel systems. Generate your own electricity, reduce bills by up to 85%, and achieve energy independence.',
    },
    sections: [
      // Hero Section
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'Solar Panels for Your Home',
        subheading: [createTextBlock('With energy prices continuing to rise, there has never been a better time to invest in solar panels and battery storage. We design every system around your home and energy goals, ensuring maximum performance and long term value.')],
        backgroundStyle: 'gradient',
        ctaButtons: [
          { _key: 'cta1', text: 'Get Free Quote', link: '/#contact', style: 'primary' },
          { _key: 'cta2', text: '← Back to Systems', link: '/#systems', style: 'secondary' },
        ],
      },
      // Premium Panels Content
      {
        _type: 'contentSection',
        _key: 'premium-panels',
        heading: 'Aiko Neostar 3S N-Type ABC',
        badge: 'Next Generation Technology',
        content: [
          createTextBlock('Our installations feature the Aiko Neostar 3S N Type ABC mono glass panels, the latest generation of high performance solar technology. These panels achieve efficiency levels of up to 24.3% and use precision overlap soldering for greater energy capture and a refined all black finish.'),
          createTextBlock('Each panel is covered by a 25 year product warranty and a 30 year performance warranty, offering lasting confidence in your investment.'),
        ],
        layout: 'centered',
      },
      // Stats Section
      {
        _type: 'statsSection',
        _key: 'panel-stats',
        heading: 'Premium Performance',
        stats: [
          { _key: 's1', value: '24.3%', label: 'Peak Efficiency', description: 'Industry-leading conversion rates' },
          { _key: 's2', value: '25/30', label: 'Year Warranties', description: '25 year product + 30 year performance' },
          { _key: 's3', value: 'All Black', label: 'Premium Finish', description: 'Refined aesthetic with precision soldering' },
        ],
        layout: 'grid',
      },
      // Complete System
      {
        _type: 'contentSection',
        _key: 'complete-system',
        heading: 'Power Your Independence',
        badge: 'Complete Energy Solutions',
        content: [createTextBlock('We pair these panels with hybrid inverters and battery systems from Hanchu, Fox ESS, EcoFlow, and Sigenergy, creating powerful, future ready energy solutions that allow you to generate, store, and manage your own clean energy with ease.')],
        layout: 'centered',
      },
      // Brand Partners
      {
        _type: 'gridSection',
        _key: 'brands',
        columns: 4,
        items: [
          { _key: 'b1', title: 'Hanchu', description: 'Advanced hybrid inverter technology' },
          { _key: 'b2', title: 'Fox ESS', description: 'Industry-leading energy storage' },
          { _key: 'b3', title: 'EcoFlow', description: 'Smart power management systems' },
          { _key: 'b4', title: 'Sigenergy', description: 'Next-gen battery solutions' },
        ],
      },
      // CTA
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Ready to Go Solar?',
        description: 'Get a free, no-obligation quote and site assessment from our expert team',
        buttonText: 'Book Free Consultation',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created Solar Panels for Home page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function createBatteryStorageHomePage() {
  console.log('\n🔋 Creating Battery Storage for Home page...');

  const page = {
    _id: 'page-battery-storage-home',
    _type: 'page',
    title: 'Battery Storage for Home',
    slug: { _type: 'slug', current: 'battery-storage-home' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Home Battery Storage | Greenstar Solar',
      metaDescription: 'Store excess solar energy and use it whenever you need it. Reduce grid dependence and maximize savings with intelligent battery storage.',
    },
    sections: [
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'Battery Storage for Your Home',
        subheading: [
          createTextBlock('Store the energy your solar panels generate during the day and use it whenever you need it, even after the sun goes down. With intelligent battery storage, you can power your home using your own renewable energy around the clock and significantly reduce your reliance on the grid.'),
        ],
        backgroundStyle: 'gradient',
        ctaButtons: [
          { _key: 'cta1', text: 'Get Free Quote', link: '/#contact', style: 'primary' },
        ],
      },
      {
        _type: 'gridSection',
        _key: 'benefits',
        heading: 'Why Add Battery Storage',
        columns: 3,
        items: [
          { _key: 'b1', title: 'Store Excess Energy', description: 'Capture surplus solar energy during the day and use it when you need it most' },
          { _key: 'b2', title: 'Maximize Savings', description: 'Reduce grid dependence and avoid peak electricity rates with stored power' },
          { _key: 'b3', title: 'Power at Night', description: 'Use your stored solar energy throughout the evening and night' },
          { _key: 'b4', title: 'Backup Power', description: 'Keep essential appliances running during power outages' },
          { _key: 'b5', title: 'Energy Independence', description: 'Take control of your energy supply and reduce grid reliance' },
          { _key: 'b6', title: 'Smart Management', description: 'Intelligent system optimizes when to store and when to use power' },
        ],
      },
      {
        _type: 'faqSection',
        _key: 'faqs',
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            _key: 'faq1',
            question: 'How much does a home battery storage system cost?',
            answer: [createTextBlock('Home battery systems typically range from £4,000-£8,000 depending on capacity. Most customers see payback within 10-15 years through energy savings and avoiding peak rates.')],
          },
          {
            _key: 'faq2',
            question: 'How long do solar batteries last?',
            answer: [createTextBlock('Modern lithium-ion batteries typically last 10-15 years with a warranty of 10 years. They maintain 70-80% capacity after this period.')],
          },
          {
            _key: 'faq3',
            question: 'Can I add battery storage to my existing solar panels?',
            answer: [createTextBlock('Yes! Battery storage can be retrofitted to most existing solar panel systems. We assess your current setup and recommend compatible battery solutions.')],
          },
          {
            _key: 'faq4',
            question: 'Will a battery power my whole home during an outage?',
            answer: [createTextBlock('Battery capacity varies, but most systems can power essential appliances for several hours to days. We help you prioritize which circuits to backup based on your needs.')],
          },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Ready to Store Your Energy?',
        description: 'Get a free assessment and discover how battery storage can maximize your solar investment',
        buttonText: 'Book Free Consultation',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created Battery Storage for Home page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function createSolarPanelsBusinessPage() {
  console.log('\n🏢 Creating Solar Panels for Business page...');

  const page = {
    _id: 'page-solar-panels-business',
    _type: 'page',
    title: 'Solar Panels for Business',
    slug: { _type: 'slug', current: 'solar-panels-business' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Commercial Solar Panels | Greenstar Solar',
      metaDescription: 'Reduce operating costs by up to 75% with commercial solar. Strategic investment delivering immediate and long-term value for businesses.',
    },
    sections: [
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'Solar Panels for Your Business',
        subheading: [createTextBlock('Power your business with clean, renewable energy and take control of rising electricity costs. Our commercial solar systems are designed to deliver long term savings, strengthen your sustainability credentials, and enhance energy independence.')],
        backgroundStyle: 'gradient',
        ctaButtons: [
          { _key: 'cta1', text: 'Get Free Assessment', link: '/#contact', style: 'primary' },
        ],
      },
      {
        _type: 'gridSection',
        _key: 'benefits',
        heading: 'Why Businesses Choose Solar Energy',
        columns: 3,
        items: [
          { _key: 'b1', title: 'Reduce Operating Costs', description: 'Cut electricity bills by up to 75% and improve your bottom line with commercial solar' },
          { _key: 'b2', title: 'Achieve Sustainability Goals', description: 'Meet corporate sustainability targets and reduce your carbon footprint significantly' },
          { _key: 'b3', title: 'Enhanced Brand Value', description: 'Demonstrate environmental leadership and attract eco-conscious customers' },
          { _key: 'b4', title: 'Energy Price Protection', description: 'Lock in energy costs and protect against rising electricity prices' },
          { _key: 'b5', title: 'Tax Incentives', description: 'Benefit from accelerated capital allowances and business energy schemes' },
          { _key: 'b6', title: 'Scalable Solutions', description: 'Flexible systems that grow with your business needs and energy demands' },
        ],
      },
      {
        _type: 'faqSection',
        _key: 'faqs',
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            _key: 'faq1',
            question: 'What is the typical ROI for commercial solar?',
            answer: [createTextBlock('Most businesses see a return on investment within 5-8 years. With 25+ year system lifespans, this means 15-20 years of significant energy savings.')],
          },
          {
            _key: 'faq2',
            question: 'How much roof space do I need?',
            answer: [createTextBlock('A typical 50kW commercial system requires approximately 250-300 square meters. We can design systems for various roof sizes and configurations, including ground-mounted options.')],
          },
          {
            _key: 'faq3',
            question: 'Will installation disrupt business operations?',
            answer: [createTextBlock('We schedule installations to minimize disruption, often working outside business hours or in phases. Most installations are completed within 1-4 weeks depending on system size.')],
          },
          {
            _key: 'faq4',
            question: 'What financing options are available?',
            answer: [createTextBlock('We offer multiple financing options including outright purchase, business loans, and Power Purchase Agreements (PPAs) where we install at no upfront cost and you buy the power.')],
          },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Transform Your Business Energy',
        description: 'Schedule a free commercial energy assessment and discover your savings potential',
        buttonText: 'Request Consultation',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created Solar Panels for Business page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function createBatteryStorageBusinessPage() {
  console.log('\n🏭 Creating Battery Storage for Business page...');

  const page = {
    _id: 'page-battery-storage-business',
    _type: 'page',
    title: 'Battery Storage for Business',
    slug: { _type: 'slug', current: 'battery-storage-business' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Commercial Battery Storage | Greenstar Solar',
      metaDescription: 'Optimize energy costs with commercial battery storage. Reduce peak demand charges, participate in grid services, and maximize your solar investment.',
    },
    sections: [
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'Battery Storage for Your Business',
        subheading: [createTextBlock('Optimize energy costs and ensure business continuity with commercial battery storage. Reduce peak demand charges, participate in grid services, and maximize your solar investment.')],
        backgroundStyle: 'gradient',
        ctaButtons: [
          { _key: 'cta1', text: 'Get Free Assessment', link: '/#contact', style: 'primary' },
        ],
      },
      {
        _type: 'gridSection',
        _key: 'benefits',
        heading: 'Commercial Battery Advantages',
        columns: 3,
        items: [
          { _key: 'b1', title: 'Peak Shaving', description: 'Reduce peak demand charges by storing energy during off-peak hours' },
          { _key: 'b2', title: 'Cost Optimization', description: 'Maximize savings with intelligent charging and discharging strategies' },
          { _key: 'b3', title: 'Time-of-Use Management', description: 'Store cheap electricity and use it during expensive peak periods' },
          { _key: 'b4', title: 'Business Continuity', description: 'Ensure uninterrupted operations during power outages with backup storage' },
          { _key: 'b5', title: 'Grid Services Revenue', description: 'Participate in grid services and generate additional revenue streams' },
          { _key: 'b6', title: 'Scalable Capacity', description: 'Expand storage capacity as your business energy needs grow' },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Optimize Your Energy Strategy',
        description: 'Schedule a free commercial energy assessment and discover your storage potential',
        buttonText: 'Request Consultation',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created Battery Storage for Business page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function createEVChargingPage() {
  console.log('\n⚡ Creating EV Charging page...');

  const page = {
    _id: 'page-ev-charging',
    _type: 'page',
    title: 'EV Charging',
    slug: { _type: 'slug', current: 'ev-charging' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Solar EV Charging | Greenstar Solar',
      metaDescription: 'Charge your electric vehicle with free solar energy. Smart EV charging solutions that integrate seamlessly with your solar system.',
    },
    sections: [
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'EV Charging Powered by Solar',
        subheading: [createTextBlock('Charge your electric vehicle with free solar energy. Our smart EV charging solutions integrate seamlessly with your solar and battery system, prioritising solar power to charge your car for pennies instead of pounds.')],
        backgroundStyle: 'gradient',
        ctaButtons: [
          { _key: 'cta1', text: 'Get Free Quote', link: '/#contact', style: 'primary' },
          { _key: 'cta2', text: '← Back to Systems', link: '/#systems', style: 'secondary' },
        ],
      },
      {
        _type: 'contentSection',
        _key: 'zappi',
        heading: 'Zappi Smart EV Charger',
        badge: 'Intelligent Solar Charging',
        content: [
          createTextBlock('Our installations feature the Zappi smart EV charger, the UK\'s leading solar-compatible home charging solution. The Zappi intelligently monitors your solar generation and diverts excess energy to charge your electric vehicle, maximising the use of free solar power and minimising grid consumption.'),
          createTextBlock('Available in both tethered and untethered options with charging speeds up to 7.4kW, the Zappi works seamlessly with your existing solar and battery system to deliver the greenest, most cost-effective charging experience possible.'),
        ],
        layout: 'centered',
      },
      {
        _type: 'statsSection',
        _key: 'specs',
        stats: [
          { _key: 's1', value: '7.4kW', label: 'Fast Charging', description: 'Charge your EV up to 4x faster than a standard plug' },
          { _key: 's2', value: '100%', label: 'Solar Compatible', description: 'Intelligently uses your solar generation to charge your car' },
          { _key: 's3', value: '3 Year', label: 'Warranty', description: 'Full manufacturer warranty with expert support' },
        ],
        layout: 'grid',
      },
      {
        _type: 'gridSection',
        _key: 'benefits',
        heading: 'Drive on Sunshine',
        columns: 3,
        items: [
          { _key: 'b1', title: 'Massive Savings', description: 'Charge your EV for as little as 2p per mile using free solar energy' },
          { _key: 'b2', title: 'Solar Priority', description: 'Zappi automatically prioritises solar power, only using grid electricity when solar isn\'t available' },
          { _key: 'b3', title: 'Battery Integration', description: 'Works seamlessly with home batteries to charge your car overnight using stored solar energy' },
          { _key: 'b4', title: 'Fast & Flexible', description: 'Charge at speeds up to 7.4kW with three modes: Fast, Eco, and Eco+' },
          { _key: 'b5', title: 'Smart Home Ready', description: 'Monitor and control charging via the myenergi app from anywhere' },
          { _key: 'b6', title: 'Zero Carbon', description: 'Drive completely emission-free by powering your EV with 100% renewable solar energy' },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Ready to charge your EV with free solar energy?',
        description: 'Get a free quote for a complete solar, battery, and EV charging system tailored to your needs',
        buttonText: 'Book Your Free Survey',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created EV Charging page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function createCaseStudiesPage() {
  console.log('\n📊 Creating Case Studies page...');

  const page = {
    _id: 'page-case-studies',
    _type: 'page',
    title: 'Case Studies',
    slug: { _type: 'slug', current: 'case-studies' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Solar Installation Case Studies | Greenstar Solar',
      metaDescription: 'Real results from real customers. Discover how homeowners and businesses have transformed their energy usage with Greenstar Solar.',
    },
    sections: [
      {
        _type: 'heroSectionObject',
        _key: 'hero',
        heading: 'Real Results from Real Customers',
        subheading: [createTextBlock('Discover how homeowners and businesses across Hampshire have transformed their energy usage with Greenstar Solar')],
        badge: 'Success Stories',
        backgroundStyle: 'gradient',
      },
      {
        _type: 'contentSection',
        _key: 'case-study-1',
        heading: 'The Johnson Family',
        badge: 'Southampton, Hampshire',
        content: [
          createTextBlock('8.4kW Solar + 13.5kWh Battery - Generating 7,800 kWh annually with 85% reduction in energy bills.'),
          createTextBlock('"The system has exceeded our expectations. We\'re now generating more energy than we use during the day and the battery keeps us powered through the evening."'),
          createTextBlock('Results: Monthly bills reduced from £180 to £27, complete energy independence during summer months, battery provides backup power during outages.'),
        ],
        layout: 'left',
      },
      {
        _type: 'contentSection',
        _key: 'case-study-2',
        heading: 'Green Manufacturing Ltd',
        badge: 'Portsmouth, Hampshire',
        content: [
          createTextBlock('95kW Commercial Solar Array - Generating 89,000 kWh annually with 72% reduction in energy costs.'),
          createTextBlock('"Greenstar delivered a professional installation with minimal disruption to our operations. The return on investment has been better than expected."'),
          createTextBlock('Results: Annual energy costs reduced by over £28,000, installation completed in just 2 weeks, enhanced corporate sustainability credentials.'),
        ],
        layout: 'right',
      },
      {
        _type: 'contentSection',
        _key: 'case-study-3',
        heading: 'The Smith Residence',
        badge: 'Winchester, Hampshire',
        content: [
          createTextBlock('6.8kW Solar + 9.5kWh Battery + EV Charger - Generating 6,200 kWh annually with 78% reduction in bills.'),
          createTextBlock('"We\'re now charging our electric car for free using solar energy. The battery means we can use solar power even at night. Couldn\'t be happier!"'),
          createTextBlock('Results: EV charging costs reduced to nearly zero, home energy bills down 78%, smart system optimizes solar usage automatically.'),
        ],
        layout: 'left',
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        heading: 'Ready to start your own success story?',
        buttonText: 'Book Your Free Survey',
        buttonLink: '/#contact',
        style: 'centered',
      },
    ],
  };

  try {
    await client.createOrReplace(page);
    console.log('✅ Created Case Studies page');
  } catch (error) {
    console.error('❌ Error creating page:', error);
  }
}

async function main() {
  console.log('🚀 Creating service pages...');
  console.log('=====================================\n');

  try {
    await createSolarPanelsHomePage();
    await createBatteryStorageHomePage();
    await createSolarPanelsBusinessPage();
    await createBatteryStorageBusinessPage();
    await createEVChargingPage();
    await createCaseStudiesPage();

    console.log('\n=====================================');
    console.log('✅ All service pages created!');
    console.log('=====================================\n');
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
