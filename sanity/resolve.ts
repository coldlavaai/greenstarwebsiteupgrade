export const resolve = {
  locations: {
    // Singleton sections that appear on the homepage
    siteSettings: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: doc?.title || 'Site Settings',
            href: '/',
          },
        ],
      }),
    },
    brandTheme: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Brand Theme - Homepage',
            href: '/',
          },
        ],
      }),
    },
    heroSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Hero Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    aboutSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'About Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    systemsSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Systems Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    processSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Process Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    testimonialsSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Testimonials Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    gallerySection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Gallery Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    contactSection: {
      select: {
        title: 'heading',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Contact Section - Homepage',
            href: '/',
          },
        ],
      }),
    },
    navigationSection: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Navigation - Homepage',
            href: '/',
          },
        ],
      }),
    },
    footerSection: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: 'Footer - Homepage',
            href: '/',
          },
        ],
      }),
    },
    // Individual content items
    service: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: `${doc?.title} - Homepage`,
            href: '/',
          },
        ],
      }),
    },
    testimonial: {
      select: {
        name: 'name',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: `${doc?.name} Testimonial - Homepage`,
            href: '/',
          },
        ],
      }),
    },
    galleryItem: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: `${doc?.title} - Gallery`,
            href: '/',
          },
        ],
      }),
    },
    processStep: {
      select: {
        title: 'title',
      },
      resolve: (doc: any) => ({
        locations: [
          {
            title: `${doc?.title} - Process`,
            href: '/',
          },
        ],
      }),
    },
  },
}
