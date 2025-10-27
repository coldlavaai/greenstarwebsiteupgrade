import { defineType } from 'sanity'

export const teamSection = defineType({
  name: 'teamSection',
  title: '👥 Team Section',
  type: 'object',
  description: 'Display team members in a grid layout',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Meet Our Team',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'bio',
              title: 'Short Bio',
              type: 'text',
              rows: 3,
              description: 'Brief description (optional)',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'linkedin',
              title: 'LinkedIn URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
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
          { title: '2 Columns', value: '2-col' },
          { title: '3 Columns', value: '3-col' },
          { title: '4 Columns', value: '4-col' },
        ],
      },
      initialValue: '3-col',
    },
    {
      name: 'showContactInfo',
      title: 'Show Contact Information',
      type: 'boolean',
      description: 'Display email/phone for each team member',
      initialValue: false,
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Dark Gray', value: 'dark-gray' },
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
      members: 'teamMembers',
    },
    prepare({ title, members }) {
      return {
        title: title || 'Team Section',
        subtitle: `${members?.length || 0} team members`,
      }
    },
  },
})
