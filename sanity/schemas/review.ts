import { defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Star rating from 1 to 5',
    },
    {
      name: 'platform',
      title: 'Review Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Trustpilot', value: 'trustpilot' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'reviewTitle',
      title: 'Review Title',
      type: 'string',
      description: 'Optional title (common on Trustpilot)',
    },
    {
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
    },
    {
      name: 'systemDetails',
      title: 'System Details',
      type: 'string',
      description: 'e.g., "16 Aiko panels, 6kW Sigenergy inverter, 10kW battery"',
    },
    {
      name: 'keyHighlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main points from the review',
    },
    {
      name: 'customerType',
      title: 'Customer Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
        ],
        layout: 'radio',
      },
      initialValue: 'residential',
    },
    {
      name: 'staffMentioned',
      title: 'Staff Members Mentioned',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Names of staff members praised in the review',
    },
    {
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Display on homepage/featured sections',
      initialValue: false,
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Show on website',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewTitle',
      rating: 'rating',
      platform: 'platform',
    },
    prepare({ title, subtitle, rating, platform }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} - ${stars}`,
        subtitle: `${platform?.toUpperCase() || ''}: ${subtitle || 'Review'}`,
      }
    },
  },
})
