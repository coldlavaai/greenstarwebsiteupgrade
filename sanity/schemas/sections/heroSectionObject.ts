import { defineType } from 'sanity'

export const heroSectionObject = defineType({
  name: 'heroSectionObject',
  title: '🦸 Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    },
    {
      name: 'buttons',
      title: 'Call to Action Buttons',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Ghost', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
            },
          ],
        },
      ],
    },
    {
      name: 'height',
      title: 'Hero Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small (400px)', value: 'small' },
          { title: 'Medium (600px)', value: 'medium' },
          { title: 'Large (800px)', value: 'large' },
          { title: 'Full Screen', value: 'fullscreen' },
        ],
      },
      initialValue: 'large',
    },
    {
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    },
    {
      name: 'overlay',
      title: 'Background Overlay',
      type: 'boolean',
      description: 'Add dark overlay over background image',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
  },
})
