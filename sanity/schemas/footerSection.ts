import { defineType } from 'sanity'

export const footerSection = defineType({
  name: 'footerSection',
  title: '🦶 Footer',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'styling', title: 'Styling' },
    { name: 'features', title: 'Features' },
  ],
  fields: [
    // =======================
    // CONTENT
    // =======================
    {
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Logo shown in footer (uses default logo if not set)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Company Logo',
        },
      ],
      group: 'content',
    },
    {
      name: 'logoHeight',
      title: 'Logo Height',
      type: 'number',
      description: 'Logo height in pixels',
      initialValue: 40,
      validation: (Rule) => Rule.min(20).max(100),
      group: 'content',
    },
    {
      name: 'companyDescription',
      title: 'Company Description',
      type: 'array',
      description: 'Short description about your company',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      group: 'content',
    },

    // Footer Columns
    {
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      description: 'Add columns with links. Drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'url',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'openInNewTab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({ title, links }) {
              return {
                title: title,
                subtitle: `${links?.length || 0} links`,
              }
            },
          },
        },
      ],
      group: 'content',
    },

    // Newsletter Signup
    {
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      description: 'Email newsletter subscription form',
      fields: [
        {
          name: 'enabled',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Subscribe to Our Newsletter',
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Get the latest updates on solar energy and exclusive offers.',
        },
        {
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          initialValue: 'Enter your email',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Subscribe',
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          initialValue: 'Thanks for subscribing!',
        },
      ],
      group: 'content',
    },

    // Social Media
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      description: 'Show social media icons in footer',
      fields: [
        {
          name: 'enabled',
          title: 'Show Social Links',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Follow Us',
        },
        {
          name: 'useGlobalSettings',
          title: 'Use Links from Site Settings',
          type: 'boolean',
          description: 'Use social links from Site Settings instead of custom links',
          initialValue: true,
        },
        {
          name: 'customLinks',
          title: 'Custom Social Links',
          type: 'array',
          description: 'Only used if "Use Links from Site Settings" is disabled',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Twitter/X', value: 'twitter' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                    ],
                  },
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
      group: 'content',
    },

    // Copyright
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Copyright Text',
          type: 'string',
          description: 'Use {year} to auto-insert current year',
          initialValue: '© {year} Greenstar Solar. All rights reserved.',
        },
        {
          name: 'additionalText',
          title: 'Additional Text',
          type: 'string',
          description: 'Extra text shown after copyright (e.g., certifications)',
          initialValue: 'MCS Certified Installer',
        },
      ],
      group: 'content',
    },

    // =======================
    // LAYOUT
    // =======================
    {
      name: 'layoutStyle',
      title: 'Layout Style',
      type: 'string',
      description: 'Choose footer layout structure',
      options: {
        list: [
          { title: 'Simple (1 row, centered)', value: 'simple' },
          { title: 'Multi-Column (2-4 columns)', value: 'columns' },
          { title: 'Stacked (mobile-friendly)', value: 'stacked' },
        ],
      },
      initialValue: 'columns',
      group: 'layout',
    },
    {
      name: 'columnCount',
      title: 'Number of Columns',
      type: 'number',
      description: 'Number of columns on desktop (2-4)',
      initialValue: 4,
      validation: (Rule) => Rule.min(2).max(4),
      group: 'layout',
    },
    {
      name: 'alignment',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Justify', value: 'justify' },
        ],
      },
      initialValue: 'left',
      group: 'layout',
    },
    {
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      description: 'Maximum width of footer content',
      options: {
        list: [
          { title: '1024px - Compact', value: '1024px' },
          { title: '1280px - Standard', value: '1280px' },
          { title: '1440px - Wide', value: '1440px' },
          { title: '100% - Full Width', value: '100%' },
        ],
      },
      initialValue: '1280px',
      group: 'layout',
    },

    // =======================
    // STYLING
    // =======================
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Footer background color',
      group: 'styling',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      description: 'Primary text color',
      group: 'styling',
    },
    {
      name: 'linkColor',
      title: 'Link Color',
      type: 'color',
      description: 'Color for links',
      group: 'styling',
    },
    {
      name: 'linkHoverColor',
      title: 'Link Hover Color',
      type: 'color',
      description: 'Color when hovering over links',
      group: 'styling',
    },
    {
      name: 'borderTop',
      title: 'Top Border',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Top Border',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'color',
          title: 'Border Color',
          type: 'color',
        },
        {
          name: 'width',
          title: 'Border Width',
          type: 'number',
          description: 'Border width in pixels',
          initialValue: 1,
          validation: (Rule) => Rule.min(1).max(10),
        },
      ],
      group: 'styling',
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'object',
      description: 'Spacing inside footer',
      fields: [
        {
          name: 'top',
          title: 'Top Padding',
          type: 'number',
          description: 'Padding in pixels',
          initialValue: 64,
        },
        {
          name: 'bottom',
          title: 'Bottom Padding',
          type: 'number',
          description: 'Padding in pixels',
          initialValue: 32,
        },
      ],
      group: 'styling',
    },

    // =======================
    // FEATURES
    // =======================
    {
      name: 'showScrollToTop',
      title: 'Scroll to Top Button',
      type: 'boolean',
      description: 'Show button to scroll back to top of page',
      initialValue: true,
      group: 'features',
    },
    {
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'object',
      description: 'Show certification badges and trust signals',
      fields: [
        {
          name: 'enabled',
          title: 'Show Trust Badges',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'badges',
          title: 'Badges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Badge Image',
                  type: 'image',
                  options: { hotspot: true },
                },
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
                {
                  name: 'link',
                  title: 'Link URL',
                  type: 'url',
                  description: 'Optional link when badge is clicked',
                },
              ],
            },
          ],
        },
      ],
      group: 'features',
    },
    {
      name: 'paymentIcons',
      title: 'Payment Icons',
      type: 'object',
      description: 'Show accepted payment methods',
      fields: [
        {
          name: 'enabled',
          title: 'Show Payment Icons',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'We Accept',
        },
        {
          name: 'methods',
          title: 'Payment Methods',
          type: 'array',
          of: [
            {
              type: 'string',
            },
          ],
          options: {
            list: [
              { title: 'Visa', value: 'visa' },
              { title: 'Mastercard', value: 'mastercard' },
              { title: 'American Express', value: 'amex' },
              { title: 'PayPal', value: 'paypal' },
              { title: 'Apple Pay', value: 'applepay' },
              { title: 'Google Pay', value: 'googlepay' },
            ],
          },
        },
      ],
      group: 'features',
    },
  ],
  preview: {
    select: {
      logo: 'logo',
      columns: 'columns',
    },
    prepare({ logo, columns }) {
      return {
        title: 'Footer Settings',
        subtitle: `${columns?.length || 0} columns configured`,
        media: logo,
      }
    },
  },
})
