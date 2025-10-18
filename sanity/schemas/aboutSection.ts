import { defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Why Choose Green Star Solar?',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'Leading the UK in Renewable Energy',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue:
        'We are passionate about helping homeowners and businesses transition to clean, renewable energy. With over a decade of experience, our MCS-certified team delivers exceptional solar installations across the UK.',
    },
    {
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name',
            },
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
})
