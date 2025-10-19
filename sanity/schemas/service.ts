import { defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Systems & Services',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    {
      name: 'position',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this appears (1-4). Lower numbers appear first.',
      validation: (Rule) => Rule.required().min(1).max(4).integer(),
      initialValue: 1,
      group: 'settings',
    },
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      description: 'Full name (e.g., "Solar Panels for Home")',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Solar Panels', value: 'solar-panels' },
          { title: 'Battery Storage', value: 'battery-storage' },
          { title: 'EV Charging', value: 'ev-charging' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description shown on the service card',
      rows: 3,
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      description: 'Card background image. Recommended: 800x600px or larger.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'media',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name: Sun, Battery, Building2, or Zap',
      options: {
        list: [
          { title: '☀️ Sun (Solar)', value: 'Sun' },
          { title: '🔋 Battery', value: 'Battery' },
          { title: '🏢 Building (Business)', value: 'Building2' },
          { title: '⚡ Zap (Energy)', value: 'Zap' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'media',
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      description: 'List of 4 key features/benefits',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
      group: 'content',
    },
    {
      name: 'priceDisplay',
      title: 'Price Display',
      type: 'string',
      description: 'Optional: e.g., "From £5,999" or "Contact for quote"',
      group: 'content',
    },
    {
      name: 'featured',
      title: 'Show on homepage?',
      type: 'boolean',
      description: 'Toggle to show/hide on main Systems section',
      initialValue: true,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      position: 'position',
      category: 'category',
      media: 'image',
    },
    prepare({ title, position, category, media }) {
      return {
        title: `${position}. ${title}`,
        subtitle: category,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
})
