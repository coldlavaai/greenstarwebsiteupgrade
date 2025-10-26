import { defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand/Manufacturer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'model',
      title: 'Model Number',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
    {
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Spec Category',
              type: 'string',
              description: 'e.g., "Electrical Characteristics", "Physical Dimensions"',
            },
            {
              name: 'specs',
              title: 'Specifications',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Specification Name',
                      type: 'string',
                    },
                    {
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                    },
                    {
                      name: 'unit',
                      title: 'Unit',
                      type: 'string',
                      description: 'e.g., "W", "V", "kg"',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'warranty',
      title: 'Warranty Information',
      type: 'object',
      fields: [
        {
          name: 'product',
          title: 'Product Warranty',
          type: 'string',
          description: 'e.g., "25 years"',
        },
        {
          name: 'performance',
          title: 'Performance Warranty',
          type: 'string',
          description: 'e.g., "30 years"',
        },
        {
          name: 'details',
          title: 'Warranty Details',
          type: 'text',
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Certifications & Standards',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., IEC62619, CE MARK, UN38.3',
    },
    {
      name: 'compatibility',
      title: 'Compatible Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    },
    {
      name: 'datasheetUrl',
      title: 'Datasheet PDF URL',
      type: 'url',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Optional - for internal reference',
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'images.0',
    },
  },
})
