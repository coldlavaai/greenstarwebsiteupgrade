import { defineType } from 'sanity'

export const statsSection = defineType({
  name: 'statsSection',
  title: '📊 Statistics Section',
  type: 'object',
  description: 'Showcase key numbers and statistics',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Add statistics to display',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'e.g., "1000+", "99%", "24/7"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the statistic',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional emoji or icon name',
            },
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
              icon: 'icon',
            },
            prepare({ number, label, icon }) {
              return {
                title: `${icon ? icon + ' ' : ''}${number}`,
                subtitle: label,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2-col' },
          { title: '3 Columns', value: '3-col' },
          { title: '4 Columns', value: '4-col' },
          { title: 'Single Row', value: 'row' },
        ],
      },
      initialValue: '4-col',
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
      stats: 'stats',
    },
    prepare({ title, stats }) {
      return {
        title: title || 'Statistics Section',
        subtitle: `${stats?.length || 0} stats`,
      }
    },
  },
})
