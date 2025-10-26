# Dynamic Page & Section Management Architecture

**Created:** 2025-10-26
**Purpose:** Architecture for dynamic page creation/deletion and flexible section management
**Goal:** Enable users to create unlimited pages, add/remove/reorder sections, with full CRUD capabilities

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Page Builder Architecture](#page-builder-architecture)
3. [Section Block System](#section-block-system)
4. [Dynamic Routing Implementation](#dynamic-routing-implementation)
5. [Component Registry & Mapper](#component-registry--mapper)
6. [Studio UI for Add/Delete](#studio-ui-for-adddelete)
7. [Deletion Handling](#deletion-handling)
8. [Implementation Examples](#implementation-examples)

---

## 🎯 Overview

### User Capabilities We're Building

**Page Management:**
- ✅ Create unlimited new pages (e.g., "Services", "About", "Contact Us", "Blog")
- ✅ Delete any page (except protected ones like Homepage)
- ✅ Each page gets automatic URL slug (e.g., `/services`, `/about-us`)
- ✅ Preview before publishing
- ✅ Publish/unpublish pages

**Section Management:**
- ✅ Add any section type to any page
- ✅ Reorder sections via drag-and-drop
- ✅ Duplicate sections
- ✅ Delete sections
- ✅ Hide/show sections without deleting
- ✅ Configure each section independently

**Section Types Available:**
1. Hero Section
2. Text Content Block
3. Benefits Grid (3-6 cards)
4. Process Steps (2-6 steps)
5. Gallery/Image Grid
6. Testimonials Carousel
7. FAQ Accordion
8. Call-to-Action Block
9. Contact Form
10. Statistics Display
11. Video Embed
12. Custom HTML/Code

---

## 🏗️ Page Builder Architecture

### Enhanced Page Schema with Page Builder

```typescript
// sanity/schemas/page.ts
import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    { name: 'content', title: 'Page Content', default: true },
    { name: 'seo', title: 'SEO & Meta' },
    { name: 'settings', title: 'Page Settings' },
  ],
  fields: [
    // Basic Info
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal name for this page',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'URL path: /your-slug-here',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Landing Page', value: 'landing' },
          { title: 'Service Page', value: 'service' },
          { title: 'Content Page', value: 'content' },
          { title: 'System Page', value: 'system' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'landing',
      group: 'settings',
    },

    // PAGE BUILDER - This is the key!
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: '➕ Click "+ Add item" to add a new section. Drag to reorder.',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'benefitsGrid' },
        { type: 'processSteps' },
        { type: 'galleryGrid' },
        { type: 'testimonialsCarousel' },
        { type: 'faqAccordion' },
        { type: 'ctaBlock' },
        { type: 'contactFormBlock' },
        { type: 'statsDisplay' },
        { type: 'videoEmbed' },
        { type: 'customHtml' },
      ],
      group: 'content',
    },

    // SEO Fields
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (50-60 characters)',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description (150-160 characters)',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      group: 'seo',
    },

    // Settings
    {
      name: 'showNavigation',
      title: 'Show Navigation Bar',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    },
    {
      name: 'showFooter',
      title: 'Show Footer',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Unpublished pages return 404',
      initialValue: false,
      group: 'settings',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
    },
    {
      name: 'protected',
      title: 'Protected Page',
      type: 'boolean',
      description: 'Protected pages cannot be deleted (e.g., Homepage)',
      initialValue: false,
      readOnly: true,
      hidden: true,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'published',
      pageType: 'pageType',
    },
    prepare({ title, slug, published, pageType }) {
      return {
        title: title,
        subtitle: `/${slug} • ${pageType} • ${published ? '✅ Published' : '⏸️ Draft'}`,
        media: published ? () => '✅' : () => '⏸️',
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
```

---

## 🧩 Section Block System

### All Section Types as Separate Schemas

Each section type is its own object schema that can be added to the `sections` array:

#### 1. Hero Section Block

```typescript
// sanity/schemas/blocks/heroSection.ts
import { defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID (for anchoring)',
      type: 'string',
      description: 'Optional: e.g., "hero" for #hero anchor links',
    },
    {
      name: 'miniBadge',
      title: 'Mini Badge',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              { title: '☀️ Sun', value: 'Sun' },
              { title: '🔋 Battery', value: 'Battery' },
              { title: '⚡ Zap', value: 'Zap' },
              { title: '🏠 Home', value: 'Home' },
              { title: '🏢 Building', value: 'Building2' },
            ],
          },
        },
        { name: 'text', title: 'Badge Text', type: 'string' },
      ],
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Line 1 (White)', type: 'string' },
        { name: 'line2', title: 'Line 2 (Gradient)', type: 'string' },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'cta',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
        { name: 'style', title: 'Button Style', type: 'string', options: {
          list: [
            { title: 'Primary (Green)', value: 'primary' },
            { title: 'Secondary (White)', value: 'secondary' },
            { title: 'Outline', value: 'outline' },
          ]
        }},
      ],
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      description: 'Toggle to hide this section without deleting it',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'heading.line1',
      subtitle: 'heading.line2',
      visible: 'visible',
    },
    prepare({ title, subtitle, visible }) {
      return {
        title: `🦸 Hero: ${title || 'Untitled'}`,
        subtitle: subtitle || 'Hero Section',
        media: visible ? () => '✅' : () => '❌',
      }
    },
  },
})
```

#### 2. Text Content Block

```typescript
// sanity/schemas/blocks/textBlock.ts
export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Content',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Section Heading (optional)',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
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
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
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
    },
    {
      name: 'columns',
      title: 'Column Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Single Column', value: '1' },
          { title: 'Two Columns', value: '2' },
          { title: 'Three Columns', value: '3' },
        ],
      },
      initialValue: '1',
    },
    {
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Narrow (prose)', value: 'max-w-prose' },
          { title: 'Medium', value: 'max-w-4xl' },
          { title: 'Wide', value: 'max-w-6xl' },
          { title: 'Full Width', value: 'max-w-full' },
        ],
      },
      initialValue: 'max-w-4xl',
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      visible: 'visible',
    },
    prepare({ heading, visible }) {
      return {
        title: `📝 Text: ${heading || 'Content Block'}`,
        media: visible ? () => '✅' : () => '❌',
      }
    },
  },
})
```

#### 3. Benefits Grid Block

```typescript
// sanity/schemas/blocks/benefitsGrid.ts
export const benefitsGrid = defineType({
  name: 'benefitsGrid',
  title: 'Benefits Grid',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
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
              components: {
                input: IconPickerComponent, // Custom icon picker
              },
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(3).max(6),
    },
    {
      name: 'columns',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '3',
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      count: 'benefits.length',
      visible: 'visible',
    },
    prepare({ heading, count, visible }) {
      return {
        title: `✨ Benefits: ${heading || 'Untitled'}`,
        subtitle: `${count || 0} items`,
        media: visible ? () => '✅' : () => '❌',
      }
    },
  },
})
```

#### 4. Process Steps Block

```typescript
// sanity/schemas/blocks/processSteps.ts
export const processSteps = defineType({
  name: 'processSteps',
  title: 'Process Steps',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
    },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Step Number',
              type: 'string',
              description: 'e.g., "01", "02", etc.',
            },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text' },
          ],
          preview: {
            select: {
              number: 'number',
              title: 'title',
            },
            prepare({ number, title }) {
              return {
                title: `${number}. ${title}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6),
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal Grid', value: 'grid' },
          { title: 'Vertical List', value: 'list' },
          { title: 'Timeline', value: 'timeline' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      count: 'steps.length',
      visible: 'visible',
    },
    prepare({ heading, count, visible }) {
      return {
        title: `🔄 Process: ${heading || 'Untitled'}`,
        subtitle: `${count || 0} steps`,
        media: visible ? () => '✅' : () => '❌',
      }
    },
  },
})
```

#### 5. CTA Block

```typescript
// sanity/schemas/blocks/ctaBlock.ts
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call-to-Action',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'CTA Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'CTA Description',
      type: 'text',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
    {
      name: 'style',
      title: 'CTA Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Green)', value: 'primary' },
          { title: 'Secondary (Dark)', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      visible: 'visible',
    },
    prepare({ heading, visible }) {
      return {
        title: `🎯 CTA: ${heading || 'Untitled'}`,
        media: visible ? () => '✅' : () => '❌',
      }
    },
  },
})
```

---

## 🛣️ Dynamic Routing Implementation

### Next.js Dynamic Route Handler

```typescript
// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import { SectionRenderer } from '@/components/SectionRenderer'

