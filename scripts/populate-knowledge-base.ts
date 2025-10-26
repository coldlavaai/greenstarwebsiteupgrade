import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Product Categories
const categories = [
  {
    _type: 'productCategory',
    _id: 'cat-solar-panels',
    name: 'Solar Panels',
    slug: { _type: 'slug', current: 'solar-panels' },
    description: 'High-efficiency photovoltaic modules for solar energy generation',
  },
  {
    _type: 'productCategory',
    _id: 'cat-inverters',
    name: 'Inverters',
    slug: { _type: 'slug', current: 'inverters' },
    description: 'Hybrid and AC inverters for solar power conversion',
  },
  {
    _type: 'productCategory',
    _id: 'cat-batteries',
    name: 'Battery Storage',
    slug: { _type: 'slug', current: 'battery-storage' },
    description: 'High-capacity energy storage systems',
  },
  {
    _type: 'productCategory',
    _id: 'cat-ev-chargers',
    name: 'EV Chargers',
    slug: { _type: 'slug', current: 'ev-chargers' },
    description: 'Electric vehicle charging solutions',
  },
  {
    _type: 'productCategory',
    _id: 'cat-controllers',
    name: 'Energy Controllers',
    slug: { _type: 'slug', current: 'energy-controllers' },
    description: 'Smart energy management and control systems',
  },
]

