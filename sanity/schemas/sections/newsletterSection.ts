import { defineType } from 'sanity'

export const newsletterSection = defineType({
  name: 'newsletterSection',
  title: '📧 Newsletter Section',
  type: 'object',
  description: 'Newsletter signup form section',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Subscribe to Our Newsletter',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Explain what subscribers will receive',
    },
    {
      name: 'placeholderText',
      title: 'Input Placeholder',
      type: 'string',
      initialValue: 'Enter your email address',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thank you for subscribing!',
    },
    {
      name: 'privacyNote',
      title: 'Privacy Note',
      type: 'text',
      rows: 2,
      description: 'e.g., "We respect your privacy. Unsubscribe anytime."',
    },
    {
      name: 'showBenefits',
      title: 'Show Benefits List',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'benefits',
      title: 'Newsletter Benefits',
      type: 'array',
      description: 'What subscribers get (displayed as bullet points)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'benefit',
              title: 'Benefit',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional emoji',
            },
          ],
          preview: {
            select: {
              benefit: 'benefit',
              icon: 'icon',
            },
            prepare({ benefit, icon }) {
              return {
                title: `${icon ? icon + ' ' : ''}${benefit}`,
              }
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
          { title: 'Centered (Simple)', value: 'centered' },
          { title: 'Side-by-Side', value: 'side-by-side' },
          { title: 'Card Style', value: 'card' },
          { title: 'Full Width Banner', value: 'banner' },
        ],
      },
      initialValue: 'centered',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Primary Color', value: 'primary' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'White', value: 'white' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'showImage',
      title: 'Show Image/Illustration',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => !parent?.showImage,
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
      layout: 'layout',
    },
    prepare({ title, layout }) {
      return {
        title: title || 'Newsletter Section',
        subtitle: `Layout: ${layout || 'centered'}`,
      }
    },
  },
})
