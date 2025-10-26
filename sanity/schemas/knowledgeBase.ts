import { defineType } from 'sanity'

export default defineType({
  name: 'knowledgeBase',
  title: 'Knowledge Base Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Installation', value: 'installation' },
          { title: 'Technical Specs', value: 'technical' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Troubleshooting', value: 'troubleshooting' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Product Information', value: 'product-info' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Warranty', value: 'warranty' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary for quick reference',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher number = higher priority in search results',
      initialValue: 0,
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
