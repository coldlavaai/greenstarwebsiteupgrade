import { defineType } from 'sanity'

export const themeSettings = defineType({
  name: 'themeSettings',
  title: '🎨 Theme Settings',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  groups: [
    { name: 'colors', title: '🎨 Colors', default: true },
    { name: 'typography', title: '✍️ Typography' },
    { name: 'spacing', title: '📏 Spacing' },
    { name: 'effects', title: '✨ Effects' },
    { name: 'layout', title: '📐 Layout' },
  ],
  fields: [
    // ======================
    // COLORS
    // ======================
    {
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'object',
      description: 'Your main brand colors used throughout the site',
      group: 'colors',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'color',
          description: 'Main brand color (buttons, links, accents)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'primaryLight',
          title: 'Primary Light',
          type: 'color',
          description: 'Lighter variant for gradients and hover states',
        },
        {
          name: 'primaryDark',
          title: 'Primary Dark',
          type: 'color',
          description: 'Darker variant for shadows and depth',
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'color',
          description: 'Secondary accent color',
        },
        {
          name: 'accent',
          title: 'Accent Color',
          type: 'color',
          description: 'Additional accent for highlights',
        },
      ],
    },
    {
      name: 'backgroundColors',
      title: 'Background Colors',
      type: 'object',
      group: 'colors',
      fields: [
        {
          name: 'body',
          title: 'Body Background',
          type: 'color',
          description: 'Main site background color',
        },
        {
          name: 'surface',
          title: 'Surface/Card Background',
          type: 'color',
          description: 'Background for cards and elevated surfaces',
        },
        {
          name: 'surfaceLight',
          title: 'Surface Light',
          type: 'color',
        },
        {
          name: 'surfaceDark',
          title: 'Surface Dark',
          type: 'color',
        },
      ],
    },
    {
      name: 'textColors',
      title: 'Text Colors',
      type: 'object',
      group: 'colors',
      fields: [
        {
          name: 'primary',
          title: 'Primary Text',
          type: 'color',
          description: 'Main text color for body content',
        },
        {
          name: 'secondary',
          title: 'Secondary Text',
          type: 'color',
          description: 'Muted text for less emphasis',
        },
        {
          name: 'light',
          title: 'Light Text',
          type: 'color',
          description: 'Text on dark backgrounds',
        },
        {
          name: 'dark',
          title: 'Dark Text',
          type: 'color',
          description: 'Text on light backgrounds',
        },
      ],
    },
    {
      name: 'utilityColors',
      title: 'Utility Colors',
      type: 'object',
      group: 'colors',
      fields: [
        {
          name: 'success',
          title: 'Success Color',
          type: 'color',
          description: 'For success messages and positive actions',
        },
        {
          name: 'warning',
          title: 'Warning Color',
          type: 'color',
          description: 'For warnings and cautions',
        },
        {
          name: 'error',
          title: 'Error Color',
          type: 'color',
          description: 'For errors and destructive actions',
        },
        {
          name: 'info',
          title: 'Info Color',
          type: 'color',
          description: 'For informational messages',
        },
      ],
    },

    // ======================
    // TYPOGRAPHY
    // ======================
    {
      name: 'fontFamilies',
      title: 'Font Families',
      type: 'object',
      description: 'Select fonts for different text types',
      group: 'typography',
      fields: [
        {
          name: 'heading',
          title: 'Heading Font',
          type: 'string',
          description: 'Font for all headings (h1, h2, h3, etc.)',
          options: {
            list: [
              { title: 'Inter', value: 'Inter, sans-serif' },
              { title: 'Poppins', value: 'Poppins, sans-serif' },
              { title: 'Montserrat', value: 'Montserrat, sans-serif' },
              { title: 'Roboto', value: 'Roboto, sans-serif' },
              { title: 'Open Sans', value: 'Open Sans, sans-serif' },
              { title: 'Lato', value: 'Lato, sans-serif' },
              { title: 'Raleway', value: 'Raleway, sans-serif' },
              { title: 'Playfair Display', value: 'Playfair Display, serif' },
              { title: 'Merriweather', value: 'Merriweather, serif' },
            ],
          },
          initialValue: 'Inter, sans-serif',
        },
        {
          name: 'body',
          title: 'Body Font',
          type: 'string',
          description: 'Font for body text and paragraphs',
          options: {
            list: [
              { title: 'Inter', value: 'Inter, sans-serif' },
              { title: 'Poppins', value: 'Poppins, sans-serif' },
              { title: 'Montserrat', value: 'Montserrat, sans-serif' },
              { title: 'Roboto', value: 'Roboto, sans-serif' },
              { title: 'Open Sans', value: 'Open Sans, sans-serif' },
              { title: 'Lato', value: 'Lato, sans-serif' },
              { title: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
            ],
          },
          initialValue: 'Inter, sans-serif',
        },
        {
          name: 'mono',
          title: 'Monospace Font',
          type: 'string',
          description: 'Font for code and technical content',
          options: {
            list: [
              { title: 'Fira Code', value: 'Fira Code, monospace' },
              { title: 'JetBrains Mono', value: 'JetBrains Mono, monospace' },
              { title: 'Courier New', value: 'Courier New, monospace' },
            ],
          },
          initialValue: 'Fira Code, monospace',
        },
      ],
    },
    {
      name: 'fontSizes',
      title: 'Font Sizes',
      type: 'object',
      description: 'Base font size and scale',
      group: 'typography',
      fields: [
        {
          name: 'base',
          title: 'Base Font Size',
          type: 'number',
          description: 'Base size in pixels (typically 16px)',
          initialValue: 16,
          validation: (Rule) => Rule.min(12).max(24),
        },
        {
          name: 'scale',
          title: 'Type Scale Ratio',
          type: 'number',
          description: 'Multiplier for heading sizes (1.25 = Major Third, 1.333 = Perfect Fourth)',
          initialValue: 1.25,
          validation: (Rule) => Rule.min(1.1).max(1.6),
        },
      ],
    },
    {
      name: 'fontWeights',
      title: 'Font Weights',
      type: 'object',
      group: 'typography',
      fields: [
        {
          name: 'light',
          title: 'Light',
          type: 'number',
          initialValue: 300,
          options: {
            list: [
              { title: '100 - Thin', value: 100 },
              { title: '200 - Extra Light', value: 200 },
              { title: '300 - Light', value: 300 },
            ],
          },
        },
        {
          name: 'normal',
          title: 'Normal',
          type: 'number',
          initialValue: 400,
          options: {
            list: [{ title: '400 - Normal', value: 400 }],
          },
        },
        {
          name: 'medium',
          title: 'Medium',
          type: 'number',
          initialValue: 500,
          options: {
            list: [{ title: '500 - Medium', value: 500 }],
          },
        },
        {
          name: 'semibold',
          title: 'Semibold',
          type: 'number',
          initialValue: 600,
          options: {
            list: [{ title: '600 - Semibold', value: 600 }],
          },
        },
        {
          name: 'bold',
          title: 'Bold',
          type: 'number',
          initialValue: 700,
          options: {
            list: [
              { title: '700 - Bold', value: 700 },
              { title: '800 - Extra Bold', value: 800 },
              { title: '900 - Black', value: 900 },
            ],
          },
        },
      ],
    },
    {
      name: 'lineHeights',
      title: 'Line Heights',
      type: 'object',
      group: 'typography',
      fields: [
        {
          name: 'tight',
          title: 'Tight',
          type: 'number',
          initialValue: 1.25,
          description: 'For headings and tight text',
        },
        {
          name: 'normal',
          title: 'Normal',
          type: 'number',
          initialValue: 1.5,
          description: 'For body text',
        },
        {
          name: 'relaxed',
          title: 'Relaxed',
          type: 'number',
          initialValue: 1.75,
          description: 'For improved readability',
        },
        {
          name: 'loose',
          title: 'Loose',
          type: 'number',
          initialValue: 2,
          description: 'For very spacious text',
        },
      ],
    },

    // ======================
    // SPACING
    // ======================
    {
      name: 'spacingUnit',
      title: 'Spacing Unit',
      type: 'number',
      description: 'Base spacing unit in pixels (typically 8px). All spacing scales from this.',
      initialValue: 8,
      validation: (Rule) => Rule.min(4).max(16),
      group: 'spacing',
    },
    {
      name: 'spacingScale',
      title: 'Spacing Scale',
      type: 'array',
      description: 'Multipliers for the base spacing unit',
      of: [{ type: 'number' }],
      initialValue: [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32],
      group: 'spacing',
    },

    // ======================
    // EFFECTS
    // ======================
    {
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'object',
      description: 'Corner rounding for buttons, cards, etc.',
      group: 'effects',
      fields: [
        {
          name: 'small',
          title: 'Small',
          type: 'string',
          initialValue: '0.25rem',
        },
        {
          name: 'medium',
          title: 'Medium',
          type: 'string',
          initialValue: '0.5rem',
        },
        {
          name: 'large',
          title: 'Large',
          type: 'string',
          initialValue: '1rem',
        },
        {
          name: 'xl',
          title: 'Extra Large',
          type: 'string',
          initialValue: '1.5rem',
        },
        {
          name: 'full',
          title: 'Full (Pill)',
          type: 'string',
          initialValue: '9999px',
        },
      ],
    },
    {
      name: 'shadows',
      title: 'Shadows',
      type: 'object',
      description: 'Shadow effects for depth and elevation',
      group: 'effects',
      fields: [
        {
          name: 'small',
          title: 'Small',
          type: 'string',
          initialValue: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
        {
          name: 'medium',
          title: 'Medium',
          type: 'string',
          initialValue: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        {
          name: 'large',
          title: 'Large',
          type: 'string',
          initialValue: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
        {
          name: 'xl',
          title: 'Extra Large',
          type: 'string',
          initialValue: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        {
          name: '2xl',
          title: '2X Large',
          type: 'string',
          initialValue: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      ],
    },
    {
      name: 'animations',
      title: 'Animations',
      type: 'object',
      description: 'Animation speeds and easing',
      group: 'effects',
      fields: [
        {
          name: 'durationFast',
          title: 'Fast Duration',
          type: 'number',
          description: 'Milliseconds',
          initialValue: 150,
        },
        {
          name: 'durationNormal',
          title: 'Normal Duration',
          type: 'number',
          description: 'Milliseconds',
          initialValue: 300,
        },
        {
          name: 'durationSlow',
          title: 'Slow Duration',
          type: 'number',
          description: 'Milliseconds',
          initialValue: 500,
        },
        {
          name: 'easing',
          title: 'Easing Function',
          type: 'string',
          options: {
            list: [
              { title: 'Ease (Default)', value: 'ease' },
              { title: 'Ease In', value: 'ease-in' },
              { title: 'Ease Out', value: 'ease-out' },
              { title: 'Ease In Out', value: 'ease-in-out' },
              { title: 'Linear', value: 'linear' },
            ],
          },
          initialValue: 'ease-in-out',
        },
      ],
    },

    // ======================
    // LAYOUT
    // ======================
    {
      name: 'containerMaxWidth',
      title: 'Container Max Width',
      type: 'string',
      description: 'Maximum width for content containers',
      initialValue: '1280px',
      options: {
        list: [
          { title: '1024px - Compact', value: '1024px' },
          { title: '1280px - Standard', value: '1280px' },
          { title: '1440px - Wide', value: '1440px' },
          { title: '1920px - Full HD', value: '1920px' },
          { title: '100% - Full Width', value: '100%' },
        ],
      },
      group: 'layout',
    },
    {
      name: 'breakpoints',
      title: 'Responsive Breakpoints',
      type: 'object',
      description: 'Screen size breakpoints for responsive design',
      group: 'layout',
      fields: [
        {
          name: 'sm',
          title: 'Small (Mobile)',
          type: 'string',
          initialValue: '640px',
        },
        {
          name: 'md',
          title: 'Medium (Tablet)',
          type: 'string',
          initialValue: '768px',
        },
        {
          name: 'lg',
          title: 'Large (Laptop)',
          type: 'string',
          initialValue: '1024px',
        },
        {
          name: 'xl',
          title: 'Extra Large (Desktop)',
          type: 'string',
          initialValue: '1280px',
        },
        {
          name: '2xl',
          title: '2X Large (Wide Screen)',
          type: 'string',
          initialValue: '1536px',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Theme Settings',
        subtitle: 'Global colors, typography, spacing & effects',
      }
    },
  },
})
