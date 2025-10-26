import { defineType } from 'sanity'

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
    // BASIC INFO
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal name for this page (e.g., "Solar Panels - Home")',
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
      description: 'URL path (e.g., "solar-panels-home" → /solar-panels-home)',
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

    // HERO SECTION
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
              { title: '🔌 Plug', value: 'Plug' },
            ],
          },
        },
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
          description: 'e.g., "Residential Solar Solutions"',
        },
      ],
      group: 'hero',
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'object',
      description: 'Split into two lines for styling',
      fields: [
        {
          name: 'line1',
          title: 'Line 1 (White Text)',
          type: 'string',
          description: 'e.g., "Solar Panels"',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'line2',
          title: 'Line 2 (Gradient Text)',
          type: 'string',
          description: 'e.g., "for Your Home"',
          validation: (Rule) => Rule.required(),
        },
      ],
      group: 'hero',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'Rich text with multiple paragraphs. Each paragraph shows as separate <p> tag.',
      group: 'hero',
    },
    {
      name: 'heroCta',
      title: 'Hero CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Free Quote',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '#contact',
        },
      ],
      group: 'hero',
    },

    // BENEFITS SECTION
    {
      name: 'benefitsHeading',
      title: 'Benefits Section Heading',
      type: 'string',
      initialValue: 'Why Choose Solar Energy',
      group: 'benefits',
    },
    {
      name: 'benefitsSubheading',
      title: 'Benefits Section Subheading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
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
                  { title: '🏠 Home', value: 'Home' },
                  { title: '⏰ Clock', value: 'Clock' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title,
                subtitle: subtitle,
                media: () => icon || '✨',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6).warning('Maximum 6 benefits recommended for best layout'),
      group: 'benefits',
    },

    // PROCESS SECTION
    {
      name: 'processHeading',
      title: 'Process Section Heading',
      type: 'string',
      initialValue: 'Our Process',
      group: 'process',
    },
    {
      name: 'processSubheading',
      title: 'Process Section Subheading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
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
            {
              name: 'number',
              title: 'Step Number',
              type: 'string',
              description: 'e.g., "01", "02", "03", "04"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
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
      validation: (Rule) => Rule.max(6).warning('Maximum 6 steps recommended'),
      group: 'process',
    },

    // FAQ SECTION
    {
      name: 'faqHeading',
      title: 'FAQ Section Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
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
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8).warning('Maximum 8 FAQs recommended'),
      group: 'faq',
    },

    // CTA SECTION
    {
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      initialValue: 'Ready to Get Started?',
      group: 'cta',
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      group: 'cta',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Started',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/#contact',
        },
      ],
      group: 'cta',
    },

    // SEO
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best SEO'),
      group: 'seo',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description (150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
      group: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      group: 'seo',
    },

    // SETTINGS
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Unpublished pages return 404',
      initialValue: true,
      group: 'settings',
    },
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
        subtitle: `/${slug} • ${published ? '✅ Published' : '⏸️ Draft'}`,
        media: published ? () => '✅' : () => '⏸️',
      }
    },
  },
  orderings: [
    {
      title: 'Page Type',
      name: 'pageTypeAsc',
      by: [{ field: 'pageType', direction: 'asc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
