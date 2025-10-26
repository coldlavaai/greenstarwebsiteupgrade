import { defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Power Your Home with Clean Energy',
    },
    {
      name: 'subheading',
      title: 'Subheading',
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
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Free Quote',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '#contact',
    },
    {
      name: 'secondaryCtaText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Learn More',
    },
    {
      name: 'secondaryCtaLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '#about',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    },
  ],
})