interface PageData {
  _id: string
  title: string
  slug: { current: string }
  sections: any[]
  showNavigation: boolean
  showFooter: boolean
  published: boolean
  metaTitle?: string
  metaDescription?: string
}

async function getPage(slug: string): Promise<PageData | null> {
  const query = `*[_type == "page" && slug.current == $slug && published == true][0]{
    _id,
    title,
    slug,
    sections[]{
      _type,
      _key,
      ...
    },
    showNavigation,
    showFooter,
    published,
    metaTitle,
    metaDescription
  }`

  return await client.fetch(query, { slug })
}

export async function generateStaticParams() {
  const query = `*[_type == "page" && published == true]{ "slug": slug.current }`
  const pages = await client.fetch(query)

  return pages.map((page: any) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) return {}

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  const [navigationData, footerData] = await Promise.all([
    client.fetch(`*[_type == "navigationSection"][0]`),
    client.fetch(`*[_type == "footerSection"][0]`),
  ])

  return (
    <PageWrapper>
      {page.showNavigation && <Navigation data={navigationData} />}

      <main>
        {page.sections?.map((section) => (
          <SectionRenderer key={section._key} section={section} />
        ))}
      </main>

      {page.showFooter && <Footer data={footerData} />}
    </PageWrapper>
  )
}
```

### 404 Not Found Handler

```typescript
// app/[slug]/not-found.tsx
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl text-white/80 mb-8">Page Not Found</h2>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
```

---

## 🗺️ Component Registry & Mapper

### Section Renderer Component

```typescript
// components/SectionRenderer.tsx
import dynamic from 'next/dynamic'

