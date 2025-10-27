import { defineType } from 'sanity'

export const accordionSection = defineType({
  name: 'accordionSection',
  title: '📂 Accordion Section',
  type: 'object',
  description: 'Expandable/collapsible content panels',
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
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Item Title',
              type: 'string',
              description: 'The clickable header',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              description: 'Rich text content that expands',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            name: 'href',
                            type: 'string',
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional emoji or icon',
            },
            {
              name: 'defaultOpen',
              title: 'Open by Default',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare({ title, icon }) {
              return {
                title: `${icon ? icon + ' ' : ''}${title}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple items to be expanded at once',
      initialValue: false,
    },
    {
      name: 'style',
      title: 'Visual Style',
      type: 'string',
      options: {
        list: [
          { title: 'Clean/Minimal', value: 'clean' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Card Style', value: 'card' },
        ],
      },
      initialValue: 'bordered',
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
      initialValue: 'medium',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Accordion Section',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
