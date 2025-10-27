import { defineType } from 'sanity'

export const galleryGridSection = defineType({
  name: 'galleryGridSection',
  title: '🖼️ Gallery Grid Section',
  type: 'object',
  description: 'Display images in a grid or masonry layout (different from homepage gallery)',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Gallery',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'url',
              description: 'Optional link when image is clicked',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Grid (4 columns)', value: 'grid-4' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel/Slider', value: 'carousel' },
        ],
      },
      initialValue: 'grid-3',
    },
    {
      name: 'imageAspect',
      title: 'Image Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Original', value: 'original' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Portrait (3:4)', value: 'portrait' },
          { title: 'Landscape (4:3)', value: 'landscape' },
          { title: 'Wide (16:9)', value: 'wide' },
        ],
      },
      initialValue: 'square',
    },
    {
      name: 'enableLightbox',
      title: 'Enable Lightbox',
      type: 'boolean',
      description: 'Allow clicking images to view fullscreen',
      initialValue: true,
    },
    {
      name: 'showCaptions',
      title: 'Show Captions',
      type: 'boolean',
      initialValue: true,
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
      images: 'images',
    },
    prepare({ title, images }) {
      return {
        title: title || 'Gallery Grid Section',
        subtitle: `${images?.length || 0} images`,
      }
    },
  },
})
