import { defineType } from 'sanity'

export const footerSection = defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      initialValue:
        'Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.',
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'Greenstar Solar. All rights reserved. | MCS Certified Installer',
    },
    {
      name: 'companyLinks',
      title: 'Company Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Name', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Process', href: '#process' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      name: 'systemsLinks',
      title: 'Systems Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Name', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { name: 'Solar Panels for Home', href: '#solar-home' },
        { name: 'Battery Storage for Home', href: '#battery-home' },
        { name: 'Solar Panels for Business', href: '#solar-business' },
        { name: 'Battery Storage for Business', href: '#battery-business' },
      ],
    },
    {
      name: 'resourcesLinks',
      title: 'Resources Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Name', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { name: 'FAQ', href: '#faq' },
        { name: 'Blog', href: '#blog' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'Warranty Info', href: '#warranty' },
      ],
    },
    {
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Name', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
    {
      name: 'showScrollToTop',
      title: 'Show Scroll to Top Button',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
