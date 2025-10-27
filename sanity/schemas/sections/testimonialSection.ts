import { defineType } from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: '💬 Testimonial Section',
  type: 'object',
  description: 'Display customer testimonials in a grid or carousel layout',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above testimonials',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle or description',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Add testimonials to display',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'The testimonial text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customerName',
              title: 'Customer Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customerTitle',
              title: 'Customer Title/Role',
              type: 'string',
              description: 'e.g., "Homeowner" or "Business Owner"',
            },
            {
              name: 'customerImage',
              title: 'Customer Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              description: 'Rating out of 5',
              validation: (Rule) => Rule.min(0).max(5),
            },
          ],
          preview: {
            select: {
              title: 'customerName',
              subtitle: 'quote',
              media: 'customerImage',
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Carousel/Slider', value: 'carousel' },
          { title: 'Single Large', value: 'single' },
        ],
      },
      initialValue: 'grid-3',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Dark Gray', value: 'dark-gray' },
          { title: 'Primary Color', value: 'primary' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials }) {
      return {
        title: title || 'Testimonial Section',
        subtitle: `${testimonials?.length || 0} testimonials`,
      }
    },
  },
})