// Products Data
const products = [
  // AIKO SOLAR PANELS
  {
    _type: 'product',
    _id: 'prod-aiko-neostar-3s54-460',
    name: 'AIKO Neostar 3S54 460W',
    slug: { _type: 'slug', current: 'aiko-neostar-3s54-460w' },
    brand: 'AIKO',
    model: 'AIKO-A460-MCE54Mb',
    category: { _type: 'reference', _ref: 'cat-solar-panels' },
    shortDescription: 'High-efficiency N-Type ABC solar panel with 23.0% efficiency and 25-year product warranty',
    keyFeatures: [
      'N-Type ABC Cell Technology',
      '23.0% Module Efficiency',
      '25 Year Product Warranty',
      '30 Year Performance Warranty',
      'Partial Shading Optimization',
      'Better Temperature Coefficient',
      'Micro-crack Resistance',
      'IP68 Junction Box',
    ],
    specifications: [
      {
        category: 'Electrical Characteristics (STC)',
        specs: [
          { name: 'Max Power (Pmax)', value: '460', unit: 'W' },
          { name: 'Module Efficiency', value: '23.0', unit: '%' },
          { name: 'Open Circuit Voltage (Voc)', value: '40.50', unit: 'V' },
          { name: 'Voltage at Max Power (Vmp)', value: '34.10', unit: 'V' },
          { name: 'Short Circuit Current (Isc)', value: '14.66', unit: 'A' },
          { name: 'Current at Max Power (Imp)', value: '13.50', unit: 'A' },
        ],
      },
      {
        category: 'Physical Specifications',
        specs: [
          { name: 'Cell Type', value: 'N-Type ABC', unit: '' },
          { name: 'Number of Cells', value: '108 (6x18)', unit: '' },
          { name: 'Dimensions', value: '1762 x 1134 x 30', unit: 'mm' },
          { name: 'Weight', value: '20.6', unit: 'kg' },
          { name: 'Glass', value: '3.2mm tempered glass', unit: '' },
          { name: 'Frame', value: 'Black anodized aluminum', unit: '' },
        ],
      },
      {
        category: 'Temperature Ratings',
        specs: [
          { name: 'Temperature Coefficient of Pmax', value: '-0.26', unit: '%/°C' },
          { name: 'Operating Temperature', value: '-40 to +85', unit: '°C' },
          { name: 'Maximum System Voltage', value: '1500', unit: 'V DC' },
        ],
      },
    ],
    warranty: {
      product: '25 years',
      performance: '30 years - 90.6% at 25 years, 88.85% at 30 years',
      details: 'First-year degradation ≤1%, Annual degradation years 2-30 ≤0.35%',
    },
    certifications: ['IEC Class C', 'TÜV Rheinland', 'Munich RE'],
    tags: ['solar-panel', 'n-type', 'high-efficiency', 'residential', 'commercial'],
    featured: true,
    inStock: true,
  },

  // SIGEN ENERGY CONTROLLER - SINGLE PHASE
  {
    _type: 'product',
    _id: 'prod-sigen-controller-8kw-sp',
    name: 'Sigen Energy Controller 8.0 kW Single Phase',
    slug: { _type: 'slug', current: 'sigen-energy-controller-8kw-sp' },
    brand: 'Sigenergy',
    model: 'SigenStor EC 8.0 SP',
    category: { _type: 'reference', _ref: 'cat-controllers' },
    shortDescription: '8kW single-phase hybrid energy controller with EMS inside, up to 4 MPPT trackers, and on/off-grid compatibility',
    keyFeatures: [
      'EMS inside for precise control',
      'Up to 4 MPPT trackers',
      'Multi-source black start',
      'On & off-grid compatibility',
      'DC/AC ratio up to 2',
      'IP66 system protection rating',
      '97.6% max efficiency',
      'Compatible with SigenStor BAT 5.0/8.0',
    ],
    specifications: [
      {
        category: 'DC Input (from PV)',
        specs: [
          { name: 'Max PV power', value: '16000', unit: 'W' },
          { name: 'Max DC input voltage', value: '600', unit: 'V' },
          { name: 'MPPT voltage range', value: '80-550', unit: 'V' },
          { name: 'Number of MPPT trackers', value: '3', unit: '' },
          { name: 'Max input current per MPPT', value: '16', unit: 'A' },
        ],
      },
      {
        category: 'AC Output (on-grid)',
        specs: [
          { name: 'Nominal output power', value: '8000', unit: 'W' },
          { name: 'Max output apparent power', value: '8800', unit: 'VA' },
          { name: 'Nominal output voltage', value: '220/230', unit: 'V' },
          { name: 'Power factor', value: '0.8 leading to 0.8 lagging', unit: '' },
        ],
      },
      {
        category: 'AC Output (backup)',
        specs: [
          { name: 'Peak output power (10s)', value: '12000', unit: 'W' },
          { name: 'Disruption time', value: '0', unit: 'ms' },
        ],
      },
      {
        category: 'Battery Connection',
        specs: [
          { name: 'Compatible models', value: 'SigenStor BAT 5.0 / 8.0', unit: '' },
          { name: 'Number of modules', value: '1-6', unit: 'pcs' },
          { name: 'Battery voltage range', value: '300-600', unit: 'V' },
        ],
      },
      {
        category: 'General',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '700 x 300 x 260', unit: 'mm' },
          { name: 'Weight', value: '36', unit: 'kg' },
          { name: 'Operating temperature', value: '-30 to +60', unit: '°C' },
          { name: 'Ingress protection', value: 'IP66', unit: '' },
        ],
      },
    ],
    warranty: {
      product: 'Standard manufacturer warranty',
      details: 'Contact Sigenergy for specific warranty terms',
    },
    certifications: ['IEC/EN 62109-1', 'IEC/EN 62109-2', 'IEC/EN 62477', 'VDE-AR-N 4105'],
    tags: ['hybrid-inverter', 'energy-controller', 'single-phase', 'mppt', 'backup-power'],
    featured: true,
    inStock: true,
  },

  // SIGEN BATTERY
  {
    _type: 'product',
    _id: 'prod-sigen-battery-8kw',
    name: 'Sigen Battery 8.0 kWh',
    slug: { _type: 'slug', current: 'sigen-battery-8kwh' },
    brand: 'Sigenergy',
    model: 'SigenStor BAT 8.0',
    category: { _type: 'reference', _ref: 'cat-batteries' },
    shortDescription: 'High-capacity LiFePO4 battery with 280Ah cells, 10,000 cycle life, and 5-layer battery protection',
    keyFeatures: [
      'Large 280Ah cell capacity',
      '10,000 cycle life',
      'LiFePO4 (LFP) chemistry',
      '95% depth of discharge',
      '5-layer battery protection',
      'IP66 protection rating',
      'Natural convection cooling',
      'Stackable up to 6 units (48kWh)',
    ],
    specifications: [
      {
        category: 'Performance',
        specs: [
          { name: 'Total energy capacity', value: '8.06', unit: 'kWh' },
          { name: 'Usable energy capacity', value: '7.8', unit: 'kWh' },
          { name: 'Battery cell type', value: 'LiFePO4', unit: '' },
          { name: 'Cell capacity', value: '280', unit: 'Ah' },
          { name: 'Cycle life', value: '10000', unit: 'cycles' },
          { name: 'Depth of discharge', value: '95', unit: '%' },
        ],
      },
      {
        category: 'Electrical',
        specs: [
          { name: 'Battery voltage range (single phase)', value: '300-600', unit: 'V' },
          { name: 'Battery voltage range (three phase)', value: '600-900', unit: 'V' },
          { name: 'Max charge/discharge power', value: '4000', unit: 'W' },
          { name: 'Peak power (10 seconds)', value: '6000', unit: 'W' },
        ],
      },
      {
        category: 'Physical',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '767 x 270 x 260', unit: 'mm' },
          { name: 'Weight', value: '70', unit: 'kg' },
        ],
      },
      {
        category: 'Operating Conditions',
        specs: [
          { name: 'Operating temperature', value: '-20 to +55', unit: '°C' },
          { name: 'Storage temperature', value: '-25 to +60', unit: '°C' },
          { name: 'Humidity range', value: '5-95', unit: '% (non-condensing)' },
          { name: 'Ingress protection', value: 'IP66', unit: '' },
        ],
      },
    ],
    warranty: {
      product: '15 years (industry-leading)',
      performance: '10,000 cycles till 70% SOH',
      details: 'Based on CATL LFP cell test conditions at 25±2°C',
    },
    certifications: ['IEC/EN 60730-1', 'UN 38.3', 'IEC/EN 62619', 'IEC/EN 63056', 'IEC/EN 62040'],
    tags: ['battery', 'energy-storage', 'lfp', 'lithium', 'home-battery', 'stackable'],
    featured: true,
    inStock: true,
  },

  // ECOFLOW POWEROCEAN
  {
    _type: 'product',
    _id: 'prod-ecoflow-powerocean-single',
    name: 'EcoFlow PowerOcean Single Phase System',
    slug: { _type: 'slug', current: 'ecoflow-powerocean-single-phase' },
    brand: 'EcoFlow',
    model: 'PowerOcean Single Phase',
    category: { _type: 'reference', _ref: 'cat-batteries' },
    shortDescription: '800V high-voltage LFP battery system with integrated hybrid inverter, expandable from 5kWh to 15kWh',
    keyFeatures: [
      '800V high-voltage system',
      'Start from 5kWh, expand to 15kWh',
      'CATL LFP cells',
      '15-year warranty',
      '6000+ cycle life',
      'IP65 protection',
      'Active fire protection module',
      'Auto-heating for winter operation',
    ],
    specifications: [
      {
        category: 'Battery (1 Pack)',
        specs: [
          { name: 'Battery nominal capacity', value: '5.1', unit: 'kWh' },
          { name: 'Usable capacity (95% DoD)', value: '4.8', unit: 'kWh' },
          { name: 'Nominal voltage', value: '800', unit: 'V' },
          { name: 'Operating voltage range', value: '720-960', unit: 'V' },
          { name: 'Max output power', value: '3.3', unit: 'kW' },
        ],
      },
      {
        category: 'Hybrid Inverter (3kW)',
        specs: [
          { name: 'Rated power', value: '3000', unit: 'W' },
          { name: 'Max PV power', value: '9000', unit: 'W' },
          { name: 'Max efficiency', value: '>96', unit: '%' },
          { name: 'Number of MPPTs', value: '2', unit: '' },
        ],
      },
      {
        category: 'Physical',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '680 x 183 x 452', unit: 'mm' },
          { name: 'Weight', value: '59.2', unit: 'kg' },
        ],
      },
    ],
    warranty: {
      product: '15 years',
      performance: '6000+ cycles',
      details: 'Industry-leading 15-year warranty with CATL LFP cells',
    },
    certifications: ['CB/CE MARK', 'EN62619', 'EN62040-1', 'VDE-AR-E 2510-50', 'UN38.3'],
    tags: ['battery-system', 'hybrid', 'lfp', 'integrated', 'high-voltage'],
    featured: true,
    inStock: true,
  },

  // FOX ESS K-SERIES
  {
    _type: 'product',
    _id: 'prod-foxess-kh-8kw',
    name: 'Fox ESS KH 8kW Hybrid Inverter',
    slug: { _type: 'slug', current: 'fox-ess-kh-8kw-hybrid' },
    brand: 'Fox ESS',
    model: 'KH8',
    category: { _type: 'reference', _ref: 'cat-inverters' },
    shortDescription: '8kW single-phase hybrid inverter with up to 4 MPPT trackers, battery ready, and IP65 rating',
    keyFeatures: [
      'High voltage compatibility (85-480V)',
      'Up to 4 MPPT trackers',
      'On & off-grid capability',
      'DC/AC ratio up to 2',
      'IP65 protection rating',
      '98% max efficiency',
      '10kW peak backup power',
    ],
    specifications: [
      {
        category: 'DC Input',
        specs: [
          { name: 'Max PV power', value: '12000', unit: 'W' },
          { name: 'Max DC voltage', value: '600', unit: 'V' },
          { name: 'MPPT voltage range', value: '80-500', unit: 'V' },
          { name: 'Number of MPPTs', value: '3', unit: '' },
        ],
      },
      {
        category: 'AC Output',
        specs: [
          { name: 'Nominal power', value: '8000', unit: 'W' },
          { name: 'Max apparent power', value: '8800', unit: 'VA' },
          { name: 'Nominal voltage', value: '220/230/240', unit: 'V' },
          { name: 'Max efficiency', value: '97.8', unit: '%' },
        ],
      },
      {
        category: 'Battery',
        specs: [
          { name: 'Battery voltage range', value: '85-480', unit: 'V' },
          { name: 'Max charge current', value: '50', unit: 'A' },
          { name: 'Max discharge current', value: '50', unit: 'A' },
        ],
      },
    ],
    warranty: {
      product: 'Standard manufacturer warranty',
      details: 'Contact Fox ESS for specific warranty terms',
    },
    certifications: ['IEC62109-1', 'IEC62109-2', 'IEC62477-1', 'G99', 'EN50549'],
    tags: ['hybrid-inverter', 'mppt', 'battery-ready', 'backup-power'],
    featured: false,
    inStock: true,
  },

  // FOX ESS EVO SERIES
  {
    _type: 'product',
    _id: 'prod-foxess-evo10-8h',
    name: 'Fox ESS EVO 10.8kW/10.24kWh All-in-One System',
    slug: { _type: 'slug', current: 'fox-ess-evo-10-8h' },
    brand: 'Fox ESS',
    model: 'EVO10-8H',
    category: { _type: 'reference', _ref: 'cat-batteries' },
    shortDescription: 'Fully integrated energy storage system with 8kW inverter, 10.24kWh LFP battery, IP66 rating, and EPS function',
    keyFeatures: [
      'Fully integrated all-in-one system',
      '8kW hybrid inverter built-in',
      '10.24kWh LFP battery included',
      'IP66 rated for outdoor use',
      'EPS backup function',
      'Double off-grid backup capability (200% overload for 10s)',
      '4ms parallel off-grid switching',
      '95% DoD',
    ],
    specifications: [
      {
        category: 'System Overview',
        specs: [
          { name: 'Battery energy', value: '10.24', unit: 'kWh' },
          { name: 'Depth of discharge', value: '95', unit: '%' },
          { name: 'Inverter rated power', value: '8000', unit: 'W' },
          { name: 'Max PV power', value: '18000', unit: 'W' },
        ],
      },
      {
        category: 'Battery',
        specs: [
          { name: 'Battery type', value: 'Lithium (LFP)', unit: '' },
          { name: 'Cycle life', value: '6000', unit: 'cycles' },
        ],
      },
      {
        category: 'Physical',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '584 x 1009 x 197', unit: 'mm' },
          { name: 'Weight', value: '113', unit: 'kg' },
          { name: 'Installation', value: 'Floor/Wall-mounted', unit: '' },
        ],
      },
    ],
    warranty: {
      product: 'Standard manufacturer warranty',
      details: 'Contact Fox ESS for specific warranty terms',
    },
    certifications: ['IEC62109-1', 'IEC62109-2', 'IEC62040', 'EN62619'],
    tags: ['all-in-one', 'integrated-system', 'lfp', 'backup-power', 'outdoor-rated'],
    featured: true,
    inStock: true,
  },

  // FOX ESS EP6
  {
    _type: 'product',
    _id: 'prod-foxess-ep6',
    name: 'Fox ESS EP6 Battery (5.76kWh)',
    slug: { _type: 'slug', current: 'fox-ess-ep6-battery' },
    brand: 'Fox ESS',
    model: 'EP6',
    category: { _type: 'reference', _ref: 'cat-batteries' },
    shortDescription: 'High-voltage LFP battery module, scalable to 23.04kWh, with 90% DoD and IP65 protection',
    keyFeatures: [
      '5.76kWh per module',
      'Scalable to 23.04kWh (4 units)',
      '90% depth of discharge',
      'LFP (LiFePO4) chemistry',
      'IP65 protection',
      'Floor or wall mounting',
      'Compatible with Fox H1, KH, H3 series',
    ],
    specifications: [
      {
        category: 'Electrical',
        specs: [
          { name: 'Nominal energy', value: '5.76', unit: 'kWh' },
          { name: 'Nominal voltage', value: '192', unit: 'V' },
          { name: 'Operating voltage', value: '174-219', unit: 'V' },
          { name: 'Max charge/discharge current', value: '30', unit: 'A' },
          { name: 'Peak discharge current (60s)', value: '65', unit: 'A' },
          { name: 'Round-trip efficiency', value: '≥95', unit: '%' },
          { name: 'Depth of discharge', value: '90', unit: '%' },
        ],
      },
      {
        category: 'Physical',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '380 x 640 x 185', unit: 'mm' },
          { name: 'Weight', value: '51', unit: 'kg' },
          { name: 'Ingress protection', value: 'IP65', unit: '' },
        ],
      },
      {
        category: 'Operating Conditions',
        specs: [
          { name: 'Operating temperature (charge)', value: '0 to +55', unit: '°C' },
          { name: 'Operating temperature (discharge)', value: '-10 to +55', unit: '°C' },
        ],
      },
    ],
    warranty: {
      product: 'Standard manufacturer warranty',
      details: 'Contact Fox ESS for specific warranty terms',
    },
    certifications: ['IEC62619', 'EN IEC 61000-6-1/2/3/4', 'UN38.3', 'IP65'],
    tags: ['battery', 'lfp', 'modular', 'high-voltage', 'scalable'],
    featured: false,
    inStock: true,
  },

  // SIGEN EV DC CHARGING MODULE
  {
    _type: 'product',
    _id: 'prod-sigen-evdc-25kw',
    name: 'Sigen EV DC Charging Module 25kW',
    slug: { _type: 'slug', current: 'sigen-ev-dc-25kw' },
    brand: 'Sigenergy',
    model: 'SigenStor EVDC 25',
    category: { _type: 'reference', _ref: 'cat-ev-chargers' },
    shortDescription: '25kW bi-directional DC fast charger with V2X capability, 150-1000V charging range, and IP66 rating',
    keyFeatures: [
      'V2X ready (bi-directional charging)',
      'Max 25kW charging/discharging',
      'Wide voltage range 150-1000V',
      'Max 80A output current',
      'CCS2 connector',
      'IP66 protection',
      'Remote control via mySigen App',
      'Charge with green solar power',
    ],
    specifications: [
      {
        category: 'DC Charging',
        specs: [
          { name: 'Max charging power', value: '25', unit: 'kW' },
          { name: 'Max discharging power (V2X)', value: '25', unit: 'kW' },
          { name: 'Operation voltage range', value: '150-1000', unit: 'V' },
          { name: 'Max operation current', value: '80', unit: 'A' },
          { name: 'Charging interface', value: 'CCS2', unit: '' },
        ],
      },
      {
        category: 'Physical',
        specs: [
          { name: 'Dimensions (W/H/D)', value: '700 x 270 x 260', unit: 'mm' },
          { name: 'Weight (with cable)', value: '37-41', unit: 'kg' },
          { name: 'Cable length options', value: '5 / 7.5 / 10', unit: 'm' },
        ],
      },
      {
        category: 'Operating Conditions',
        specs: [
          { name: 'Operating temperature', value: '-30 to +60', unit: '°C' },
          { name: 'Ingress protection', value: 'IP66', unit: '' },
        ],
      },
    ],
    warranty: {
      product: 'Standard manufacturer warranty',
      details: 'Contact Sigenergy for specific warranty terms',
    },
    certifications: ['EN IEC 61851-1', 'EN 61851-23', 'EN IEC 61851-21-2', 'ETSI EN 303 645'],
    tags: ['ev-charger', 'dc-charger', 'v2x', 'bidirectional', 'fast-charging'],
    featured: true,
    inStock: true,
  },
]

