export const resolve = {
  locations: {
    // ===================================
    // SETTINGS (Global)
    // ===================================
    siteSettings: {
      select: {
        title: 'companyName',
      },
      resolve: () => ({
        locations: [
          {
            title: 'All Pages (Global Settings)',
            href: '/',
          },
        ],
      }),
    },
    themeSettings: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'All Pages (Theme)',
            href: '/',
          },
        ],
      }),
    },
    brandTheme: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'All Pages (Branding)',
            href: '/',
          },
        ],
      }),
    },
    emailSettings: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Email Notifications',
            href: '/studio',
          },
        ],
      }),
    },

    // ===================================
    // HOMEPAGE SECTIONS (Singletons)
    // ===================================
    navigationSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'All Pages (Navigation)',
            href: '/',
          },
        ],
      }),
    },
    heroSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Hero',
            href: '/',
          },
        ],
      }),
    },
    aboutSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - About',
            href: '/#about',
          },
        ],
      }),
    },
    systemsSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Systems',
            href: '/#systems',
          },
        ],
      }),
    },
    processSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Process',
            href: '/#process',
          },
        ],
      }),
    },
    testimonialsSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Testimonials',
            href: '/#testimonials',
          },
        ],
      }),
    },
    gallerySection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Gallery',
            href: '/#gallery',
          },
        ],
      }),
    },
    contactSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Contact',
            href: '/#contact',
          },
        ],
      }),
    },
    footerSection: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'All Pages (Footer)',
            href: '/',
          },
        ],
      }),
    },

    // ===================================
    // CONTENT ITEMS (Multiple Instances)
    // ===================================
    service: {
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug
        return {
          locations: [
            {
              title: 'Homepage - Systems Section',
              href: '/#systems',
            },
            ...(slug
              ? [
                  {
                    title: 'System Page',
                    href: `/${slug}`,
                  },
                ]
              : []),
          ],
        }
      },
    },
    testimonial: {
      select: {
        customerName: 'customerName',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Testimonials',
            href: '/#testimonials',
          },
        ],
      }),
    },
    galleryItem: {
      select: {
        projectTitle: 'projectTitle',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Gallery',
            href: '/#gallery',
          },
        ],
      }),
    },
    processStep: {
      select: {
        title: 'title',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Homepage - Process',
            href: '/#process',
          },
        ],
      }),
    },

    // ===================================
    // SYSTEM PAGES (Product Pages)
    // ===================================
    systemPage: {
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug || 'system'
        return {
          locations: [
            {
              title: doc?.title || 'System Page',
              href: `/${slug}`,
            },
          ],
        }
      },
    },

    // ===================================
    // PAGE BUILDER (Custom Pages)
    // ===================================
    page: {
      select: {
        title: 'title',
        slug: 'slug.current',
        status: 'status',
      },
      resolve: (doc) => {
        const slug = doc?.slug || 'page'
        const status = doc?.status || 'draft'

        if (status === 'archived') {
          return {
            locations: [
              {
                title: '⚠️ Page Archived',
                href: '#',
              },
            ],
          }
        }

        return {
          locations: [
            {
              title: doc?.title || 'Custom Page',
              href: `/${slug}`,
            },
          ],
        }
      },
    },

    // ===================================
    // KNOWLEDGE BASE
    // ===================================
    productCategory: {
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug || 'category'
        return {
          locations: [
            {
              title: 'Knowledge Base Category',
              href: `/kb/category/${slug}`,
            },
          ],
        }
      },
    },
    product: {
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug || 'product'
        return {
          locations: [
            {
              title: 'Knowledge Base Product',
              href: `/kb/product/${slug}`,
            },
          ],
        }
      },
    },
    knowledgeBase: {
      select: {
        question: 'question',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Knowledge Base',
            href: '/kb',
          },
        ],
      }),
    },
    faq: {
      select: {
        question: 'question',
      },
      resolve: () => ({
        locations: [
          {
            title: 'FAQ Section',
            href: '/#faq',
          },
        ],
      }),
    },
    review: {
      select: {
        customerName: 'customerName',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Reviews',
            href: '/#reviews',
          },
        ],
      }),
    },
    companyInfo: {
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Company Information',
            href: '/about',
          },
        ],
      }),
    },

    // ===================================
    // FORM SUBMISSIONS & LEADS
    // ===================================
    formSubmission: {
      select: {
        name: 'name',
        submittedAt: 'submittedAt',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Form Submissions (Studio)',
            href: '/studio',
          },
        ],
      }),
    },
  },
}
