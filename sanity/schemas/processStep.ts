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
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