// FAQs
const faqs = [
  {
    _type: 'faq',
    _id: 'faq-solar-panel-efficiency',
    question: 'What is the difference between N-Type and traditional solar panels?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'N-Type solar panels, like the AIKO Neostar series, offer several advantages over traditional P-Type panels: higher efficiency (23%+ vs 20-21%), better temperature coefficient (loses less power in heat), improved low-light performance, and reduced degradation over time. N-Type ABC (All Back Contact) technology also provides better shading tolerance and aesthetic appeal with no visible front contacts.',
          },
        ],
      },
    ],
    category: 'products',
    order: 1,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-battery-lifespan',
    question: 'How long do LFP batteries last?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'LFP (Lithium Iron Phosphate) batteries used in systems like Sigen Battery and EcoFlow PowerOcean typically last 6,000-10,000 charge cycles. This translates to 15-20 years of daily use. LFP batteries maintain 70-80% capacity even after these cycles, making them ideal for long-term solar energy storage.',
          },
        ],
      },
    ],
    category: 'products',
    relatedProducts: [
      { _type: 'reference', _ref: 'prod-sigen-battery-8kw' },
      { _type: 'reference', _ref: 'prod-ecoflow-powerocean-single' },
    ],
    order: 2,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-hybrid-inverter-vs-standard',
    question: 'What is a hybrid inverter and why do I need one?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A hybrid inverter combines the functions of a solar inverter and a battery inverter in one unit. It can convert DC power from solar panels to AC power for your home, charge batteries, and draw power from batteries when needed. This provides backup power during outages, maximizes self-consumption, and enables energy independence. Standard inverters only convert solar power and cannot work with batteries.',
          },
        ],
      },
    ],
    category: 'technical',
    relatedProducts: [
      { _type: 'reference', _ref: 'prod-sigen-controller-8kw-sp' },
      { _type: 'reference', _ref: 'prod-foxess-kh-8kw' },
    ],
    order: 3,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-mppt-trackers',
    question: 'What are MPPT trackers and how many do I need?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'MPPT (Maximum Power Point Tracking) trackers optimize the power output from solar panels. Multiple MPPT trackers (2-4) allow you to connect panels on different roof orientations or with different shading conditions. Each tracker works independently to maximize power from its connected panels. More trackers = more flexibility in system design and better performance in complex installations.',
          },
        ],
      },
    ],
    category: 'technical',
    order: 4,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-backup-power-duration',
    question: 'How long will my battery provide backup power during an outage?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Backup duration depends on your battery capacity and power consumption. For example, an 8kWh battery (like Sigen Battery 8.0) with 95% usable capacity (~7.6kWh) can power: Essential loads (1kW) for 7-8 hours, Normal household loads (2-3kW) for 2.5-3.8 hours, or Peak loads (5kW) for 1.5 hours. Systems can be expanded with additional batteries for longer backup times.',
          },
        ],
      },
    ],
    category: 'general',
    order: 5,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-v2x-capability',
    question: 'What is V2X and how does it work with EV chargers?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'V2X (Vehicle-to-Everything) allows bi-directional energy flow between your electric vehicle and home. With a V2X-ready charger like the Sigen EV DC Charging Module, your EV battery can: charge from your solar system, provide backup power to your home during outages, sell excess energy back to the grid, and help balance grid demand. This effectively turns your EV into a mobile energy storage system.',
          },
        ],
      },
    ],
    category: 'products',
    relatedProducts: [{ _type: 'reference', _ref: 'prod-sigen-evdc-25kw' }],
    order: 6,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-system-expansion',
    question: 'Can I expand my system later if my energy needs increase?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes! Most modern solar and battery systems are designed for expansion. You can: add more solar panels (within inverter capacity limits), stack additional batteries (Sigen up to 48kWh, Fox EP6 up to 23kWh), parallel multiple inverters for increased capacity, and add EV chargers or other loads. Always check compatibility and ensure your inverter can handle the additional capacity.',
          },
        ],
      },
    ],
    category: 'general',
    order: 7,
    isPublished: true,
  },
  {
    _type: 'faq',
    _id: 'faq-warranty-coverage',
    question: 'What do product warranties cover?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Solar panel warranties typically include: Product warranty (25 years) covering manufacturing defects and physical damage, and Performance warranty (30 years) guaranteeing minimum power output (usually 80-90% after 25-30 years). Battery warranties cover: Cycle life (6,000-10,000 cycles), Capacity retention (typically to 70-80% SOH), and Manufacturing defects. Inverters usually have 5-10 year warranties. Always review specific warranty terms with your installer.',
          },
        ],
      },
    ],
    category: 'warranties',
    order: 8,
    isPublished: true,
  },
]

