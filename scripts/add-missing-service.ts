/**
 * Add missing EV Charging service document
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function addEVChargingService() {
  console.log('⚡ Adding EV Charging service...');

  const service = {
    _id: 'service-ev-charging',
    _type: 'service',
    title: 'EV Charging',
    description: 'Smart EV charging powered by your solar energy. Charge your electric vehicle for pennies using free solar power.',
    category: 'residential',
    featured: true,
    position: 5,
    features: [
      'Solar-powered EV charging',
      'Zappi smart charger',
      'Up to 7.4kW charging speed',
      'Charge for 2p per mile',
    ],
    icon: 'Plug',
  };

  try {
    await client.createOrReplace(service);
    console.log('✅ EV Charging service created');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

addEVChargingService();
