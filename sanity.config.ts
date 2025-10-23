import React from 'react'
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
                    singletonItem(S, 'emailSettings', 'Email Notifications'),
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

            // Form Submissions
            S.listItem()
              .title('📬 Form Submissions')
              .child(
                S.documentTypeList('formSubmission')
                  .title('Contact Form Leads')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),

            S.divider(),

            // DBR Dashboard
            S.listItem()
              .title('🔥 DBR Dashboard (Database Recovery)')
              .child(
                S.list()
                  .title('DBR Leads Dashboard')
                  .items([
                    // Analytics Link
                    S.listItem()
                      .title('📊 View Analytics Dashboard')
                      .icon(() => '📊')
                      .child(
                        S.component(() => (
                          <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>DBR Analytics Dashboard</h2>
                            <p style={{ marginBottom: '2rem', color: '#666' }}>
                              View detailed analytics, metrics, and charts for your DBR campaigns
                            </p>
                            <a
                              href="/dbr-analytics"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                padding: '1rem 2rem',
                                background: '#2563eb',
                                color: 'white',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                fontWeight: '600',
                              }}
                            >
                              Open Analytics Dashboard →
                            </a>
                          </div>
                        )).title('Analytics Dashboard')
                      ),

                    S.divider(),

                    // Hot Leads
                    S.listItem()
                      .title('🔥 HOT LEADS - Ready to Convert')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('Hot Leads')
                          .filter('contactStatus == "HOT"')
                          .defaultOrdering([{ field: 'replyReceived', direction: 'desc' }])
                      ),

                    // Positive Leads
                    S.listItem()
                      .title('✅ POSITIVE - Interested')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('Positive Leads')
                          .filter('contactStatus == "POSITIVE"')
                          .defaultOrdering([{ field: 'replyReceived', direction: 'desc' }])
                      ),

                    // Awaiting Reply
                    S.listItem()
                      .title('⏳ AWAITING REPLY - Messages Sent')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('Awaiting Reply')
                          .filter('contactStatus in ["Sent_1", "Sent_2", "Sent_3"]')
                          .defaultOrdering([{ field: 'm1Sent', direction: 'desc' }])
                      ),

                    // Scheduled/Converted
                    S.listItem()
                      .title('📅 SCHEDULED & CONVERTED')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('Scheduled & Converted')
                          .filter('contactStatus in ["SCHEDULED", "CONVERTED"]')
                          .defaultOrdering([{ field: 'installDate', direction: 'asc' }])
                      ),

                    S.divider(),

                    // Negative/Removed
                    S.listItem()
                      .title('❌ NEGATIVE & REMOVED')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('Negative & Removed')
                          .filter('contactStatus in ["NEGATIVE", "REMOVED"]')
                          .defaultOrdering([{ field: 'replyReceived', direction: 'desc' }])
                      ),

                    S.divider(),

                    // All DBR Leads
                    S.listItem()
                      .title('📊 ALL DBR LEADS')
                      .child(
                        S.documentTypeList('dbrLead')
                          .title('All DBR Leads')
                          .defaultOrdering([{ field: 'replyReceived', direction: 'desc' }])
                      ),
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
