import { defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Customer Testimonials',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'customer', title: 'Customer Info' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    {
      name: 'position',
      title: 'Display Order',
      type: 'number',
      description: 'Order in carousel (1-4). Lower numbers appear first.',
      validation: (Rule) => Rule.required().min(1).max(10).integer(),
      initialValue: 1,
      group: 'settings',
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      description: 'Full name of the customer',
      validation: (Rule) => Rule.required(),
      group: 'customer',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or area (e.g., "Manchester")',
      validation: (Rule) => Rule.required(),
      group: 'customer',
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: 'Rating out of 5 stars',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
      group: 'content',
    },
    {
      name: 'testimonial',
      title: 'Review Text',
      type: 'text',
      description: 'The customer\'s review (2-3 sentences recommended)',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
      group: 'content',
    },
    {
      name: 'serviceType',
      title: 'Service Received',
      type: 'string',
      description: 'What service did they get?',
      options: {
        list: [
          { title: '☀️ Solar Panel Installation', value: 'solar-panels' },
          { title: '🔋 Battery Storage', value: 'battery-storage' },
          { title: '⚡ Solar + Battery Combo', value: 'combo' },
          { title: '🚗 EV Charging', value: 'ev-charging' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    },
    {
      name: 'avatar',
      title: 'Customer Photo',
      type: 'image',
      description: 'Optional photo of the customer',
      options: {
        hotspot: true,
      },
      group: 'customer',
    },
    {
      name: 'featured',
      title: 'Show on website?',
      type: 'boolean',
      description: 'Toggle to show/hide this testimonial',
      initialValue: true,
      group: 'settings',
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date',
      description: 'When was this review given?',
      initialValue: () => new Date().toISOString().split('T')[0],
      group: 'settings',
    },
  ],
  preview: {
    select: {
      name: 'customerName',
      position: 'position',
      location: 'location',
      rating: 'rating',
    },
    prepare({ name, position, location, rating }) {
      const stars = '⭐'.repeat(rating)
      return {
        title: `${position}. ${name}`,
        subtitle: `${location} - ${stars}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
