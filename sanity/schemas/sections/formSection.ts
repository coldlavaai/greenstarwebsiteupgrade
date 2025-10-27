import { defineType } from 'sanity'

export const formSection = defineType({
  name: 'formSection',
  title: '📝 Form Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Form Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Form Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact' },
          { title: 'Quote Request', value: 'quote' },
          { title: 'Newsletter Signup', value: 'newsletter' },
          { title: 'Custom Form', value: 'custom' },
        ],
      },
      initialValue: 'contact',
    },
    {
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      description: 'Drag to reorder fields',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select Dropdown', value: 'select' },
                  { title: 'Checkbox', value: 'checkbox' },
                ],
              },
              initialValue: 'text',
            },
            {
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
            },
            {
              name: 'options',
              title: 'Options (for Select)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Only used for select dropdowns',
            },
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              required: 'required',
            },
            prepare({ label, type, required }) {
              return {
                title: label,
                subtitle: `${type}${required ? ' (required)' : ''}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thank you! We\'ll be in touch soon.',
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
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      title: 'title',
      formType: 'formType',
      fields: 'fields',
    },
    prepare({ title, formType, fields }) {
      return {
        title: title || 'Form Section',
        subtitle: `${formType} | ${fields?.length || 0} fields`,
      }
    },
  },
})
