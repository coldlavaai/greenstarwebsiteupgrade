import { defineType } from 'sanity'

export const videoSection = defineType({
  name: 'videoSection',
  title: '🎥 Video Section',
  type: 'object',
  description: 'Embed videos with optional text content',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Direct URL (MP4)', value: 'direct' },
        ],
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Full URL to the video',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional custom thumbnail image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Video Only (Full Width)', value: 'full' },
          { title: 'Video Left, Text Right', value: 'video-left' },
          { title: 'Text Left, Video Right', value: 'video-right' },
          { title: 'Video Above Text', value: 'video-above' },
          { title: 'Text Above Video', value: 'text-above' },
        ],
      },
      initialValue: 'full',
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Widescreen)', value: '16-9' },
          { title: '4:3 (Standard)', value: '4-3' },
          { title: '1:1 (Square)', value: '1-1' },
          { title: '9:16 (Vertical)', value: '9-16' },
        ],
      },
      initialValue: '16-9',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically play video when in view (muted)',
      initialValue: false,
    },
    {
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      initialValue: false,
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
          { title: 'None', value: 'none' },
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
      videoType: 'videoType',
      videoUrl: 'videoUrl',
    },
    prepare({ title, videoType, videoUrl }) {
      return {
        title: title || 'Video Section',
        subtitle: `${videoType}: ${videoUrl || 'No URL'}`,
      }
    },
  },
})
