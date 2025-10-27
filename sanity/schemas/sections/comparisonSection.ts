import { defineType } from 'sanity'

export const comparisonSection = defineType({
  name: 'comparisonSection',
  title: '⚖️ Comparison Section',
  type: 'object',
  description: 'Compare products, services, or options side-by-side',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Compare Options',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'columns',
      title: 'Comparison Columns',
      type: 'array',
      description: 'Each column represents one option/product',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Option Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highlighted',
              title: 'Highlight This Column',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'price',
              title: 'Price (Optional)',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(4),
    },
    {
      name: 'features',
      title: 'Features to Compare',
      type: 'array',
      description: 'Each feature will be shown as a row in the comparison',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'featureName',
              title: 'Feature Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'values',
              title: 'Values for Each Column',
              type: 'array',
              description: 'Order must match the columns above',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      description: 'Text, number, or use ✓/✗ for yes/no',
                    },
                    {
                      name: 'highlight',
                      title: 'Highlight This Value',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'showCTA',
      title: 'Show Call-to-Action Buttons',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'One button per column (order must match columns)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Learn More',
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'white',
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
      initialValue: 'large',
    },
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
    },
    prepare({ title, columns }) {
      return {
        title: title || 'Comparison Section',
        subtitle: `${columns?.length || 0} options`,
      }
    },
  },
})
