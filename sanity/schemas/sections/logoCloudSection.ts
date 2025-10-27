import { defineType } from 'sanity'

export const logoCloudSection = defineType({
  name: 'logoCloudSection',
  title: '🏢 Logo Cloud Section',
  type: 'object',
  description: 'Display client, partner, or certification logos',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Trusted by Industry Leaders" or "Our Certifications"',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'name',
              title: 'Company/Organization Name',
              type: 'string',
              description: 'For accessibility and alt text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'url',
              description: 'Optional link to company/organization website',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (Responsive)', value: 'grid' },
          { title: 'Single Row (Scrollable)', value: 'row' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'itemsPerRow',
      title: 'Items Per Row',
      type: 'number',
      description: 'For grid layout (3-6 recommended)',
      validation: (Rule) => Rule.min(2).max(8),
      initialValue: 4,
    },
    {
      name: 'logoSize',
      title: 'Logo Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'grayscale',
      title: 'Show in Grayscale',
      type: 'boolean',
      description: 'Display logos in grayscale (color on hover)',
      initialValue: true,
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
        ],
      },
      initialValue: 'light-gray',
    },
    {
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: [
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
      logos: 'logos',
    },
    prepare({ title, logos }) {
      return {
        title: title || 'Logo Cloud Section',
        subtitle: `${logos?.length || 0} logos`,
      }
    },
  },
})
