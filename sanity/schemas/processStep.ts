import { defineType } from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Steps',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    },
    {
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name',
    },
    {
      name: 'image',
      title: 'Step Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backContent',
      title: 'Back Content',
      type: 'text',
      description: 'Additional detailed content shown on card flip',
      rows: 4,
    },
    {
      name: 'frontReview',
      title: 'Front Review',
      type: 'object',
      description: 'Customer review shown on the front of the card',
      fields: [
        {
          name: 'text',
          title: 'Review Text',
          type: 'text',
          rows: 2,
        },
        {
          name: 'author',
          title: 'Review Author',
          type: 'string',
        },
      ],
    },
    {
      name: 'backReview',
      title: 'Back Review',
      type: 'object',
      description: 'Customer review shown on the back of the card',
      fields: [
        {
          name: 'text',
          title: 'Review Text',
          type: 'text',
          rows: 2,
        },
        {
          name: 'author',
          title: 'Review Author',
          type: 'string',
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
