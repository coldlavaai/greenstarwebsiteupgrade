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

            // Website Content Group
            S.listItem()
              .title('🌐 Website Content')
              .child(
                S.list()
                  .title('Website Content')
                  .items([
                    S.listItem()
                      .title('☀️ Systems & Services')
                      .child(
                        S.documentTypeList('service')
                          .title('Systems & Services')
                          .defaultOrdering([{ field: 'position', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('🖼️ Gallery Projects')
                      .child(
                        S.documentTypeList('galleryItem')
                          .title('Gallery Projects (Positions 1-6)')
                          .defaultOrdering([{ field: 'position', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('⭐ Customer Testimonials')
                      .child(
                        S.documentTypeList('testimonial')
                          .title('Customer Testimonials')
                          .defaultOrdering([{ field: 'position', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('📋 Process Steps')
                      .child(
                        S.documentTypeList('processStep')
                          .title('Process Steps')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                  ])
              ),
          ]),
      defaultDocumentNode: (S) => {
        return S.document().views([
          S.view.form(),
          S.view.component(() => null).title('Presentation').id('presentation')
        ])
      }
    }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
        previewMode: {
          enable: '/api/draft?secret=greenstar-preview-2024-secure-token',
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
