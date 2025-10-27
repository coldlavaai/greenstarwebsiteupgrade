import { defineType } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: '🎯 CTA Section',
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
      name: 'buttons',
      title: 'Buttons',
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
                  { title: 'Primary (Filled)', value: 'primary' },
                  { title: 'Secondary (Outline)', value: 'secondary' },
                  { title: 'Ghost (Text)', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon name (from Lucide icons)',
            },
          ],
        },
      ],
    },
    {
      name: 'style',
      title: 'CTA Style',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Split (Text + Image)', value: 'split' },
          { title: 'Banner', value: 'banner' },
        ],
      },
      initialValue: 'centered',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Primary Brand', value: 'primary' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'large',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'CTA Section',
        subtitle: subtitle || 'Call to Action',
      }
    },
  },
})
