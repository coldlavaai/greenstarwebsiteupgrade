import { defineType } from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Projects',
    },
    {
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Browse our portfolio of successful installations',
    },
    {
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryItem' }] }],
      description: 'Select gallery items to display',
    },
    {
      name: 'showCategories',
      title: 'Show Category Filter',
      type: 'boolean',
      initialValue: true,
      description: 'Allow filtering by category',
    },
    {
      name: 'itemsPerRow',
      title: 'Items Per Row',
      type: 'number',
      initialValue: 3,
      description: 'Number of items to display per row (desktop)',
      validation: (Rule: any) => Rule.min(2).max(4),
    },
  ],
})