// Knowledge Base Articles
const knowledgeBaseArticles = [
  {
    _type: 'knowledgeBase',
    _id: 'kb-system-sizing',
    title: 'How to Size Your Solar and Battery System',
    slug: { _type: 'slug', current: 'how-to-size-solar-battery-system' },
    category: 'general',
    summary:
      'Complete guide to determining the right system size based on your energy consumption, roof space, and budget.',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Understanding Your Energy Needs' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start by reviewing your electricity bills to understand your average daily consumption in kWh. Most UK homes use 8-15 kWh per day.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Solar Panel Sizing' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A typical 4kW solar system (8-10 panels of 460-490W each) generates approximately 3,400kWh annually in the UK, covering 80-100% of average household consumption. Consider roof orientation, shading, and available space.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Battery Storage Sizing' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Battery capacity should typically cover your evening/night consumption (40-60% of daily usage). For a home using 10kWh/day, a 5-8kWh battery is usually sufficient. Larger batteries (10-15kWh) provide full backup capability.',
          },
        ],
      },
    ],
    tags: ['system-design', 'sizing', 'solar-panels', 'battery-storage'],
    priority: 10,
    isPublished: true,
  },
  {
    _type: 'knowledgeBase',
    _id: 'kb-mppt-configuration',
    title: 'Understanding MPPT Tracker Configuration',
    slug: { _type: 'slug', current: 'mppt-tracker-configuration' },
    category: 'technical',
    summary:
      'Technical guide to configuring MPPT trackers for optimal solar panel performance across different roof orientations.',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'What is MPPT?' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'MPPT (Maximum Power Point Tracking) is a technology that continuously optimizes the voltage and current to extract maximum power from solar panels under varying conditions (temperature, shading, angle).',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'When Do You Need Multiple MPPTs?' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Different roof orientations (e.g., East and West facing) • Panels at different tilt angles • Partial shading on some panels • Mix of panel types or ages',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Configuration Best Practices' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Group panels with similar conditions on the same MPPT. For the Sigen Energy Controller with 4 MPPTs, you could configure: MPPT1: South-facing panels (optimal) MPPT2: East-facing panels MPPT3: West-facing panels MPPT4: Reserve or panels with partial shade',
          },
        ],
      },
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'prod-sigen-controller-8kw-sp' },
      { _type: 'reference', _ref: 'prod-foxess-kh-8kw' },
    ],
    tags: ['mppt', 'technical', 'solar-panels', 'configuration'],
    priority: 8,
    isPublished: true,
  },
  {
    _type: 'knowledgeBase',
    _id: 'kb-battery-safety',
    title: 'Battery Safety Features and Protection Systems',
    slug: { _type: 'slug', current: 'battery-safety-features' },
    category: 'product-info',
    summary:
      'Comprehensive overview of safety features in modern LFP battery systems, including thermal management and fire protection.',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Why LFP Batteries Are Safer' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'LFP (Lithium Iron Phosphate) batteries are chemically stable and do not experience thermal runaway like other lithium batteries. They can withstand high temperatures (up to 170°C) before any thermal events occur.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '5-Layer Safety Protection' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Modern systems like Sigen Battery include: 1. Cell-level BMS monitoring 2. Battery pack temperature sensors 3. Active fire protection module (triggers above 170°C) 4. IP66 weatherproof enclosure 5. Integrated fuse and circuit protection',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Auto-Heating for Winter Operation' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Systems include automatic heating to maintain optimal operating temperature in cold weather, ensuring reliable performance and protecting battery longevity.',
          },
        ],
      },
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'prod-sigen-battery-8kw' },
      { _type: 'reference', _ref: 'prod-ecoflow-powerocean-single' },
    ],
    tags: ['battery-safety', 'lfp', 'fire-protection', 'thermal-management'],
    priority: 9,
    isPublished: true,
  },
]

