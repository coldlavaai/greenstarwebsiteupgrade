export const resolve = {
  locations: {
    // Singleton sections that appear on the homepage
    siteSettings: {
      select: {
        title: 'title',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Homepage',
            href: '/',
          },
        ],
      }),
    },
    brandTheme: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    heroSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    aboutSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    systemsSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    processSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    testimonialsSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    gallerySection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    contactSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    navigationSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    footerSection: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    // Individual content items
    service: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    testimonial: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    galleryItem: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
    processStep: {
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    },
  },
}
