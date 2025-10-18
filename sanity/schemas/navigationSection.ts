import { defineType } from 'sanity'

export const navigationSection = defineType({
  name: 'navigationSection',
  title: 'Navigation',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      initialValue: 'Greenstar Solar',
    },
    {
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
            { name: 'order', title: 'Order', type: 'number' },
          ],
        },
      ],
      initialValue: [
        { label: 'Home', href: '#home', order: 1 },
        { label: 'About', href: '#about', order: 2 },
        { label: 'Systems', href: '#systems', order: 3 },
        { label: 'Process', href: '#process', order: 4 },
        { label: 'Testimonials', href: '#testimonials', order: 5 },
        { label: 'Contact', href: '#contact', order: 6 },
      ],
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Get Free Quote' },
        { name: 'href', title: 'Button Link', type: 'string', initialValue: '#contact' },
        { name: 'show', title: 'Show Button', type: 'boolean', initialValue: true },
      ],
    },
    {
      name: 'sticky', title: 'Sticky Navigation',
      type: 'boolean',
      initialValue: true,
      description: 'Keep navigation visible when scrolling',
    },
  ],
})
