import { defineType } from 'sanity'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Simple Process',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'From consultation to installation in four easy steps',
    },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'processStep' }] }],
      description: 'Select process steps to display (will show in order)',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Start Your Journey',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '#contact',
    },
    {
      name: 'showCta',
      title: 'Show CTA Button',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
