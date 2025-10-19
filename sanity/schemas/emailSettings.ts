import { defineType } from 'sanity'

export const emailSettings = defineType({
  name: 'emailSettings',
  title: 'Email Notification Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      description: 'Internal reference (don\'t change)',
      initialValue: 'Email Notification Settings',
      hidden: true,
    },
    {
      name: 'notificationEmails',
      title: 'Notification Email Addresses',
      type: 'array',
      description: 'All these emails will receive notifications when someone submits the contact form',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'email',
              title: 'Email Address',
              type: 'string',
              validation: (Rule) => Rule.required().email(),
            },
            {
              name: 'name',
              title: 'Recipient Name',
              type: 'string',
              description: 'Who is this email for? (e.g., "Sales Team", "Oliver")',
            },
          ],
          preview: {
            select: {
              email: 'email',
              name: 'name',
            },
            prepare({ email, name }) {
              return {
                title: email,
                subtitle: name || 'No name provided',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('You must have at least one notification email'),
    },
    {
      name: 'emailSubject',
      title: 'Email Subject Line',
      type: 'string',
      description: 'Subject line for notification emails',
      initialValue: 'New Contact Form Submission - GreenStar Solar',
    },
    {
      name: 'enableNotifications',
      title: 'Enable Email Notifications',
      type: 'boolean',
      description: 'Turn email notifications on/off',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Email Notification Settings',
        subtitle: 'Configure who receives form notifications',
      }
    },
  },
})
