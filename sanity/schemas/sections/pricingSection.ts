import { defineType } from 'sanity'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: '💰 Pricing Section',
  type: 'object',
  description: 'Display pricing plans or packages',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Pricing Plans',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "£999", "£49/month", "Contact Us"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'feature',
                      title: 'Feature',
                      type: 'string',
                    },
                    {
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'feature',
                      included: 'included',
                    },
                    prepare({ title, included }) {
                      return {
                        title: `${included ? '✓' : '✗'} ${title}`,
                      }
                    },
                  },
                },
              ],
            },
            {
              name: 'highlighted',
              title: 'Highlight This Plan',
              type: 'boolean',
              description: 'Make this plan stand out (e.g., "Most Popular")',
              initialValue: false,
            },
            {
              name: 'highlightLabel',
              title: 'Highlight Label',
              type: 'string',
              description: 'e.g., "Most Popular", "Best Value"',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Get Started',
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              highlighted: 'highlighted',
            },
            prepare({ title, subtitle, highlighted }) {
              return {
                title: highlighted ? `⭐ ${title}` : title,
                subtitle: subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: '1 Column', value: '1-col' },
          { title: '2 Columns', value: '2-col' },
          { title: '3 Columns', value: '3-col' },
        ],
      },
      initialValue: '3-col',
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
      initialValue: 'light-gray',
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
      plans: 'plans',
    },
    prepare({ title, plans }) {
      return {
        title: title || 'Pricing Section',
        subtitle: `${plans?.length || 0} plans`,
      }
    },
  },
})
