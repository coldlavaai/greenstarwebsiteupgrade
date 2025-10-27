# Complete Content Audit - All Pages
**Date:** 2025-10-27
**Purpose:** Comprehensive inventory of ALL hardcoded content requiring CMS migration

---

## Summary Statistics
- **Total Pages:** 7 (Homepage + 6 service pages)
- **Homepage Components:** 9 (Navigation, Hero, About, Systems, Process, Gallery, Testimonials, Contact, Footer)
- **Total Hardcoded Elements:** ~500+ text strings, images, arrays
- **CMS Integration Status:** Components have CMS props with fallback logic ✓

---

## HOMEPAGE (/) - app/page.tsx

### Navigation Component (components/Navigation.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Logo URL** (line 84): `https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png`
- **Submenu Structure** (lines 189-213):
  ```typescript
  Systems submenu:
  - Solar Panels for Home → /solar-panels-home
  - Battery Storage for Home → /battery-storage-home
  - Solar Panels for Business → /solar-panels-business
  - Battery Storage for Business → /battery-storage-business
  - EV Charging → /ev-charging

  Company submenu:
  - About → #about
  - Our Process → #process
  - Gallery → #gallery
  - Contact → #contact
  ```
- **CTA Button Fallback** (line 215): `{ text: 'Get Free Quote', href: '/#contact' }`

---

### Hero Component (components/Hero.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Badge Text** (line 85): "Premium Solar Solutions"
- **Title Second Line** (line 104): "with Solar Energy"
- **Features Array** (lines 49-53):
  ```typescript
  [
    { icon: Sun, text: 'Solar Panels', color: 'from-orange-400 to-yellow-500' },
    { icon: BatteryFull, text: 'Battery Storage', color: 'from-[#8cc63f] to-[#7ab52f]' },
    { icon: Plug, text: 'EV Charging', color: 'from-green-400 to-emerald-500' }
  ]
  ```
- **Stats Fallback** (lines 56-59):
  ```typescript
  [
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Customers' }
  ]
  ```
- **Background Image Fallback** (line 74): `/images/hero-house.png`

---

### About Component (components/About.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Badge Text** (line 87): "About Greenstar Solar"
- **Second Paragraph** (lines 112-118): "We take a highly personalised approach to every project..."
- **Bullet Points** (lines 127-132):
  ```typescript
  [
    'Certified and experienced installers',
    'Premium quality solar panels and equipment',
    'Comprehensive warranty and support',
    'Tailored solutions for your energy goals'
  ]
  ```
- **Stats Fallback** (lines 39-44):
  ```typescript
  [
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '500+', label: 'Happy Customers', icon: Users },
    { value: '25', label: 'Year Warranty', icon: Shield }
  ]
  ```

---

### Systems Component (components/Systems.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Section Header** (lines 127-138):
  - Badge: "Our Solutions"
  - Title: "Tailored Solar & Storage Systems"
  - Description: "Whether you're a homeowner looking to reduce bills..."

- **Image URLs** (lines 38-43):
  ```typescript
  {
    'Solar Panels for Home': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Battery Storage for Home': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    'Solar Panels for Business': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    'Battery Storage for Business': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
    'EV Charging': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg'
  }
  ```

- **Service Cards Fallback** (lines 75-108): 4 complete service definitions with descriptions and features

- **Bottom CTA** (lines 155-171): "Schedule Free Consultation"

---

### Process Component (components/Process.tsx)
**CMS Support:** No CMS props - FULLY HARDCODED ❌

**Hardcoded Content:**
- **Section Header** (lines 108-119):
  - Badge: "Our Process"
  - Title: "We're With You Every Step"
  - Description: "A highly personalised approach..."

- **5 Process Steps** (lines 43-89): Complete step objects with:
  - Number, icon, title, description
  - `backContent` (flip card back content)
  - `frontReview` & `backReview` (customer testimonials)
  - Example:
    ```typescript
    {
      number: '01',
      icon: Search,
      title: 'Personal Consultation',
      description: 'We begin with a face to face consultation...',
      backContent: 'Our surveyors carry out a full structural...',
      frontReview: { text: '"They explained everything..."', author: 'Martyn Brayshaw' },
      backReview: { text: '"Jon explained..."', author: 'Rikesh' }
    }
    ```

- **Bottom CTA** (lines 293-310): "Ready to start your solar journey?" + "Book Your Free Survey" button

---

### Gallery Component (components/Gallery.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Section Header** (lines 161-172):
  - Badge: "Our Projects"
  - Title: "Recent Installations"
  - Description: "Explore our portfolio..."

- **Image URLs** (lines 38-45): 6 project image URLs

- **6 Complete Project Objects** (lines 70-142): Each with:
  - image, title, location, capacity, date
  - systemDetails, panelCount, battery/inverter
  - performance, savings

- **Bottom CTA** (lines 303-317): "Start Your Project" button

---

