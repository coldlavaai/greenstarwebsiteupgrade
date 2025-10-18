import { defineType } from 'sanity'

export const brandTheme = defineType({
  name: 'brandTheme',
  title: 'Brand & Theme Settings',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  fields: [
    {
      name: 'colors',
      title: 'Color Palette',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'color',
          description: 'Main brand color (default: #8cc63f)',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'primaryLight',
          title: 'Primary Light',
          type: 'color',
          description: 'Lighter shade of primary color',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'primaryDark',
          title: 'Primary Dark',
          type: 'color',
          description: 'Darker shade of primary color',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'color',
          description: 'Secondary accent color',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'background',
          title: 'Background Color',
          type: 'color',
          description: 'Main background color',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'text',
          title: 'Text Color',
          type: 'color',
          description: 'Main text color',
          options: {
            disableAlpha: false,
          },
        },
      ],
    },
    {
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        {
          name: 'headingFont',
          title: 'Heading Font',
          type: 'string',
          description: 'Google Font name for headings (e.g., Playfair Display)',
        },
        {
          name: 'bodyFont',
          title: 'Body Font',
          type: 'string',
          description: 'Google Font name for body text (e.g., Inter)',
        },
      ],
    },
    {
      name: 'buttonStyles',
      title: 'Button Styles',
      type: 'object',
      fields: [
        {
          name: 'borderRadius',
          title: 'Border Radius',
          type: 'string',
          description: 'Button corner roundness (e.g., 8px, 12px, 9999px for pill)',
          initialValue: '9999px',
        },
        {
          name: 'primaryButtonBg',
          title: 'Primary Button Background',
          type: 'color',
          description: 'Background color for primary buttons',
          options: {
            disableAlpha: false,
          },
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'color',
          description: 'Text color for primary buttons',
          options: {
            disableAlpha: false,
          },
        },
      ],
    },
    {
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32px recommended)',
    },
  ],
})