// Main population function
async function populateKnowledgeBase() {
  try {
    console.log('🚀 Starting knowledge base population...\n')

    // Create categories first
    console.log('📁 Creating product categories...')
    for (const category of categories) {
      await client.createOrReplace(category)
      console.log(`  ✓ ${category.name}`)
    }

    // Create products
    console.log('\n📦 Creating products...')
    for (const product of products) {
      await client.createOrReplace(product)
      console.log(`  ✓ ${product.name}`)
    }

    // Create FAQs
    console.log('\n❓ Creating FAQs...')
    for (const faq of faqs) {
      await client.createOrReplace(faq)
      console.log(`  ✓ ${faq.question}`)
    }

    // Create knowledge base articles
    console.log('\n📚 Creating knowledge base articles...')
    for (const article of knowledgeBaseArticles) {
      await client.createOrReplace(article)
      console.log(`  ✓ ${article.title}`)
    }

    console.log('\n✅ Knowledge base population completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - ${categories.length} categories created`)
    console.log(`   - ${products.length} products created`)
    console.log(`   - ${faqs.length} FAQs created`)
    console.log(`   - ${knowledgeBaseArticles.length} knowledge base articles created`)
  } catch (error) {
    console.error('❌ Error populating knowledge base:', error)
    process.exit(1)
  }
}

// Run the population
populateKnowledgeBase()
