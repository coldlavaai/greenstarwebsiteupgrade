import { defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Zap", "Battery", "Car")',
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      description: 'Upload a custom image here. If not uploaded, a default placeholder image will be used based on the service name.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'priceDisplay',
      title: 'Price Display',
      type: 'string',
      description: 'E.g., "From £5,999" or "Contact for quote"',
    },
    {
      name: 'featured',
      title: 'Show on homepage?',
      type: 'boolean',
      initialValue: false,
    },
  ],
})
