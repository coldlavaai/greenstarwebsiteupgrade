import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemas'
import { resolve } from './sanity/resolve'

// Helper to create singleton document items
const singletonItem = (S: any, typeName: string, title?: string) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
    )

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
              .title('⚙️ Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    singletonItem(S, 'siteSettings', 'Site Settings'),
                    singletonItem(S, 'brandTheme', 'Brand & Theme'),
                  ])
              ),

            S.divider(),

            // Page Sections Group
            S.listItem()
              .title('📄 Page Sections')
              .child(
                S.list()
                  .title('Page Sections')
                  .items([
                    singletonItem(S, 'navigationSection', 'Navigation'),
                    singletonItem(S, 'heroSection', 'Hero Section'),
                    singletonItem(S, 'aboutSection', 'About Section'),
                    singletonItem(S, 'systemsSection', 'Systems Section'),
                    singletonItem(S, 'processSection', 'Process Section'),
                    singletonItem(S, 'testimonialsSection', 'Testimonials Section'),
                    singletonItem(S, 'gallerySection', 'Gallery Section'),
                    singletonItem(S, 'contactSection', 'Contact Section'),
                    singletonItem(S, 'footerSection', 'Footer'),
                  ])
              ),

            S.divider(),

            // Content Items
            S.documentTypeListItem('service').title('🔧 Services/Systems'),
            S.documentTypeListItem('testimonial').title('⭐ Testimonials'),
            S.documentTypeListItem('galleryItem').title('🖼️ Gallery Items'),
            S.documentTypeListItem('processStep').title('📋 Process Steps'),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio', // Path where Sanity Studio will be accessible
})
