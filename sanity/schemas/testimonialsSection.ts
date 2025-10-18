import { defineType } from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What Our Customers Say',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Real experiences from real customers',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Select testimonials to display',
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
      initialValue: [
        { value: '500+', label: 'Happy Customers' },
        { value: '4.9/5', label: 'Average Rating' },
        { value: '100%', label: 'Satisfaction Rate' },
      ],
    },
    {
      name: 'showStats',
      title: 'Show Statistics',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