### Testimonials Component (components/Testimonials.tsx)
**CMS Support:** No CMS props - FULLY HARDCODED ❌

**Hardcoded Content:**
- **Section Header** (lines 315-326):
  - Badge: "Testimonials"
  - Title: "What Our Customers Say"
  - Description: "Real reviews from real customers..."

- **Trust Badges** (lines 336, 345):
  - "5.0 on Google"
  - "4.7 on Trustpilot"

- **30 Complete Reviews** (lines 41-252): Each with name, location, rating, text, platform

- **Stats Row** (lines 476-495):
  ```typescript
  [
    { value: '48+', label: 'Verified Reviews' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '100%', label: 'Would Recommend' }
  ]
  ```

---

### Contact Component (components/Contact.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Section Header** (lines 112-130):
  - Badge: "Get In Touch"
  - Title: "Book Your Free Survey"
  - Description: "Ready to make the switch to solar?..."

- **Left Column Content** (lines 142-147):
  - Title: "Let's Start Your Solar Journey"
  - Description paragraph

- **Contact Info Fallbacks** (lines 75-94):
  ```typescript
  [
    { icon: Phone, title: 'Phone', content: '0800 123 4567', link: 'tel:...' },
    { icon: Mail, title: 'Email', content: 'info@greenstarsolar.co.uk', link: 'mailto:...' },
    { icon: MapPin, title: 'Location', content: 'United Kingdom', link: '#' }
  ]
  ```

- **Benefits List** (lines 183-201):
  ```typescript
  [
    'Free site assessment & consultation',
    'Transparent pricing with no hidden costs',
    '25 year warranty on all installations',
    'MCS certified installers',
    'Expert advice & ongoing support'
  ]
  ```

---

### Footer Component (components/Footer.tsx)
**CMS Support:** Already accepts `data` prop ✓

**Hardcoded Content:**
- **Logo URL** (line 84): `https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png`

- **Company Description Fallback** (line 93): "Leading the way in renewable energy solutions..."

- **Contact Info** (lines 98-109):
  ```typescript
  Phone: 023 8212 3763
  Email: info@greenstarsolar.co.uk
  Location: United Kingdom
  ```

- **Social Links Fallback** (lines 62-64):
  ```typescript
  [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]
  ```

- **Footer Link Groups** (lines 28-47):
  ```typescript
  company: ['About Us', 'Our Process', 'Testimonials', 'Contact']
  systems: [all 5 system pages]
  resources: ['FAQ', 'Blog', 'Case Studies', 'Warranty Info']
  ```

- **Legal Links** (lines 210-218): Privacy Policy, Terms of Service, Cookie Policy

- **Copyright Fallback** (line 207): `© ${year} Greenstar Solar. All rights reserved.`

---

## SERVICE PAGES

### /solar-panels-home (app/solar-panels-home/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Hero Section** (lines 32-111):
  - Badge: "Residential Solar Solutions"
  - Title: "Solar Panels for Your Home"
  - Description (2 paragraphs)
  - CTAs: "Get Free Quote", "← Back to Systems"

- **Premium Panels Showcase** (lines 114-223):
  - Badge: "Next Generation Technology"
  - Title: "Aiko Neostar 3S N-Type ABC"
  - Description (2 paragraphs about 24.3% efficiency, warranties)
  - 3 Spec Cards: 24.3% Efficiency, 25/30 Year Warranties, All Black Finish

- **Complete System Section** (lines 226-331):
  - Badge: "Complete Energy Solutions"
  - Title: "Power Your Independence"
  - Description paragraph
  - 4 Brand Cards: Hanchu, Fox ESS, EcoFlow, Sigenergy
  - 3 Key Features: Generate, Store, Manage

- **CTA Section** (lines 334-363):
  - Title: "Ready to Go Solar?"
  - Description + "Book Free Consultation" button

---

### /battery-storage-home (app/battery-storage-home/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Hero Section** (lines 107-174):
  - Badge: "Residential Battery Solutions"
  - Title: "Battery Storage for Your Home"
  - Description (3 paragraphs about storage benefits)
  - CTA: "Get Free Quote"

- **6 Benefits** (lines 27-58):
  ```typescript
  [
    { icon: Battery, title: 'Store Excess Energy', description: '...' },
    { icon: TrendingDown, title: 'Maximize Savings', description: '...' },
    { icon: Moon, title: 'Power at Night', description: '...' },
    { icon: Shield, title: 'Backup Power', description: '...' },
    { icon: Power, title: 'Energy Independence', description: '...' },
    { icon: Zap, title: 'Smart Management', description: '...' }
  ]
  ```

- **4 Process Steps** (lines 60-81):
  ```typescript
  01: Energy Assessment
  02: System Design
  03: Expert Installation
  04: System Handover
  ```

- **4 FAQs** (lines 83-100): Questions + answers about costs, lifespan, retrofitting, backup

- **CTA Section** (lines 306-335): "Ready to Store Your Energy?"

---

