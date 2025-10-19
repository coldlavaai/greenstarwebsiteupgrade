import { defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Projects',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    {
      name: 'position',
      title: 'Gallery Position',
      type: 'number',
      description: 'Position in gallery (1-6). Lower numbers appear first.',
      validation: (Rule) => Rule.required().min(1).max(6).integer(),
      initialValue: 1,
      group: 'settings',
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Name of the installation project',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      description: 'Main project photo. Recommended size: 800x600px or larger.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'media',
    },
    {
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'City or region (e.g., "Manchester, UK")',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'systemSize',
      title: 'System Size',
      type: 'string',
      description: 'System capacity (e.g., "8kW System" or "13.5kWh Battery")',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential Solar', value: 'residential' },
          { title: 'Commercial Solar', value: 'commercial' },
          { title: 'Battery Storage', value: 'battery' },
          { title: 'EV Charging', value: 'ev-charging' },
        ],
      },
      group: 'settings',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional detailed description of the project',
      rows: 3,
      group: 'content',
    },
    {
      name: 'featured',
      title: 'Show in gallery?',
      type: 'boolean',
      description: 'Toggle to show/hide this project on the website',
      initialValue: true,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      position: 'position',
      location: 'location',
      media: 'image',
    },
    prepare({ title, position, location, media }) {
      return {
        title: `Position ${position}: ${title}`,
        subtitle: location,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Gallery Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
})
