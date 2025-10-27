import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: '📄 Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // =======================
    // CONTENT
    // =======================
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The title of this page',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page (e.g., /about-us)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Drag and drop to reorder sections. Click + to add new sections.',
      of: [
        // Reference to section types
        { type: 'heroSectionObject' },
        { type: 'contentSection' },
        { type: 'ctaSection' },
        { type: 'gridSection' },
        { type: 'imageTextSection' },
        { type: 'faqSection' },
        { type: 'formSection' },
        { type: 'spacerSection' },
      ],
      group: 'content',
    },

    // =======================
    // SEO
    // =======================
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings for this page',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title shown in search results (50-60 characters)',
          validation: (Rule) =>
            Rule.max(60).warning('Keep under 60 characters for best SEO'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description shown in search results (150-160 characters)',
          validation: (Rule) =>
            Rule.max(160).warning('Keep under 160 characters for best SEO'),
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional: Specify the preferred URL if this page has duplicates',
        },
      ],
      group: 'seo',
    },

    // =======================
    // SETTINGS
    // =======================
    {
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Automatically add this page to the main navigation',
      initialValue: false,
      group: 'settings',
    },
    {
      name: 'showInFooter',
      title: 'Show in Footer',
      type: 'boolean',
      description: 'Automatically add this page to the footer',
      initialValue: false,
      group: 'settings',
    },
    {
      name: 'navigationOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Order in navigation (lower numbers appear first)',
      initialValue: 99,
      group: 'settings',
    },
    {
      name: 'requiresAuth',
      title: 'Requires Authentication',
      type: 'boolean',
      description: 'Require users to be logged in to view this page',
      initialValue: false,
      group: 'settings',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this page was published',
      initialValue: new Date().toISOString(),
      group: 'settings',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      status: 'status',
      sections: 'sections',
    },
    prepare({ title, slug, status, sections }) {
      return {
        title: title,
        subtitle: `/${slug || ''} | ${status || 'draft'} | ${sections?.length || 0} sections`,
        media: () => '📄',
      }
    },
  },
})
