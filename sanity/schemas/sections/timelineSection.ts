import { defineType } from 'sanity'

export const timelineSection = defineType({
  name: 'timelineSection',
  title: '⏳ Timeline Section',
  type: 'object',
  description: 'Display events, milestones, or process steps in a timeline',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Journey',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'events',
      title: 'Timeline Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date/Year',
              type: 'string',
              description: 'e.g., "2020", "March 2021", "Q1 2023"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional emoji or icon',
            },
          ],
          preview: {
            select: {
              date: 'date',
              title: 'title',
              icon: 'icon',
              media: 'image',
            },
            prepare({ date, title, icon, media }) {
              return {
                title: `${icon ? icon + ' ' : ''}${date}`,
                subtitle: title,
                media,
              }
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Vertical (Left)', value: 'vertical-left' },
          { title: 'Vertical (Center)', value: 'vertical-center' },
          { title: 'Vertical (Alternating)', value: 'vertical-alternating' },
          { title: 'Horizontal', value: 'horizontal' },
        ],
      },
      initialValue: 'vertical-center',
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
      events: 'events',
    },
    prepare({ title, events }) {
      return {
        title: title || 'Timeline Section',
        subtitle: `${events?.length || 0} events`,
      }
    },
  },
})
