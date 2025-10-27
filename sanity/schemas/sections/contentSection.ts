import { defineType } from 'sanity'

export const contentSection = defineType({
  name: 'contentSection',
  title: '📝 Content Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading for this section',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Two Columns', value: 'two-column' },
          { title: 'Narrow (Centered)', value: 'narrow' },
        ],
      },
      initialValue: 'single',
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
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
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
      content: 'content',
    },
    prepare({ title, content }) {
      const block = content?.find((b: any) => b._type === 'block')
      const text = block?.children?.[0]?.text
      return {
        title: title || 'Content Section',
        subtitle: text ? `${text.substring(0, 60)}...` : 'No content',
      }
    },
  },
})
