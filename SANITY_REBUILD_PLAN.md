# GreenStar Solar - Sanity Studio Rebuild Architecture

**Created:** 2025-10-26
**Purpose:** Complete architecture plan for rebuilding Sanity CMS from scratch with advanced editing features
**Goal:** Create a Squarespace-level editing experience with drag-and-drop, visual editing, and comprehensive content management

---

## 📋 Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [What to Keep vs Rebuild](#what-to-keep-vs-rebuild)
3. [New Schema Architecture](#new-schema-architecture)
4. [Studio UI/UX Design](#studio-uiux-design)
5. [Advanced Features Implementation](#advanced-features-implementation)
6. [Migration Strategy](#migration-strategy)
7. [Implementation Roadmap](#implementation-roadmap)

---

## 🔍 Current State Analysis

### Existing Sanity Setup

**Sanity Studio Location:** `/studio` route
**Current Version:** Sanity v3 with Structure Tool, Vision Tool, Presentation Tool
**Project ID:** kpz3fwyf (from environment)
**Dataset:** production

### Working Schemas (24 total)

#### ✅ Keep & Enhance - Core Sections (9)
1. `navigationSection` - Navigation bar (singleton)
2. `heroSection` - Homepage hero (singleton)
3. `aboutSection` - About content (singleton)
4. `systemsSection` - Systems grid (singleton)
5. `processSection` - Process steps (singleton)
6. `testimonialsSection` - Testimonials (singleton)
7. `gallerySection` - Project gallery (singleton)
8. `contactSection` - Contact form (singleton)
9. `footerSection` - Footer (singleton)

#### ✅ Keep - Content Types (4)
10. `service` - Individual systems/services
11. `testimonial` - Customer testimonials
12. `galleryItem` - Gallery projects
13. `processStep` - Process steps

#### ✅ Keep - Settings (3)
14. `siteSettings` - Global site config
15. `brandTheme` - Brand colors/fonts
16. `emailSettings` - Email notifications

#### ✅ Keep - Business Data (2)
17. `formSubmission` - Contact form leads
18. `dbrLead` - Database recovery leads (with analytics dashboard)

#### 🤔 Keep for Future - Knowledge Base (6)
19. `faq` - FAQ items
20. `product` - Products
21. `productCategory` - Product categories
22. `knowledgeBase` - Knowledge articles
23. `review` - Reviews
24. `companyInfo` - Company details

### Pages Currently NOT in CMS

**5 System Pages** (hardcoded content):
1. `/solar-panels-home` - Residential solar
2. `/solar-panels-business` - Commercial solar
3. `/battery-storage-home` - Residential batteries
4. `/battery-storage-business` - Commercial batteries
5. `/ev-charging` - EV charging solutions

**Other Pages:**
6. `/case-studies` - Project portfolio
7. `/dbr-analytics` - Internal dashboard (keep hardcoded)

---

## 🎯 What to Keep vs Rebuild

### ✅ KEEP (Working Well)

**Infrastructure:**
- Sanity v3 configuration
- Project ID and dataset
- Client setup in `lib/sanity.ts`
- DBR Dashboard structure (excellent organization)
- Form submission tracking
- Presentation Tool integration

**Schemas to Keep As-Is:**
- `formSubmission` - Working perfectly
- `dbrLead` - Complex, well-structured
- `emailSettings` - Good structure
- `siteSettings` - Basic but functional
- `companyInfo` - Simple reference data

**UI Structure Elements:**
- Singleton pattern for sections
- Grouped navigation (Settings, Page Sections, etc.)
- Document preview customization
- Ordering by position/order fields

### 🔄 ENHANCE (Keep but Improve)

**All Section Schemas Need:**
1. Rich text editor with formatting controls
2. Font family selection
3. Font size controls
4. Color picker integration
5. Spacing controls (padding/margin)
6. Animation toggles
7. Visibility controls

**Specific Schema Enhancements:**

**navigationSection:**
- Add submenu support (nested arrays)
- Icon picker for menu items
- Hover state colors
- Mobile menu customization

**heroSection:**
- Rich text instead of plain string
- Multiple background options (image/video/gradient)
- Animation speed controls
- Stats section with icons

**aboutSection:**
- Full portable text editor
- Image galleries within content
- Call-out boxes
- Column layout options

**systemsSection, processSection, testimonialsSection, gallerySection:**
- Drag-and-drop ordering
- Live preview
- Rich content editing

**contactSection:**
- Form builder (dynamic fields)
- Validation rules
- Success/error messages
- Email template editor

**footerSection:**
- Multi-column layout builder
- Social media icon selector
- Copyright auto-year

### 🆕 CREATE NEW (Missing Schemas)

**1. System Page Schema** (Priority 1)
```
Name: systemPage
Purpose: Template for all 5 system pages
Type: Document (multiple instances)
```

**2. Benefit Card Schema** (Priority 1)
```
Name: benefitCard
Purpose: Reusable benefit/feature cards
Type: Document
```

**3. FAQ Item Enhanced** (Priority 2)
```
Enhance existing faq.ts for system pages
Add: page assignment, ordering, categories
```

**4. CTA Section Schema** (Priority 1)
```
Name: ctaSection
Purpose: Reusable call-to-action blocks
Type: Object/Document
```

**5. Page Builder Blocks** (Priority 2)
```
Name: pageBlock
Purpose: Modular page sections
Type: Array of objects
```

**6. Media Library Schema** (Priority 3)
```
Name: mediaAsset
Purpose: Organized media management
Type: Document
```

---

## 🏗️ New Schema Architecture

### System Page Schema (Detailed)

```typescript
// sanity/schemas/systemPage.ts
export const systemPage = defineType({
  name: 'systemPage',
  title: 'System Pages',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'benefits', title: 'Benefits' },
    { name: 'process', title: 'Process' },
    { name: 'faq', title: 'FAQs' },
    { name: 'cta', title: 'Call to Action' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // Basic Info
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: '☀️ Solar Panels - Home', value: 'solar-panels-home' },
          { title: '🏢 Solar Panels - Business', value: 'solar-panels-business' },
          { title: '🔋 Battery Storage - Home', value: 'battery-storage-home' },
          { title: '🏭 Battery Storage - Business', value: 'battery-storage-business' },
          { title: '⚡ EV Charging', value: 'ev-charging' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    },

    // Hero Section
    {
      name: 'heroMiniBadge',
      title: 'Mini Header Badge',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              { title: '☀️ Sun', value: 'Sun' },
              { title: '🏠 Home', value: 'Home' },
              { title: '🏢 Building', value: 'Building2' },
              { title: '🔋 Battery', value: 'Battery' },
              { title: '⚡ Zap', value: 'Zap' },
            ],
          },
        },
        { name: 'text', title: 'Badge Text', type: 'string' },
      ],
      group: 'hero',
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'object',
      fields: [
        {
          name: 'line1',
          title: 'Line 1 (White Text)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'line2',
          title: 'Line 2 (Gradient Text)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      group: 'hero',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text with multiple paragraphs',
      group: 'hero',
    },
    {
      name: 'heroCta',
      title: 'Hero CTA Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
      ],
      group: 'hero',
    },

    // Benefits Section
    {
      name: 'benefitsHeading',
      title: 'Benefits Section Heading',
      type: 'string',
      group: 'benefits',
    },
    {
      name: 'benefitsSubheading',
      title: 'Benefits Section Subheading',
      type: 'text',
      group: 'benefits',
    },
    {
      name: 'benefits',
      title: 'Benefit Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '📉 TrendingDown', value: 'TrendingDown' },
                  { title: '🎯 Target', value: 'Target' },
                  { title: '🏆 Award', value: 'Award' },
                  { title: '🛡️ Shield', value: 'Shield' },
                  { title: '👥 Users', value: 'Users' },
                  { title: '⚡ Zap', value: 'Zap' },
                  { title: '🔋 Battery', value: 'Battery' },
                  { title: '🌙 Moon', value: 'Moon' },
                  { title: '⚙️ Power', value: 'Power' },
                  { title: '🍃 Leaf', value: 'Leaf' },
                ],
              },
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
      group: 'benefits',
    },

    // Process Section
    {
      name: 'processHeading',
      title: 'Process Section Heading',
      type: 'string',
      group: 'process',
    },
    {
      name: 'processSubheading',
      title: 'Process Section Subheading',
      type: 'text',
      group: 'process',
    },
    {
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Step Number (01-04)', type: 'string' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
      group: 'process',
    },

    // FAQ Section
    {
      name: 'faqHeading',
      title: 'FAQ Section Heading',
      type: 'string',
      group: 'faq',
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
      group: 'faq',
    },

    // CTA Section
    {
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      group: 'cta',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
      ],
      group: 'cta',
    },
    {
      name: 'ctaBackgroundColor',
      title: 'CTA Background Color',
      type: 'color',
      group: 'cta',
    },

    // SEO
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
    },

    // Settings
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
    },
    prepare({ title, pageType }) {
      return {
        title: title,
        subtitle: pageType?.replace('-', ' ').toUpperCase(),
      }
    },
  },
})
```

### Enhanced Brand Theme Schema

```typescript
// sanity/schemas/brandThemeEnhanced.ts
export const brandTheme = defineType({
  name: 'brandTheme',
  title: 'Brand & Theme',
  type: 'document',
  groups: [
    { name: 'colors', title: 'Colors', default: true },
    { name: 'typography', title: 'Typography' },
    { name: 'spacing', title: 'Spacing' },
    { name: 'effects', title: 'Effects & Animations' },
  ],
  fields: [
    // Colors
    {
      name: 'primaryColor',
      title: 'Primary Color (Green)',
      type: 'color',
      description: 'Main brand color - used for buttons, links, highlights',
      initialValue: { hex: '#8CC63F' },
      group: 'colors',
    },
    {
      name: 'primaryLight',
      title: 'Primary Light',
      type: 'color',
      description: 'Lighter variant of primary color',
      initialValue: { hex: '#a6d95e' },
      group: 'colors',
    },
    {
      name: 'primaryDark',
      title: 'Primary Dark',
      type: 'color',
      description: 'Darker variant of primary color',
      initialValue: { hex: '#6ba82e' },
      group: 'colors',
    },
    {
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      description: 'Secondary brand color for accents',
      group: 'colors',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      initialValue: { hex: '#0a0a0a' },
      group: 'colors',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      initialValue: { hex: '#ffffff' },
      group: 'colors',
    },
    {
      name: 'mutedTextColor',
      title: 'Muted Text Color',
      type: 'color',
      initialValue: { hex: '#999999' },
      group: 'colors',
    },

    // Typography
    {
      name: 'headingFont',
      title: 'Heading Font',
      type: 'string',
      options: {
        list: [
          { title: 'Geist Sans', value: 'var(--font-geist-sans)' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Inter', value: 'Inter' },
          { title: 'Poppins', value: 'Poppins' },
          { title: 'Raleway', value: 'Raleway' },
        ],
      },
      initialValue: 'var(--font-geist-sans)',
      group: 'typography',
    },
    {
      name: 'bodyFont',
      title: 'Body Font',
      type: 'string',
      options: {
        list: [
          { title: 'Geist Sans', value: 'var(--font-geist-sans)' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Inter', value: 'Inter' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Lato', value: 'Lato' },
        ],
      },
      initialValue: 'var(--font-geist-sans)',
      group: 'typography',
    },
    {
      name: 'fontSizes',
      title: 'Font Sizes',
      type: 'object',
      fields: [
        { name: 'xs', title: 'Extra Small', type: 'number', initialValue: 12 },
        { name: 'sm', title: 'Small', type: 'number', initialValue: 14 },
        { name: 'base', title: 'Base', type: 'number', initialValue: 16 },
        { name: 'lg', title: 'Large', type: 'number', initialValue: 18 },
        { name: 'xl', title: 'Extra Large', type: 'number', initialValue: 20 },
        { name: '2xl', title: '2XL', type: 'number', initialValue: 24 },
        { name: '3xl', title: '3XL', type: 'number', initialValue: 30 },
        { name: '4xl', title: '4XL', type: 'number', initialValue: 36 },
        { name: '5xl', title: '5XL', type: 'number', initialValue: 48 },
        { name: '6xl', title: '6XL', type: 'number', initialValue: 60 },
        { name: '7xl', title: '7XL', type: 'number', initialValue: 72 },
      ],
      group: 'typography',
    },

    // Spacing
    {
      name: 'spacing',
      title: 'Spacing Scale',
      type: 'object',
      fields: [
        { name: 'xs', title: 'Extra Small', type: 'number', initialValue: 4 },
        { name: 'sm', title: 'Small', type: 'number', initialValue: 8 },
        { name: 'md', title: 'Medium', type: 'number', initialValue: 16 },
        { name: 'lg', title: 'Large', type: 'number', initialValue: 24 },
        { name: 'xl', title: 'Extra Large', type: 'number', initialValue: 32 },
        { name: '2xl', title: '2XL', type: 'number', initialValue: 48 },
        { name: '3xl', title: '3XL', type: 'number', initialValue: 64 },
      ],
      group: 'spacing',
    },

    // Effects
    {
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'object',
      fields: [
        { name: 'sm', title: 'Small', type: 'number', initialValue: 4 },
        { name: 'md', title: 'Medium', type: 'number', initialValue: 8 },
        { name: 'lg', title: 'Large', type: 'number', initialValue: 16 },
        { name: 'xl', title: 'Extra Large', type: 'number', initialValue: 24 },
        { name: 'full', title: 'Full (Pills)', type: 'string', initialValue: '9999px' },
      ],
      group: 'effects',
    },
    {
      name: 'animations',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        {
          name: 'enableAnimations',
          title: 'Enable Page Animations',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'animationSpeed',
          title: 'Animation Speed (seconds)',
          type: 'number',
          initialValue: 0.6,
        },
        {
          name: 'animationDelay',
          title: 'Stagger Delay (seconds)',
          type: 'number',
          initialValue: 0.1,
        },
      ],
      group: 'effects',
    },
  ],
})
```

---

## 🎨 Studio UI/UX Design

### Custom Desk Structure

```typescript
// sanity/structure.ts
export const structure = (S: any) =>
  S.list()
    .title('🌟 GreenStar Solar CMS')
    .items([
      // Quick Actions
      S.listItem()
        .title('⚡ Quick Actions')
        .icon(() => '⚡')
        .child(
          S.list()
            .title('Quick Actions')
            .items([
              S.listItem()
                .title('➕ Add New System Page')
                .icon(() => '➕')
                .child(
                  S.document()
                    .schemaType('systemPage')
                    .documentId('draft.new-system-page')
                ),
              S.listItem()
                .title('📝 Edit Homepage')
                .icon(() => '📝')
                .child(
                  S.document()
                    .schemaType('heroSection')
                    .documentId('heroSection')
                ),
              S.listItem()
                .title('📊 View Analytics')
                .icon(() => '📊')
                .child(
                  S.component(() => (
                    <div style={{ padding: '2rem' }}>
                      <a href="/dbr-analytics" target="_blank">
                        Open DBR Analytics →
                      </a>
                    </div>
                  )).title('Analytics')
                ),
            ])
        ),

      S.divider(),

      // System Pages (NEW)
      S.listItem()
        .title('📄 System Pages')
        .icon(() => '📄')
        .child(
          S.documentTypeList('systemPage')
            .title('System Pages')
            .filter('_type == "systemPage"')
            .child((documentId: string) =>
              S.document()
                .documentId(documentId)
                .schemaType('systemPage')
                .views([
                  S.view.form(),
                  S.view
                    .component(() => <div>Live Preview (Coming Soon)</div>)
                    .title('Preview'),
                ])
            )
        ),

      S.divider(),

      // Homepage Sections
      S.listItem()
        .title('🏠 Homepage Sections')
        .icon(() => '🏠')
        .child(
          S.list()
            .title('Homepage Sections')
            .items([
              singletonItem(S, 'heroSection', '🦸 Hero Section'),
              singletonItem(S, 'aboutSection', 'ℹ️ About Section'),
              singletonItem(S, 'systemsSection', '⚡ Systems Section'),
              singletonItem(S, 'processSection', '🔄 Process Section'),
              singletonItem(S, 'testimonialsSection', '⭐ Testimonials'),
              singletonItem(S, 'gallerySection', '🖼️ Gallery Section'),
              singletonItem(S, 'contactSection', '📞 Contact Section'),
            ])
        ),

      S.divider(),

      // Global Elements
      S.listItem()
        .title('🌐 Global Elements')
        .icon(() => '🌐')
        .child(
          S.list()
            .title('Global Elements')
            .items([
              singletonItem(S, 'navigationSection', '🧭 Navigation'),
              singletonItem(S, 'footerSection', '👣 Footer'),
            ])
        ),

      S.divider(),

      // Content Library
      S.listItem()
        .title('📚 Content Library')
        .icon(() => '📚')
        .child(
          S.list()
            .title('Content Library')
            .items([
              S.listItem()
                .title('☀️ Systems & Services')
                .child(
                  S.documentTypeList('service')
                    .title('Systems & Services')
                    .defaultOrdering([{ field: 'position', direction: 'asc' }])
                ),
              S.listItem()
                .title('🖼️ Gallery Projects')
                .child(
                  S.documentTypeList('galleryItem')
                    .title('Gallery Projects')
                    .defaultOrdering([{ field: 'position', direction: 'asc' }])
                ),
              S.listItem()
                .title('⭐ Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonials')
                    .defaultOrdering([{ field: 'position', direction: 'asc' }])
                ),
              S.listItem()
                .title('📋 Process Steps')
                .child(
                  S.documentTypeList('processStep')
                    .title('Process Steps')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('❓ FAQs')
                .child(
                  S.documentTypeList('faq')
                    .title('FAQs')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // Lead Management
      S.listItem()
        .title('📬 Lead Management')
        .icon(() => '📬')
        .child(
          S.list()
            .title('Lead Management')
            .items([
              S.listItem()
                .title('📋 Contact Form Submissions')
                .child(
                  S.documentTypeList('formSubmission')
                    .title('Contact Form Leads')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('🔥 DBR Dashboard')
                .child(
                  S.list()
                    .title('DBR Leads')
                    .items([
                      // Keep existing DBR structure
                    ])
                ),
            ])
        ),

      S.divider(),

      // Settings
      S.listItem()
        .title('⚙️ Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Settings')
            .items([
              singletonItem(S, 'siteSettings', '🌐 Site Settings'),
              singletonItem(S, 'brandTheme', '🎨 Brand & Theme'),
              singletonItem(S, 'emailSettings', '📧 Email Settings'),
            ])
        ),
    ])
```

### Custom Input Components

**1. Rich Text Editor with Font Controls**

```typescript
// sanity/components/RichTextEditor.tsx
import { defineField } from 'sanity'

export const richTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' },
            { title: 'Underline', value: 'underline' },
            { title: 'Strike', value: 'strike-through' },
            { title: 'Code', value: 'code' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                { name: 'href', type: 'url', title: 'URL' },
                {
                  name: 'openInNewTab',
                  type: 'boolean',
                  title: 'Open in new tab',
                },
              ],
            },
            {
              name: 'color',
              type: 'object',
              title: 'Color',
              fields: [
                {
                  name: 'color',
                  type: 'color',
                  title: 'Text Color',
                },
              ],
            },
            {
              name: 'fontSize',
              type: 'object',
              title: 'Font Size',
              fields: [
                {
                  name: 'size',
                  type: 'string',
                  title: 'Size',
                  options: {
                    list: [
                      { title: 'Small', value: 'text-sm' },
                      { title: 'Base', value: 'text-base' },
                      { title: 'Large', value: 'text-lg' },
                      { title: 'XL', value: 'text-xl' },
                      { title: '2XL', value: 'text-2xl' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alt text' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
      },
    ],
  })
```

**2. Icon Picker Component**

```typescript
// sanity/components/IconPicker.tsx
import React from 'react'
import { FormField } from 'sanity'
import * as LucideIcons from 'lucide-react'

export const IconPicker = React.forwardRef((props: any, ref) => {
  const icons = [
    'Sun', 'Battery', 'Building2', 'Zap', 'Home', 'TrendingDown',
    'Target', 'Award', 'Shield', 'Users', 'Moon', 'Power', 'Leaf',
    'ArrowRight', 'Check', 'X', 'Phone', 'Mail', 'MapPin'
  ]

  return (
    <FormField
      {...props}
      ref={ref}
      renderDefault={(props) => (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
            {icons.map((iconName) => {
              const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as any
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => props.onChange(iconName)}
                  style={{
                    padding: '12px',
                    border: props.value === iconName ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: props.value === iconName ? '#eff6ff' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {Icon && <Icon size={24} />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    />
  )
})
```

**3. Drag-and-Drop Ordering Component**

```typescript
// sanity/components/DragDropOrdering.tsx
import { ArrayOfObjectsInput } from 'sanity'
import { DragHandleIcon } from '@sanity/icons'

export const DragDropArrayInput = (props: any) => {
  return (
    <div>
      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f3f4f6', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          <DragHandleIcon /> Drag items to reorder
        </p>
      </div>
      <ArrayOfObjectsInput {...props} />
    </div>
  )
}
```

---

## 🚀 Advanced Features Implementation

### 1. Visual Page Builder

**Goal:** Squarespace-level drag-and-drop page building

**Implementation Approach:**

```typescript
// sanity/schemas/pageBuilder.ts
export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    // Hero Block
    {
      name: 'heroBlock',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { name: 'backgroundImage', title: 'Background', type: 'image' },
        { name: 'cta', title: 'CTA Button', type: 'object', fields: [...] },
      ],
      preview: {
        select: { title: 'heading' },
        prepare({ title }) {
          return {
            title: '🦸 Hero: ' + (title || 'Untitled'),
            media: () => '🦸',
          }
        },
      },
    },
    // Text Block
    {
      name: 'textBlock',
      title: 'Text Content',
      type: 'object',
      fields: [
        { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
        { name: 'columns', title: 'Columns', type: 'number', options: { list: [1, 2, 3] } },
      ],
      preview: {
        prepare() {
          return { title: '📝 Text Block', media: () => '📝' }
        },
      },
    },
    // Benefits Grid Block
    {
      name: 'benefitsBlock',
      title: 'Benefits Grid',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'benefits', title: 'Benefits', type: 'array', of: [{ type: 'object', fields: [...] }] },
      ],
      preview: {
        prepare() {
          return { title: '✨ Benefits Grid', media: () => '✨' }
        },
      },
    },
    // CTA Block
    {
      name: 'ctaBlock',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'button', title: 'Button', type: 'object', fields: [...] },
        { name: 'backgroundColor', title: 'Background Color', type: 'color' },
      ],
      preview: {
        prepare() {
          return { title: '🎯 CTA Block', media: () => '🎯' }
        },
      },
    },
  ],
})
```

### 2. Live Preview Integration

**Presentation Tool Configuration:**

```typescript
// sanity/resolve.ts
export const resolve = {
  locations: [
    {
      title: 'Homepage',
      href: (doc: any) => '/',
    },
    {
      title: 'System Page',
      href: (doc: any) =>
        doc._type === 'systemPage' && doc.slug?.current
          ? `/${doc.slug.current}`
          : undefined,
    },
  ],
}
```

### 3. Media Library Enhancement

**Custom Media Management:**

```typescript
// sanity/plugins/mediaLibrary.tsx
import { definePlugin } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const mediaLibraryPlugin = definePlugin({
  name: 'media-library',
  studio: {
    components: {
      // Custom media browser
    },
  },
})
```

---

## 🔄 Migration Strategy

### Phase 1: Prepare New Schemas (Week 1)

1. Create `systemPage` schema
2. Enhance `brandTheme` schema with font/spacing controls
3. Create custom input components (IconPicker, RichTextEditor)
4. Update `sanity.config.tsx` with new structure

### Phase 2: Migrate Existing Content (Week 1-2)

1. Export existing homepage content from Sanity
2. Create migration scripts for:
   - Navigation items
   - Hero section
   - About section
   - Systems/services
   - Gallery items
   - Testimonials
3. Test with draft mode

### Phase 3: Build System Pages in CMS (Week 2)

1. Create 5 system page documents in Sanity
2. Manually enter content from hardcoded pages
3. Update page components to fetch from Sanity
4. Test each page individually

### Phase 4: Custom Studio UI (Week 3)

1. Implement new desk structure
2. Add Quick Actions panel
3. Create custom previews
4. Add inline editing where possible

### Phase 5: Advanced Features (Week 3-4)

1. Implement drag-and-drop ordering
2. Add live preview for all pages
3. Create font/color pickers
4. Build media library
5. Add animation controls

### Phase 6: Testing & Refinement (Week 4)

1. Test all editing workflows
2. Client training
3. Documentation
4. Performance optimization

---

## 📋 Implementation Roadmap

### Priority 1 - Essential (Do First)

- [x] Create SITEMAP.md
- [ ] Create `systemPage` schema
- [ ] Enhance `brandTheme` with typography controls
- [ ] Update `sanity.config.tsx` with new structure
- [ ] Create migration scripts for existing content
- [ ] Build system page components to read from Sanity

### Priority 2 - Enhanced Editing (Week 2-3)

- [ ] Rich text editor with font controls
- [ ] Icon picker component
- [ ] Color picker integration
- [ ] Drag-and-drop array ordering
- [ ] Custom desk structure with Quick Actions
- [ ] Live preview for all pages

### Priority 3 - Advanced Features (Week 3-4)

- [ ] Visual page builder blocks
- [ ] Media library organization
- [ ] Animation speed controls
- [ ] Conditional display logic
- [ ] Version history/rollback
- [ ] Multi-user collaboration

### Priority 4 - Polish & Training (Week 4)

- [ ] Custom Studio branding
- [ ] Tooltips and help text
- [ ] Video tutorials
- [ ] Client documentation
- [ ] Performance optimization
- [ ] Error handling improvements

---

## 🎓 Client Training Plan

### Training Materials to Create

1. **Video Tutorials:**
   - Editing homepage sections
   - Creating/editing system pages
   - Managing gallery and testimonials
   - Using the rich text editor
   - Uploading and managing images
   - Changing colors and fonts

2. **Written Documentation:**
   - Quick start guide
   - Section-by-section editing guide
   - Troubleshooting common issues
   - Best practices for images
   - SEO guidelines

3. **In-Studio Help:**
   - Tooltips on every field
   - Help text with examples
   - Links to video tutorials
   - Quick reference guide

---

## 💾 Backup & Version Control

### Content Backup Strategy

1. **Automatic Daily Backups:**
   - Sanity's built-in backup system
   - Export to JSON daily
   - Store in GitHub

2. **Pre-Migration Backups:**
   - Full export before any major changes
   - Test migrations on draft dataset first
   - Keep production untouched until verified

3. **Version Control:**
   - All schema changes in Git
   - Commit messages reference tasks
   - Tag releases (v1.0, v2.0, etc.)

---

## ✅ Success Criteria

### Must Have Before Launch

1. All 5 system pages editable from CMS
2. Homepage fully editable
3. Navigation and footer configurable
4. Rich text editing with formatting
5. Image upload and management
6. Live preview working
7. Client can complete basic edits independently
8. Mobile-responsive editing interface

### Nice to Have (Can Add Later)

1. Visual drag-and-drop page builder
2. A/B testing capabilities
3. Multi-language support
4. Advanced animation controls
5. Scheduled publishing
6. Analytics integration

---

**End of Rebuild Plan Document**