// Lazy load all section components
const HeroSection = dynamic(() => import('./sections/HeroSection'))
const TextBlock = dynamic(() => import('./sections/TextBlock'))
const BenefitsGrid = dynamic(() => import('./sections/BenefitsGrid'))
const ProcessSteps = dynamic(() => import('./sections/ProcessSteps'))
const GalleryGrid = dynamic(() => import('./sections/GalleryGrid'))
const TestimonialsCarousel = dynamic(() => import('./sections/TestimonialsCarousel'))
const FaqAccordion = dynamic(() => import('./sections/FaqAccordion'))
const CtaBlock = dynamic(() => import('./sections/CtaBlock'))
const ContactFormBlock = dynamic(() => import('./sections/ContactFormBlock'))
const StatsDisplay = dynamic(() => import('./sections/StatsDisplay'))
const VideoEmbed = dynamic(() => import('./sections/VideoEmbed'))
const CustomHtml = dynamic(() => import('./sections/CustomHtml'))

// Component mapping registry
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  textBlock: TextBlock,
  benefitsGrid: BenefitsGrid,
  processSteps: ProcessSteps,
  galleryGrid: GalleryGrid,
  testimonialsCarousel: TestimonialsCarousel,
  faqAccordion: FaqAccordion,
  ctaBlock: CtaBlock,
  contactFormBlock: ContactFormBlock,
  statsDisplay: StatsDisplay,
  videoEmbed: VideoEmbed,
  customHtml: CustomHtml,
}

interface SectionRendererProps {
  section: {
    _type: string
    _key: string
    visible?: boolean
    [key: string]: any
  }
}

export function SectionRenderer({ section }: SectionRendererProps) {
  // Don't render if marked as invisible
  if (section.visible === false) {
    return null
  }

  const Component = SECTION_COMPONENTS[section._type]

  if (!Component) {
    console.warn(`No component found for section type: ${section._type}`)
    return null
  }

  return <Component {...section} />
}
```

### Example Section Component

```typescript
// components/sections/BenefitsGrid.tsx
'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface BenefitsGridProps {
  sectionId?: string
  heading?: string
  subheading?: string
  benefits: Benefit[]
  columns?: '2' | '3' | '4'
}

