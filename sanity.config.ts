import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Green Star Solar',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Settings Group
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.documentListItem()
                      .schemaType('siteSettings')
                      .title('Site Settings'),
                    S.documentListItem()
                      .schemaType('brandTheme')
                      .title('Brand & Theme'),
                  ])
              ),

            S.divider(),

            // Page Sections Group
            S.listItem()
              .title('Page Sections')
              .child(
                S.list()
                  .title('Page Sections')
                  .items([
                    S.documentListItem()
                      .schemaType('navigationSection')
                      .title('Navigation'),
                    S.documentListItem()
                      .schemaType('heroSection')
                      .title('Hero Section'),
                    S.documentListItem()
                      .schemaType('aboutSection')
                      .title('About Section'),
                    S.documentListItem()
                      .schemaType('systemsSection')
                      .title('Systems Section'),
                    S.documentListItem()
                      .schemaType('processSection')
                      .title('Process Section'),
                    S.documentListItem()
                      .schemaType('testimonialsSection')
                      .title('Testimonials Section'),
                    S.documentListItem()
                      .schemaType('gallerySection')
                      .title('Gallery Section'),
                    S.documentListItem()
                      .schemaType('contactSection')
                      .title('Contact Section'),
                    S.documentListItem()
                      .schemaType('footerSection')
                      .title('Footer'),
                  ])
              ),

            S.divider(),

            // Content Items
            S.documentTypeListItem('service').title('Services/Systems'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('galleryItem').title('Gallery Items'),
            S.documentTypeListItem('processStep').title('Process Steps'),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio', // Path where Sanity Studio will be accessible
})