### /solar-panels-business (app/solar-panels-business/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Hero Section** (lines 107-171):
  - Badge: "Commercial Solar Solutions"
  - Title: "Solar Panels for Your Business"
  - Description (2 paragraphs)
  - CTA: "Get Free Assessment"

- **6 Benefits** (lines 27-58):
  - Reduce Operating Costs, Sustainability Goals, Enhanced Brand Value, etc.

- **4 Process Steps** (lines 60-81):
  - Business Consultation, Custom Proposal, Professional Installation, Monitoring

- **4 FAQs** (lines 83-100):
  - ROI, roof space, disruption, financing options

- **CTA Section** (lines 303-332): "Transform Your Business Energy"

---

### /battery-storage-business (app/battery-storage-business/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Hero Section** (lines 107-166):
  - Badge: "Commercial Battery Solutions"
  - Title: "Battery Storage for Your Business"
  - Description paragraph
  - CTA: "Get Free Assessment"

- **6 Benefits** (lines 27-58):
  - Peak Shaving, Cost Optimization, Time-of-Use Management, Business Continuity, Grid Services Revenue, Scalable Capacity

- **4 Process Steps** (lines 60-81):
  - Energy Analysis, Storage Strategy, Professional Installation, Intelligent Management

- **4 FAQs** (lines 83-100):
  - ROI, capacity needs, working without solar, lifespan

- **CTA Section** (lines 298-327): "Optimize Your Energy Strategy"

---

### /ev-charging (app/ev-charging/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Hero Section** (lines 32-111):
  - Badge: "Smart EV Charging Solutions"
  - Title: "EV Charging Powered by Solar"
  - Description paragraph
  - CTAs: "Get Free Quote", "← Back to Systems"

- **Zappi Charger Showcase** (lines 114-223):
  - Badge: "Intelligent Solar Charging"
  - Title: "Zappi Smart EV Charger"
  - Description (2 paragraphs)
  - 3 Spec Cards: 7.4kW Fast Charging, 100% Solar Compatible, 3 Year Warranty

- **6 Benefits** (lines 255-286):
  - Massive Savings, Solar Priority, Battery Integration, Fast & Flexible, Smart Home Ready, Zero Carbon

- **How It Works - 4 Steps** (lines 332-375):
  - Solar Generation, Smart Diversion, Automatic Charging, Battery Backup

- **Final CTA** (lines 381-412): "Ready to charge your EV with free solar energy?"

---

### /case-studies (app/case-studies/page.tsx)
**Type:** Fully hardcoded page - NO CMS integration ❌

**Hardcoded Content:**
- **Page Header** (lines 119-145):
  - Badge: "Success Stories"
  - Title: "Real Results from Real Customers"
  - Description: "Discover how homeowners and businesses..."

- **3 Complete Case Studies** (lines 31-106):
  1. **The Johnson Family** (Southampton):
     - System: 8.4kW Solar + 13.5kWh Battery
     - Stats: 7,800 kWh annual, 85% bill reduction
     - Full challenge/solution/results
     - Customer testimonial

  2. **Green Manufacturing Ltd** (Portsmouth):
     - System: 95kW Commercial Solar Array
     - Stats: 89,000 kWh annual, 72% bill reduction
     - Full challenge/solution/results
     - Customer testimonial

  3. **The Smith Residence** (Winchester):
     - System: 6.8kW Solar + 9.5kWh Battery + EV Charger
     - Stats: 6,200 kWh annual, 78% bill reduction
     - Full challenge/solution/results
     - Customer testimonial

- **Bottom CTA** (lines 155-178): "Ready to start your own success story?"

---

## Migration Priority

### HIGH PRIORITY (Components already have CMS support):
1. ✅ Navigation - has `data` prop, needs schema + population
2. ✅ Hero - has `data` prop, needs schema + population
3. ✅ About - has `data` prop, needs schema + population
4. ✅ Systems - has `data` prop, needs schema + population
5. ✅ Gallery - has `data` prop, needs schema + population
6. ✅ Contact - has `data` prop, needs schema + population
7. ✅ Footer - has `data` prop, needs schema + population

### MEDIUM PRIORITY (Need CMS integration added):
8. ❌ Process - needs CMS props added + schema + population
9. ❌ Testimonials - needs CMS props added + schema + population

### LOW PRIORITY (Service pages - could be added later):
10. ❌ /solar-panels-home
11. ❌ /battery-storage-home
12. ❌ /solar-panels-business
13. ❌ /battery-storage-business
14. ❌ /ev-charging
15. ❌ /case-studies

---

## Next Steps

1. ✅ Complete audit (DONE)
2. Create Sanity schemas for global settings (Navigation, Footer)
3. Create Sanity schemas for homepage sections (Hero, About, Systems, Process, Gallery, Testimonials, Contact)
4. Create population script to upload ALL current hardcoded content to Sanity
5. Run population script
6. Test staging site to verify exact match with original
7. (Optional) Add CMS integration to service pages
