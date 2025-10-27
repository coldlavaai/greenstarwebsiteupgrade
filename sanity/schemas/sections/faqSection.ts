import { defineType } from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: '❓ FAQ Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          { name: 'href', type: 'string', title: 'URL' },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
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
        ],
      },
      initialValue: 'gray',
    },
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs',
    },
    prepare({ title, faqs }) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${faqs?.length || 0} FAQs`,
      }
    },
  },
})
