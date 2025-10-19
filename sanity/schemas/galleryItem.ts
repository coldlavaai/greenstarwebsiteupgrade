import { defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      description: 'Upload a custom project image here. If not uploaded, a default placeholder will be used based on the project title.',
      options: {
        hotspot: true,
      },
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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Project Location',
      type: 'string',
    },
    {
      name: 'systemSize',
      title: 'System Size',
      type: 'string',
      description: 'E.g., "6kW system"',
    },
    {
      name: 'featured',
      title: 'Show in gallery?',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
