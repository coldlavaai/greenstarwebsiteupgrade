import { defineType } from 'sanity'

export const systemsSection = defineType({
  name: 'systemsSection',
  title: 'Systems Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Solar Solutions',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Tailored renewable energy systems for homes and businesses',
    },
    {
      name: 'systems',
      title: 'Systems',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Select the services/systems to display in this section',
    },
    {
      name: 'showFeatures',
      title: 'Show Features List',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Learn More',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '#contact',
    },
  ],
})
