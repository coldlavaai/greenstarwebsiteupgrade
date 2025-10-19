import { defineType } from 'sanity'

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'When the form was submitted',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Customer name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Customer email address',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Customer phone number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'Customer message',
      rows: 4,
    },
    {
      name: 'status',
      title: 'Lead Status',
      type: 'string',
      description: 'Track the status of this lead',
      options: {
        list: [
          { title: '📬 New', value: 'new' },
          { title: '👀 Viewed', value: 'viewed' },
          { title: '📞 Contacted', value: 'contacted' },
          { title: '✅ Converted', value: 'converted' },
          { title: '❌ Not Interested', value: 'not-interested' },
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes about this lead',
      rows: 3,
    },
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      phone: 'phone',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ name, email, phone, status, submittedAt }) {
      const statusEmoji = {
        'new': '📬',
        'viewed': '👀',
        'contacted': '📞',
        'converted': '✅',
        'not-interested': '❌',
      }[status || 'new']

      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''

      return {
        title: `${statusEmoji} ${name}`,
        subtitle: `${email} • ${phone} • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }, { field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
