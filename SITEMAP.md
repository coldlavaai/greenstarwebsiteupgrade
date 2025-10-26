# GreenStar Solar - Complete Website Content Map & Sitemap

**Created:** 2025-10-26
**Purpose:** Comprehensive mapping of all content, components, and pages for Sanity CMS integration
**Client:** GreenStar Solar

---

## 📋 Table of Contents
1. [Pages Overview](#pages-overview)
2. [Components & Sections](#components--sections)
3. [Content Types & Fields](#content-types--fields)
4. [Existing Sanity Schemas](#existing-sanity-schemas)
5. [Required CMS Features](#required-cms-features)

---

## 🌐 Pages Overview

### 1. **Homepage** (`app/page.tsx`)
- **Route:** `/`
- **Components Used:**
  - Navigation
  - Hero
  - About
  - Systems
  - Process
  - Gallery
  - Testimonials
  - Contact
  - Footer
- **Data Sources:** Fetches from Sanity CMS (already configured)

### 2. **Solar Panels - Home** (`app/solar-panels-home/page.tsx`)
- **Route:** `/solar-panels-home`
- **Purpose:** Residential solar panel information
- **Key Sections:**
  - Hero with heading + multi-paragraph description
  - Premium Panels Showcase (Aiko Neostar 3S)
  - Complete System Section (brand partners)
  - CTA Section
- **Data Sources:** Currently client-side fetch for Navigation/Footer

### 3. **Solar Panels - Business** (`app/solar-panels-business/page.tsx`)
- **Route:** `/solar-panels-business`
- **Purpose:** Commercial solar panel information
- **Key Sections:**
  - Hero with heading + multi-paragraph description
  - Benefits Section (6 benefit cards)
  - Process Section (4 process steps)
  - FAQ Section (4 questions)
  - CTA Section
- **Data Sources:** Currently client-side fetch for Navigation/Footer

### 4. **Battery Storage - Home** (`app/battery-storage-home/page.tsx`)
- **Route:** `/battery-storage-home`
- **Purpose:** Residential battery storage
- **Key Sections:**
  - Hero with heading + 3-paragraph description
  - Benefits Section (6 benefit cards)
  - Process Section (4 process steps)
  - FAQ Section (4 questions)
  - CTA Section
- **Data Sources:** Currently client-side fetch for Navigation/Footer

### 5. **Battery Storage - Business** (`app/battery-storage-business/page.tsx`)
- **Route:** `/battery-storage-business`
- **Purpose:** Commercial battery storage
- **Key Sections:**
  - Hero with heading + description
  - Benefits Section (6 benefit cards)
  - Process Section (4 process steps)
  - FAQ Section (4 questions)
  - CTA Section
- **Data Sources:** Currently client-side fetch for Navigation/Footer

### 6. **EV Charging** (`app/ev-charging/page.tsx`)
- **Route:** `/ev-charging`
- **Purpose:** Electric vehicle charging solutions
- **Key Sections:**
  - Hero with animated plug icon
  - Premium Panels Showcase
  - Complete System Section
  - CTA Section
- **Data Sources:** Currently client-side fetch for Navigation/Footer

### 7. **Case Studies** (`app/case-studies/page.tsx`)
- **Route:** `/case-studies`
- **Purpose:** Project showcase/portfolio

### 8. **DBR Analytics** (`app/dbr-analytics/page.tsx`)
- **Route:** `/dbr-analytics`
- **Purpose:** Internal dashboard

### 9. **Sanity Studio** (`app/studio/[[...index]]/page.tsx`)
- **Route:** `/studio`
- **Purpose:** CMS admin interface

---

## 🧩 Components & Sections

### **Navigation** (`components/Navigation.tsx`)
**Editable Content:**
- Logo/Brand title
- Navigation menu items (label, href, order)
- Dropdown submenus ("Our Work", "Systems")
- CTA button (text, href)
- Mobile menu

**Current Sanity Schema:** `navigationSection.ts`

**Required Fields:**
```
- title: string
- logo: image
- navItems: array of:
  - label: string
  - href: string
  - order: number
  - submenu: array (optional)
- ctaButton:
  - text: string
  - href: string
```

---

### **Hero** (`components/Hero.tsx`)
**Editable Content:**
- Main heading
- Subheading
- Primary CTA button (text + link)
- Secondary CTA button (text + link)
- Background image/video
- Stats display (3-4 stat blocks with value + label)

**Current Sanity Schema:** `heroSection.ts`

**Required Fields:**
```
- heading: string (rich text)
- subheading: text
- ctaText: string
- ctaLink: string
- secondaryCtaText: string
- secondaryCtaLink: string
- backgroundImage: image
- stats: array of:
  - value: string
  - label: string
  - icon: string
```

---

### **About** (`components/About.tsx`)
**Editable Content:**
- Section heading
- Content paragraphs (rich text)
- Stats/metrics (3-4 stat blocks)

**Current Sanity Schema:** `aboutSection.ts`

**Required Fields:**
```
- heading: string
- content: rich text / portable text
- stats: array of:
  - value: string
  - label: string
  - icon: string
```

---

### **Systems** (`components/Systems.tsx`)
**Editable Content:**
- Section heading
- Section description
- System cards (each with):
  - Title
  - Description
  - Features list
  - Icon
  - Image
  - Link/CTA

**Current Sanity Schema:** `systemsSection.ts`, `service.ts`

**Required Fields:**
```
- heading: string
- description: text
- systems: array reference to services
  Each service:
  - title: string
  - description: text
  - features: array of strings
  - icon: string
  - image: image
  - category: string
  - link: string
```

---

### **Process** (`components/Process.ts`)
**Editable Content:**
- Section heading
- Section description
- Process steps (each with):
  - Step number
  - Title
  - Description
  - Icon

**Current Sanity Schema:** `processSection.ts`, `processStep.ts`

**Required Fields:**
```
- heading: string
- description: text
- steps: array reference to processStep
  Each step:
  - stepNumber: number
  - title: string
  - description: text
  - icon: string
```

---

### **Gallery** (`components/Gallery.tsx`)
**Editable Content:**
- Section heading
- Gallery items (flip cards with):
  - Front: Image, "Click for details" text
  - Back:
    - Title
    - Location
    - Capacity
    - Date
    - System details (panels, battery, inverter, performance, savings)

**Current Sanity Schema:** `gallerySection.ts`, `galleryItem.ts`

**Required Fields:**
```
- heading: string
- items: array reference to galleryItem
  Each item:
  - title: string
  - image: image
  - location: string
  - capacity: string
  - date: date
  - systemDetails: object
    - panels: string
    - battery: string
    - inverter: string
    - performance: string
    - savings: string
  - category: string
```

---

### **Testimonials** (`components/Testimonials.tsx`)
**Editable Content:**
- Section heading
- Testimonial cards (each with):
  - Customer name
  - Role/title
  - Company
  - Content/quote
  - Rating (stars)
  - Image/avatar

**Current Sanity Schema:** `testimonialsSection.ts`, `testimonial.ts`

**Required Fields:**
```
- heading: string
- testimonials: array reference to testimonial
  Each testimonial:
  - name: string
  - role: string
  - company: string
  - content: text
  - rating: number (1-5)
  - image: image
```

---

### **Contact** (`components/Contact.tsx`)
**Editable Content:**
- Section heading
- Section subheading
- Contact details:
  - Email
  - Phone
  - Address
- Form fields (configurable)
- Submit button text

**Current Sanity Schema:** `contactSection.ts`

**Required Fields:**
```
- heading: string
- subheading: text
- email: string
- phone: string
- address: text
- formFields: array (optional customization)
- submitButtonText: string
```

---

### **Footer** (`components/Footer.tsx`)
**Editable Content:**
- Company description
- Copyright text
- Social media links (array)
- Footer navigation links
- Logo

**Current Sanity Schema:** `footerSection.ts`

**Required Fields:**
```
- title: string
- companyDescription: text
- copyright: string
- socialLinks: array of:
  - platform: string
  - url: string
  - icon: string
- footerLinks: array (optional)
- logo: image
```

---

## 📝 Content Types & Fields

### **System Pages** (Solar Panels Home/Business, Battery Storage Home/Business, EV Charging)

Each system page needs:

**Hero Section:**
- Mini header badge (icon + text)
- Main heading (split into 2 lines: white + gradient)
- Multi-paragraph description (3 paragraphs with spacing)
- CTA button(s)

**Benefits Section:**
- Section heading
- Section description
- 6 benefit cards:
  - Icon
  - Title
  - Description

**Process Section:**
- Section heading
- Section description
- 4 process steps:
  - Number (01-04)
  - Title
  - Description

**FAQ Section:**
- Section heading
- 4 FAQ items:
  - Question
  - Answer

**CTA Section:**
- Heading
- Description
- Button text + link

---

## 🗂️ Existing Sanity Schemas

### Core Website Sections
1. ✅ **navigationSection.ts** - Main navigation
2. ✅ **heroSection.ts** - Homepage hero
3. ✅ **aboutSection.ts** - About section
4. ✅ **systemsSection.ts** - Systems overview
5. ✅ **processSection.ts** - Process section
6. ✅ **gallerySection.ts** - Gallery/portfolio
7. ✅ **testimonialsSection.ts** - Testimonials
8. ✅ **contactSection.ts** - Contact section
9. ✅ **footerSection.ts** - Footer

### Content Types
10. ✅ **service.ts** - Individual system/service
11. ✅ **processStep.ts** - Process steps
12. ✅ **galleryItem.ts** - Gallery items
13. ✅ **testimonial.ts** - Testimonials

### Settings & Config
14. ✅ **siteSettings.ts** - Global site settings
15. ✅ **brandTheme.ts** - Brand colors/fonts
16. ✅ **companyInfo.ts** - Company details
17. ✅ **emailSettings.ts** - Email configuration

### Additional Features
18. ✅ **formSubmission.ts** - Form submissions
19. ✅ **dbrLead.ts** - DBR leads
20. ✅ **faq.ts** - FAQ items
21. ✅ **knowledgeBase.ts** - Knowledge base
22. ✅ **product.ts** - Products
23. ✅ **productCategory.ts** - Product categories
24. ✅ **review.ts** - Reviews

---

## 🚀 Required CMS Features

### Must-Have Features

1. **Visual Page Builder**
   - Drag and drop section ordering
   - Live preview
   - Mobile/desktop preview toggle

2. **Rich Text Editor**
   - WYSIWYG editing
   - Font family selection
   - Font size controls
   - Color picker
   - Bold, italic, underline
   - Lists (bullet, numbered)
   - Links
   - Headings (H1-H6)

3. **Image Management**
   - Drag and drop upload
   - Image cropping/resizing
   - Alt text
   - Image optimization
   - Gallery/media library

4. **Component Customization**
   - Color pickers for backgrounds, text
   - Spacing controls (padding, margin)
   - Animation toggle
   - Visibility controls

5. **Navigation Builder**
   - Drag and drop menu items
   - Nested submenu support
   - Icon selection
   - URL management

6. **Theme Controls**
   - Primary/secondary colors
   - Font family selection
   - Button styles
   - Border radius

7. **SEO Controls**
   - Meta titles
   - Meta descriptions
   - Open Graph images
   - Schema markup

### Nice-to-Have Features

1. **Conditional Display**
   - Show/hide sections based on conditions
   - A/B testing support

2. **Multi-language Support**
   - Translation management
   - Language switcher

3. **Scheduled Publishing**
   - Schedule content updates
   - Draft/publish workflow

4. **Analytics Integration**
   - Track content performance
   - View popular pages

5. **User Roles & Permissions**
   - Admin vs Editor roles
   - Section-level permissions

---

## 📊 Missing Schemas (Need to Create)

Based on current system pages, we need NEW schemas for:

1. **System Page** (generic template for all 5 system pages)
   - Page slug
   - Mini header (icon + text)
   - Main heading (line 1 + line 2)
   - Hero description (rich text with multiple paragraphs)
   - Benefits section (reusable)
   - Process section (reusable)
   - FAQ section (reusable)
   - CTA section (reusable)

2. **Benefit Card**
   - Icon
   - Title
   - Description

3. **Process Step Card**
   - Number
   - Title
   - Description

4. **FAQ Item** (already exists: `faq.ts`)

5. **CTA Section**
   - Heading
   - Description
   - Button text
   - Button link
   - Background style/color

---

## 🎨 Sanity Studio Customization Plan

### Studio UI Enhancements

1. **Custom Desk Structure**
   - Group by: Website Sections, Content, Settings, Analytics
   - Custom icons for each section
   - Collapsible groups

2. **Custom Input Components**
   - Color picker with brand palette
   - Icon selector
   - Advanced image editor
   - Section preview

3. **Live Preview**
   - Iframe preview of changes
   - Device size toggle
   - Real-time updates

4. **Custom Workflows**
   - Publishing workflow
   - Review/approval process

---

## 📸 Content Inventory

### Images
- Hero backgrounds
- Service/system images
- Gallery project images
- Testimonial avatars
- Brand logos
- Icons (Lucide icons currently hardcoded)

### Text Content
- Homepage: ~2000 words
- System pages (5 pages): ~500 words each
- FAQs: ~40 items
- Testimonials: TBD
- Gallery items: TBD

### Interactive Elements
- Navigation dropdowns
- Flip cards (gallery)
- Accordion FAQs (potential)
- Modal forms
- Animated stats

---

## 🔧 Next Steps

1. ✅ Complete sitemap (this document)
2. ⏳ Create missing Sanity schemas for system pages
3. ⏳ Design custom Sanity Studio UI
4. ⏳ Implement visual page builder
5. ⏳ Add rich text editor with font controls
6. ⏳ Create drag-and-drop section ordering
7. ⏳ Implement live preview
8. ⏳ Test and refine editing experience
9. ⏳ Create client documentation/training

---

**End of Sitemap Document**
