import { defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location/Area',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: 'testimonial',
      title: 'Review Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solar Panel Installation', value: 'solar-panels' },
          { title: 'Battery Storage', value: 'battery-storage' },
          { title: 'EV Charging', value: 'ev-charging' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Show on website?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
})
