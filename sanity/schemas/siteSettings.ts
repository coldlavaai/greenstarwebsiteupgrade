import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '⚙️ Site Settings',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  groups: [
    { name: 'identity', title: '🏢 Company Identity', default: true },
    { name: 'contact', title: '📞 Contact Information' },
    { name: 'social', title: '🌐 Social Media' },
    { name: 'seo', title: '🔍 SEO Defaults' },
    { name: 'analytics', title: '📊 Analytics & Tracking' },
    { name: 'legal', title: '⚖️ Legal Information' },
    { name: 'advanced', title: '🔧 Advanced Settings' },
  ],
  fields: [
    // =======================
    // COMPANY IDENTITY
    // =======================
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Your company/website name',
      validation: (Rule) => Rule.required(),
      initialValue: 'Green Star Solar',
      group: 'identity',
    },
    {
      name: 'tagline',
      title: 'Tagline/Slogan',
      type: 'string',
      description: 'Short memorable phrase about your business',
      initialValue: 'Powering Your Future with Clean Energy',
      group: 'identity',
    },
    {
      name: 'description',
      title: 'Company Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'Brief description of your company (used for SEO and about sections)',
      group: 'identity',
    },
    {
      name: 'logo',
      title: 'Logo (Default)',
      type: 'image',
      description: 'Main logo - used on light backgrounds',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the logo for accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'identity',
    },
    {
      name: 'logoLight',
      title: 'Logo (Light/White Version)',
      type: 'image',
      description: 'White/light version - used on dark backgrounds',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'identity',
    },
    {
      name: 'logoDark',
      title: 'Logo (Dark Version)',
      type: 'image',
      description: 'Dark version - used on light/transparent backgrounds',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'identity',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon shown in browser tabs (recommended: 32x32px square)',
      options: {
        hotspot: true,
      },
      group: 'identity',
    },

    // =======================
    // CONTACT INFORMATION
    // =======================
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Primary contact email',
      validation: (Rule) =>
        Rule.custom((email: string | undefined) => {
          if (!email) return true
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(email) || 'Please enter a valid email address'
        }),
      initialValue: 'info@greenstarsolar.co.uk',
      group: 'contact',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Primary contact phone',
      initialValue: '0800 123 4567',
      group: 'contact',
    },
    {
      name: 'phoneAlternate',
      title: 'Alternate Phone Number',
      type: 'string',
      description: 'Secondary contact number (optional)',
      group: 'contact',
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp business number (optional)',
      group: 'contact',
    },
    {
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'street2',
          title: 'Address Line 2',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City/Town',
          type: 'string',
        },
        {
          name: 'county',
          title: 'County/State',
          type: 'string',
        },
        {
          name: 'postcode',
          title: 'Postcode/ZIP',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'United Kingdom',
        },
      ],
      group: 'contact',
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'e.g., "Monday - Friday", "Weekends"',
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., "9:00 AM - 6:00 PM", "Closed"',
            },
          ],
          preview: {
            select: {
              days: 'days',
              hours: 'hours',
            },
            prepare({ days, hours }) {
              return {
                title: days,
                subtitle: hours,
              }
            },
          },
        },
      ],
      group: 'contact',
    },
    {
      name: 'bookingLink',
      title: 'Online Booking Link',
      type: 'url',
      description: 'Link to calendar booking (Cal.com, Calendly, etc.)',
      group: 'contact',
    },

    // =======================
    // SOCIAL MEDIA
    // =======================
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'Full URL to your Facebook page',
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
          description: 'Full URL to your Twitter/X profile',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          description: 'Full URL to your Instagram profile',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'Full URL to your LinkedIn company page',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          description: 'Full URL to your YouTube channel',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          description: 'Full URL to your TikTok profile',
        },
      ],
      group: 'social',
    },

    // =======================
    // SEO DEFAULTS
    // =======================
    {
      name: 'seoDefaults',
      title: 'SEO Default Settings',
      type: 'object',
      description: 'Default SEO values used when page-specific values are not set',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default title for search results (50-60 characters)',
          validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best SEO'),
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          description: 'Default description for search results (150-160 characters)',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
        },
        {
          name: 'ogImage',
          title: 'Default Social Share Image',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Your Twitter handle (e.g., @greenstarsolar)',
        },
      ],
      group: 'seo',
    },
    {
      name: 'siteVerification',
      title: 'Site Verification Codes',
      type: 'object',
      description: 'Verification codes for search engines',
      fields: [
        {
          name: 'google',
          title: 'Google Search Console',
          type: 'string',
          description: 'Google verification meta tag content',
        },
        {
          name: 'bing',
          title: 'Bing Webmaster Tools',
          type: 'string',
          description: 'Bing verification meta tag content',
        },
      ],
      group: 'seo',
    },

    // =======================
    // ANALYTICS & TRACKING
    // =======================
    {
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Format: G-XXXXXXXXXX or UA-XXXXXXXXX-X',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Format: GTM-XXXXXXX',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Your Facebook Pixel ID number',
        },
        {
          name: 'hotjarId',
          title: 'Hotjar Site ID',
          type: 'string',
          description: 'Your Hotjar tracking ID',
        },
      ],
      group: 'analytics',
    },

    // =======================
    // LEGAL INFORMATION
    // =======================
    {
      name: 'legal',
      title: 'Legal Information',
      type: 'object',
      fields: [
        {
          name: 'companyNumber',
          title: 'Company Registration Number',
          type: 'string',
          description: 'Official company registration number',
        },
        {
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string',
          description: 'VAT registration number (if applicable)',
        },
        {
          name: 'registeredAddress',
          title: 'Registered Company Address',
          type: 'text',
          rows: 4,
          description: 'Official registered address (may differ from trading address)',
        },
        {
          name: 'privacyPolicyUrl',
          title: 'Privacy Policy URL',
          type: 'url',
          description: 'Link to your privacy policy page',
        },
        {
          name: 'termsUrl',
          title: 'Terms & Conditions URL',
          type: 'url',
          description: 'Link to your terms and conditions page',
        },
        {
          name: 'cookiePolicyUrl',
          title: 'Cookie Policy URL',
          type: 'url',
          description: 'Link to your cookie policy page',
        },
      ],
      group: 'legal',
    },

    // =======================
    // ADVANCED SETTINGS
    // =======================
    {
      name: 'customScripts',
      title: 'Custom Scripts',
      type: 'object',
      description: 'Add custom JavaScript or tracking codes',
      fields: [
        {
          name: 'headerScripts',
          title: 'Header Scripts',
          type: 'text',
          description: 'Scripts to be injected in the <head> section',
          rows: 5,
        },
        {
          name: 'bodyScripts',
          title: 'Body Scripts',
          type: 'text',
          description: 'Scripts to be injected before closing </body> tag',
          rows: 5,
        },
      ],
      group: 'advanced',
    },
    {
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          description: 'Show maintenance page instead of normal site',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          description: 'Message shown to visitors during maintenance',
        },
      ],
      group: 'advanced',
    },
  ],
  preview: {
    select: {
      siteName: 'siteName',
      email: 'email',
    },
    prepare({ siteName, email }) {
      return {
        title: siteName || 'Site Settings',
        subtitle: email || 'Configure global site settings',
      }
    },
  },
})
