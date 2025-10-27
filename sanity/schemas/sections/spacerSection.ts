import { defineType } from 'sanity'

export const spacerSection = defineType({
  name: 'spacerSection',
  title: '📏 Spacer',
  type: 'object',
  fields: [
    {
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small (24px)', value: 'small' },
          { title: 'Medium (48px)', value: 'medium' },
          { title: 'Large (96px)', value: 'large' },
          { title: 'XL (144px)', value: 'xl' },
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'showDivider',
      title: 'Show Divider Line',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      height: 'height',
      showDivider: 'showDivider',
    },
    prepare({ height, showDivider }) {
      return {
        title: 'Spacer',
        subtitle: `${height}${showDivider ? ' with divider' : ''}`,
      }
    },
  },
})
