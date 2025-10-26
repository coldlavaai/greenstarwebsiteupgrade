import { defineType } from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: 'Company Information',
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
          { title: 'About Us', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Process', value: 'process' },
          { title: 'Values', value: 'values' },
          { title: 'Team', value: 'team' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full content with rich text',
    },
    {
      name: 'servicesOffered',
      title: 'Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of services the company provides',
    },
    {
      name: 'servicesNotOffered',
      title: 'Services NOT Offered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Services the company does not provide',
    },
    {
      name: 'keyDifferentiators',
      title: 'Key Differentiators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
        },
      ],
    },
    {
      name: 'experienceYears',
      title: 'Years of Experience',
      type: 'number',
      description: 'Combined years of experience',
    },
    {
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers appear first',
      initialValue: 5,
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Show on website',
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
