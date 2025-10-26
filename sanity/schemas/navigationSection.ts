import { defineType } from 'sanity'

export const navigationSection = defineType({
  name: 'navigationSection',
  title: '🧭 Navigation',
  type: 'document',
  // @ts-ignore
  __experimental_singleton: true,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'styling', title: 'Styling' },
    { name: 'behavior', title: 'Behavior' },
    { name: 'mobile', title: 'Mobile Menu' },
  ],
  fields: [
    // =======================
    // CONTENT
    // =======================
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo shown in the navigation bar',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the logo for accessibility',
          initialValue: 'Company Logo',
        },
      ],
      group: 'content',
    },
    {
      name: 'logoLink',
      title: 'Logo Link',
      type: 'string',
      description: 'Where should clicking the logo go? (usually "/")',
      initialValue: '/',
      group: 'content',
    },
    {
      name: 'logoHeight',
      title: 'Logo Height',
      type: 'number',
      description: 'Logo height in pixels',
      initialValue: 40,
      validation: (Rule) => Rule.min(20).max(120),
      group: 'content',
    },

    // Navigation Items
    {
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      description: 'Main navigation menu items. Drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Text shown in the menu',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL or anchor link (e.g., "#about", "/solar-panels-home")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon name (from Lucide icons)',
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              description: 'Open this link in a new browser tab',
              initialValue: false,
            },
            {
              name: 'dropdown',
              title: 'Dropdown Menu',
              type: 'array',
              description: 'Add sub-items to create a dropdown menu',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                      description: 'Optional short description shown in mega menu',
                    },
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'image',
                      description: 'Optional icon/image for this item',
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'description',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              label: 'label',
              link: 'link',
              hasDropdown: 'dropdown',
            },
            prepare({ label, link, hasDropdown }) {
              return {
                title: label,
                subtitle: hasDropdown?.length > 0 ? `${link} (${hasDropdown.length} sub-items)` : link,
                media: hasDropdown?.length > 0 ? () => '📁' : () => '🔗',
              }
            },
          },
        },
      ],
      group: 'content',
    },

    // CTA Button
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'Call-to-action button in the navigation',
      fields: [
        {
          name: 'show',
          title: 'Show CTA Button',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Free Quote',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '#contact',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Filled)', value: 'primary' },
              { title: 'Secondary (Outline)', value: 'secondary' },
              { title: 'Ghost (Text Only)', value: 'ghost' },
            ],
          },
          initialValue: 'primary',
        },
        {
          name: 'icon',
          title: 'Button Icon',
          type: 'string',
          description: 'Optional icon name',
        },
      ],
      group: 'content',
    },

    // =======================
    // STYLING
    // =======================
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Navigation bar background color',
      group: 'styling',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      description: 'Color for navigation links',
      group: 'styling',
    },
    {
      name: 'activeTextColor',
      title: 'Active/Hover Text Color',
      type: 'color',
      description: 'Color when hovering or on active page',
      group: 'styling',
    },
    {
      name: 'transparentOnTop',
      title: 'Transparent When At Top',
      type: 'boolean',
      description: 'Make navigation transparent when at the top of the page',
      initialValue: false,
      group: 'styling',
    },
    {
      name: 'blurEffect',
      title: 'Blur/Glassmorphism Effect',
      type: 'boolean',
      description: 'Add a frosted glass blur effect to the background',
      initialValue: true,
      group: 'styling',
    },
    {
      name: 'shadow',
      title: 'Shadow',
      type: 'string',
      description: 'Navigation bar shadow',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
      group: 'styling',
    },
    {
      name: 'borderBottom',
      title: 'Bottom Border',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Show Bottom Border',
          type: 'boolean',
          initialValue: false,
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

    // =======================
    // BEHAVIOR
    // =======================
    {
      name: 'sticky',
      title: 'Sticky Navigation',
      type: 'boolean',
      description: 'Keep navigation visible when scrolling down',
      initialValue: true,
      group: 'behavior',
    },
    {
      name: 'stickyOffset',
      title: 'Sticky Offset',
      type: 'number',
      description: 'Distance from top before becoming sticky (pixels)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(200),
      group: 'behavior',
    },
    {
      name: 'hideOnScroll',
      title: 'Hide When Scrolling Down',
      type: 'boolean',
      description: 'Hide navigation when scrolling down, show when scrolling up',
      initialValue: false,
      group: 'behavior',
    },
    {
      name: 'smoothScroll',
      title: 'Smooth Scroll to Anchors',
      type: 'boolean',
      description: 'Smoothly scroll to anchor links (#about, #contact, etc.)',
      initialValue: true,
      group: 'behavior',
    },
    {
      name: 'closeOnClick',
      title: 'Close Menu on Click',
      type: 'boolean',
      description: 'Automatically close menu when a link is clicked',
      initialValue: true,
      group: 'behavior',
    },

    // =======================
    // MOBILE MENU
    // =======================
    {
      name: 'mobileBreakpoint',
      title: 'Mobile Breakpoint',
      type: 'number',
      description: 'Show mobile menu below this width (pixels)',
      initialValue: 768,
      group: 'mobile',
    },
    {
      name: 'mobileMenuStyle',
      title: 'Mobile Menu Style',
      type: 'string',
      options: {
        list: [
          { title: 'Slide from Right', value: 'slide-right' },
          { title: 'Slide from Left', value: 'slide-left' },
          { title: 'Slide from Top', value: 'slide-top' },
          { title: 'Full Screen Overlay', value: 'fullscreen' },
        ],
      },
      initialValue: 'slide-right',
      group: 'mobile',
    },
    {
      name: 'mobileMenuBg',
      title: 'Mobile Menu Background',
      type: 'color',
      description: 'Background color for mobile menu',
      group: 'mobile',
    },
    {
      name: 'mobileMenuTextColor',
      title: 'Mobile Menu Text Color',
      type: 'color',
      description: 'Text color for mobile menu items',
      group: 'mobile',
    },
    {
      name: 'hamburgerIcon',
      title: 'Hamburger Icon Style',
      type: 'string',
      options: {
        list: [
          { title: '☰ Classic (3 lines)', value: 'classic' },
          { title: '⋮ Dots (3 dots)', value: 'dots' },
          { title: '✕ Cross to X', value: 'cross' },
        ],
      },
      initialValue: 'classic',
      group: 'mobile',
    },
    {
      name: 'showLogoInMobile',
      title: 'Show Logo in Mobile Menu',
      type: 'boolean',
      initialValue: true,
      group: 'mobile',
    },
  ],
  preview: {
    select: {
      logo: 'logo',
      itemsCount: 'navItems',
    },
    prepare({ logo, itemsCount }) {
      return {
        title: 'Navigation Settings',
        subtitle: `${itemsCount?.length || 0} menu items`,
        media: logo,
      }
    },
  },
})