export default function BenefitsGrid({
  sectionId,
  heading,
  subheading,
  benefits,
  columns = '3',
}: BenefitsGridProps) {
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section id={sectionId} className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {heading}
            </h2>
            {subheading && (
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </motion.div>
        )}

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {benefits.map((benefit, index) => {
            const Icon = LucideIcons[benefit.icon as keyof typeof LucideIcons] as any

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎨 Studio UI for Add/Delete

### Custom Actions for Pages

```typescript
// sanity/actions/deletePageAction.ts
import { useCallback } from 'react'
import { TrashIcon } from '@sanity/icons'

export function DeletePageAction(props: any) {
  const { id, type, draft, published, onComplete } = props

  const handleDelete = useCallback(async () => {
    // Check if page is protected
    const doc = draft || published
    if (doc?.protected) {
      alert('This page is protected and cannot be deleted.')
      return
    }

    const confirmed = confirm(
      `Are you sure you want to delete this page? This action cannot be undone.`
    )

    if (confirmed) {
      // Delete both draft and published versions
      const client = props.client
      if (draft) await client.delete(draft._id)
      if (published) await client.delete(published._id)

      onComplete()
    }
  }, [draft, published, onComplete])

  return {
    label: 'Delete Page',
    icon: TrashIcon,
    onHandle: handleDelete,
    dialog: {
      type: 'confirm',
      message: 'Are you sure you want to delete this page?',
    },
  }
}
```

### Enhanced Desk Structure with Add/Delete

```typescript
// sanity/structure.ts (enhanced)
export const structure = (S: any) =>
  S.list()
    .title('🌟 GreenStar Solar CMS')
    .items([
      // Quick Actions
      S.listItem()
        .title('⚡ Quick Actions')
        .child(
          S.list()
            .title('Quick Actions')
            .items([
              // "Add New Page" button
              S.listItem()
                .title('➕ Create New Page')
                .icon(() => '➕')
                .child(
                  S.documentTypeList('page')
                    .title('Create New Page')
                    .menuItems([
                      S.menuItem()
                        .title('New Landing Page')
                        .action(() => {
                          // Open new page form with template
                        }),
                      S.menuItem()
                        .title('New Service Page')
                        .action(() => {
                          // Open new page form with service template
                        }),
                      S.menuItem()
                        .title('Blank Page')
                        .action(() => {
                          // Open blank new page form
                        }),
                    ])
                ),
            ])
        ),

      S.divider(),

      // All Pages List
      S.listItem()
        .title('📄 All Pages')
        .child(
          S.documentTypeList('page')
            .title('All Pages')
            .filter('_type == "page"')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
            .menuItems([
              ...S.documentTypeList('page').getMenuItems(),
              S.menuItem()
                .title('🗑️ Delete Page')
                .action('delete'),
            ])
            .child((documentId: string) =>
              S.document()
                .documentId(documentId)
                .schemaType('page')
                .views([
                  S.view.form(),
                  S.view
                    .component(PreviewIframe)
                    .title('Preview')
                    .options({ url: '/api/preview' }),
                ])
            )
        ),

      // ... rest of structure
    ])
```

### Custom Array Input with Add/Delete Controls

```typescript
// sanity/components/SectionArrayInput.tsx
import { ArrayOfObjectsInputProps, set, unset } from 'sanity'
import { AddIcon, TrashIcon, DragHandleIcon } from '@sanity/icons'

export function SectionArrayInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props

  const handleAdd = (sectionType: string) => {
    const newSection = {
      _type: sectionType,
      _key: `section-${Date.now()}`,
      visible: true,
    }
    onChange(set([...value, newSection]))
  }

  const handleDuplicate = (index: number) => {
    const section = value[index]
    const duplicated = {
      ...section,
      _key: `section-${Date.now()}`,
    }
    onChange(set([...value.slice(0, index + 1), duplicated, ...value.slice(index + 1)]))
  }

  const handleDelete = (index: number) => {
    const confirmed = confirm('Delete this section?')
    if (confirmed) {
      onChange(set(value.filter((_, i) => i !== index)))
    }
  }

  const handleMove = (from: number, to: number) => {
    const newValue = [...value]
    const [removed] = newValue.splice(from, 1)
    newValue.splice(to, 0, removed)
    onChange(set(newValue))
  }

  return (
    <div className="space-y-4">
      {/* Add Section Menu */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700 w-full mb-2">
          Add Section:
        </span>
        <button onClick={() => handleAdd('heroSection')} className="btn-add">
          🦸 Hero
        </button>
        <button onClick={() => handleAdd('textBlock')} className="btn-add">
          📝 Text
        </button>
        <button onClick={() => handleAdd('benefitsGrid')} className="btn-add">
          ✨ Benefits
        </button>
        <button onClick={() => handleAdd('processSteps')} className="btn-add">
          🔄 Process
        </button>
        <button onClick={() => handleAdd('ctaBlock')} className="btn-add">
          🎯 CTA
        </button>
        {/* ... more section type buttons */}
      </div>

      {/* Section List */}
      <div className="space-y-3">
        {value.map((section: any, index: number) => (
          <div key={section._key} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DragHandleIcon />
                <span className="font-medium">{section._type}</span>
                {section.visible === false && (
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    Hidden
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDuplicate(index)}
                  className="btn-icon"
                  title="Duplicate"
                >
                  📋
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn-icon text-red-600"
                  title="Delete"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
            {/* Render section fields here */}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🗑️ Deletion Handling

### Safe Deletion with Confirmations

```typescript
// lib/safeDeletion.ts
export async function safeDeletePage(client: any, pageId: string) {
  // 1. Check if page is protected
  const page = await client.fetch(
    `*[_id == $pageId][0]{ protected, title, slug }`,
    { pageId }
  )

  if (page.protected) {
    throw new Error('This page is protected and cannot be deleted.')
  }

  // 2. Check for references to this page
  const references = await client.fetch(
    `*[references($pageId)]{ _type, _id, title }`,
    { pageId }
  )

  if (references.length > 0) {
    const refList = references.map((ref: any) => `- ${ref.title || ref._id}`).join('\n')
    throw new Error(
      `Cannot delete. This page is referenced by:\n${refList}\n\nPlease remove these references first.`
    )
  }

  // 3. Create backup before deletion
  const backup = {
    ...page,
    _deletedAt: new Date().toISOString(),
    _originalId: page._id,
  }

  await client.create({
    _type: 'deletedPage',
    ...backup,
  })

  // 4. Delete the page
  await client.delete(pageId)

  // 5. Clear Next.js cache
  await fetch('/api/revalidate', {
    method: 'POST',
    body: JSON.stringify({ slug: page.slug.current }),
  })

  return { success: true, backup }
}
```

### Restore Deleted Pages

```typescript
// sanity/schemas/deletedPage.ts
export const deletedPage = defineType({
  name: 'deletedPage',
  title: 'Deleted Pages (Trash)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Original Title', type: 'string' },
    { name: '_deletedAt', title: 'Deleted At', type: 'datetime' },
    { name: '_originalId', title: 'Original ID', type: 'string' },
    // ... all other page fields
  ],
  preview: {
    select: {
      title: 'title',
      deletedAt: '_deletedAt',
    },
    prepare({ title, deletedAt }) {
      return {
        title: `🗑️ ${title}`,
        subtitle: `Deleted: ${new Date(deletedAt).toLocaleString()}`,
      }
    },
  },
})
```

---

## 📝 Implementation Checklist

### Phase 1: Core Page Builder (Week 1)

- [ ] Create `page.ts` schema with `sections` array
- [ ] Create all section block schemas:
  - [ ] heroSection
  - [ ] textBlock
  - [ ] benefitsGrid
  - [ ] processSteps
  - [ ] ctaBlock
  - [ ] faqAccordion
  - [ ] contactFormBlock
- [ ] Update `sanity/schemas/index.ts` to include all blocks
- [ ] Test creating pages with sections in Studio

### Phase 2: Dynamic Routing (Week 1-2)

- [ ] Create `app/[slug]/page.tsx` dynamic route
- [ ] Implement `generateStaticParams()`
- [ ] Create `getPage()` function with proper GROQ query
- [ ] Build `SectionRenderer` component
- [ ] Create individual section components in `components/sections/`
- [ ] Test page rendering with different section combinations

### Phase 3: Studio UI Enhancements (Week 2)

- [ ] Build custom desk structure with "Create New Page" action
- [ ] Add section type selector UI
- [ ] Implement drag-and-drop for section ordering
- [ ] Add duplicate/delete buttons for sections
- [ ] Create section visibility toggles
- [ ] Add quick preview links

### Phase 4: Deletion & Safety (Week 2-3)

- [ ] Implement protected pages flag
- [ ] Create safe deletion function with reference checking
- [ ] Build `deletedPage` schema for trash/recovery
- [ ] Add confirmation dialogs
- [ ] Create restore functionality
- [ ] Add deletion audit log

### Phase 5: Polish & Optimization (Week 3-4)

- [ ] Add section templates/presets
- [ ] Implement page duplication
- [ ] Create page templates for common layouts
- [ ] Add inline preview where possible
- [ ] Optimize performance for large pages
- [ ] Create comprehensive documentation

---

**End of Dynamic Page Architecture Document**
