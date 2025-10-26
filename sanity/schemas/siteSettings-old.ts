import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Green Star Solar',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Powering Your Future with Clean Energy',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Used for SEO and site descriptions',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      initialValue: '0800 123 4567',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'info@greenstarsolar.co.uk',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'postcode', title: 'Postcode', type: 'string' },
        { name: 'country', title: 'Country', type: 'string', initialValue: 'United Kingdom' },
      ],
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'logoWhite',
      title: 'Logo (White Version)',
      type: 'image',
    },
    {
      name: 'brandColor',
      title: 'Brand Color',
      type: 'string',
      initialValue: '#8cc63f',
      description: 'Primary brand color (hex code)',
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    },
  ],
})
