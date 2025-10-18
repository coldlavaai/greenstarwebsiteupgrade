import { defineType } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Get Your Free Solar Survey',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Transform your energy future today',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue:
        'Ready to make the switch to solar? Get in touch today for a free, no-obligation survey and quote.',
    },
    {
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Request Your Free Survey',
    },
    {
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      initialValue: 'Thank you! We\'ll be in touch shortly.',
    },
    {
      name: 'placeholders',
      title: 'Form Placeholders',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name Placeholder', type: 'string', initialValue: 'Your Name' },
        { name: 'email', title: 'Email Placeholder', type: 'string', initialValue: 'Your Email' },
        { name: 'phone', title: 'Phone Placeholder', type: 'string', initialValue: 'Your Phone' },
        {
          name: 'message',
          title: 'Message Placeholder',
          type: 'string',
          initialValue: 'Tell us about your project...',
        },
      ],
    },
    {
      name: 'showContactInfo',
      title: 'Show Contact Information',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
