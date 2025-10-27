import { defineType } from 'sanity'

export const gridSection = defineType({
  name: 'gridSection',
  title: '🔲 Grid Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Item Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Item Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt text',
                },
              ],
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name (from Lucide icons) - shown if no image',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Optional link URL',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      description: 'Number of columns on desktop',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    },
    {
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      options: {
        list: [
          { title: 'Plain', value: 'plain' },
          { title: 'Card (with border)', value: 'card' },
          { title: 'Shadow', value: 'shadow' },
        ],
      },
      initialValue: 'card',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Primary Brand', value: 'primary' },
        ],
      },
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Grid Section',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
