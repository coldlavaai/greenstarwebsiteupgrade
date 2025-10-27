import { defineType } from 'sanity'

export const contactMapSection = defineType({
  name: 'contactMapSection',
  title: '📍 Contact + Map Section',
  type: 'object',
  description: 'Display contact information alongside a map',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Visit Us',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'text',
          rows: 4,
          description: 'e.g., Mon-Fri: 9am-5pm',
        },
      ],
    },
    {
      name: 'mapType',
      title: 'Map Type',
      type: 'string',
      options: {
        list: [
          { title: 'Google Maps Embed', value: 'google' },
          { title: 'OpenStreetMap Embed', value: 'osm' },
          { title: 'Static Image', value: 'image' },
          { title: 'No Map', value: 'none' },
        ],
      },
      initialValue: 'google',
    },
    {
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Full iframe embed URL from Google Maps or other service',
      hidden: ({ parent }) => parent?.mapType === 'image' || parent?.mapType === 'none',
    },
    {
      name: 'mapImage',
      title: 'Map Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mapType !== 'image',
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'For custom map implementations',
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'For custom map implementations',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Map Left, Contact Right', value: 'map-left' },
          { title: 'Contact Left, Map Right', value: 'contact-left' },
          { title: 'Map Above Contact', value: 'map-above' },
          { title: 'Contact Above Map', value: 'contact-above' },
        ],
      },
      initialValue: 'map-left',
    },
    {
      name: 'showDirectionsLink',
      title: 'Show "Get Directions" Link',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'directionsUrl',
      title: 'Directions URL',
      type: 'url',
      description: 'Optional custom URL for directions (default: auto-generated)',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },
  ],
  preview: {
    select: {
      title: 'title',
      mapType: 'mapType',
    },
    prepare({ title, mapType }) {
      return {
        title: title || 'Contact + Map Section',
        subtitle: `Map: ${mapType || 'none'}`,
      }
    },
  },
})
