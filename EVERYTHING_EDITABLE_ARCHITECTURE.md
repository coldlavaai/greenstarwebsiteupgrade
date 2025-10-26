# Everything-Editable CMS Architecture

## Vision
**Every single element on the website must be editable through Sanity Studio** - no code changes required for any content, styling, or configuration updates.

---

## 1. Global Theme Settings

### `themeSettings` (Singleton)
**Purpose:** Control all visual styling globally

```typescript
{
  // Brand Colors
  colors: {
    primary: color,           // Main brand color
    primaryLight: color,      // Light variant
    primaryDark: color,       // Dark variant
    secondary: color,
    accent: color,
    background: color,
    backgroundLight: color,
    backgroundDark: color,
    text: color,
    textLight: color,
    textDark: color,
    border: color,
    success: color,
    warning: color,
    error: color,
  },

  // Typography
  typography: {
    headingFont: string,      // Font family
    bodyFont: string,
    monoFont: string,
    baseFontSize: number,     // px
    scaleRatio: number,       // Type scale (1.25 = Major Third)
    lineHeight: {
      tight: number,
      normal: number,
      relaxed: number,
      loose: number,
    },
    fontWeights: {
      light: number,
      normal: number,
      medium: number,
      semibold: number,
      bold: number,
    },
  },

  // Spacing System
  spacing: {
    unit: number,             // Base unit (8px)
    scale: number[],          // [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32]
  },

  // Border Radius
  borderRadius: {
    small: string,
    medium: string,
    large: string,
    xl: string,
    full: string,
  },

  // Shadows
  shadows: {
    small: string,
    medium: string,
    large: string,
    xl: string,
    '2xl': string,
    '3xl': string,
  },

  // Animations
  animations: {
    durationFast: number,     // ms
    durationNormal: number,
    durationSlow: number,
    easingDefault: string,    // CSS easing function
    easingIn: string,
    easingOut: string,
    easingInOut: string,
  },

  // Layout
  layout: {
    maxWidth: string,         // Container max-width
    breakpoints: {
      sm: string,
      md: string,
      lg: string,
      xl: string,
      '2xl': string,
    },
  },
}
```

---

## 2. Global Content Settings

### `siteSettings` (Enhanced)
```typescript
{
  // Site Identity
  siteName: string,
  tagline: string,
  description: portableText,
  logo: image,
  logoLight: image,         // For dark backgrounds
  logoDark: image,          // For light backgrounds
  favicon: image,
  ogImage: image,           // Default social share image

  // Contact Information
  contact: {
    email: string,
    phone: string,
    address: portableText,
    businessHours: string,
    bookingLink: string,
  },

  // Social Media
  social: {
    facebook: string,
    twitter: string,
    instagram: string,
    linkedin: string,
    youtube: string,
  },

  // Legal
  legal: {
    companyNumber: string,
    vatNumber: string,
    registeredAddress: portableText,
    privacyPolicyUrl: string,
    termsUrl: string,
    cookiePolicyUrl: string,
  },

  // SEO Defaults
  seo: {
    defaultMetaTitle: string,
    defaultMetaDescription: string,
    defaultOgImage: image,
    twitterHandle: string,
    siteVerification: {
      google: string,
      bing: string,
    },
  },

  // Analytics & Tracking
  analytics: {
    googleAnalyticsId: string,
    googleTagManagerId: string,
    facebookPixelId: string,
    hotjarId: string,
  },

  // Scripts
  customScripts: {
    headerScripts: text,      // Injected in <head>
    bodyScripts: text,        // Injected before </body>
  },
}
```

---

## 3. Navigation System

### `navigationSection` (Enhanced)
```typescript
{
  logo: image,
  logoAlt: string,
  logoLink: string,

  navItems: [
    {
      label: string,
      link: string,
      icon: string,           // Optional icon
      openInNewTab: boolean,
      dropdown: [             // Nested dropdown items
        {
          label: string,
          link: string,
          description: portableText,
          icon: image,
        }
      ],
    }
  ],

  // CTA Button
  ctaButton: {
    text: string,
    link: string,
    style: 'primary' | 'secondary' | 'outline',
    icon: string,
  },

  // Mobile Settings
  mobileMenu: {
    backgroundColor: color,
    textColor: color,
    showLogo: boolean,
  },

  // Sticky Behavior
  sticky: boolean,
  stickyOffset: number,
  transparentOnTop: boolean,
  blurEffect: boolean,
}
```

---

## 4. Footer System

### `footerSection` (Enhanced)
```typescript
{
  backgroundColor: color,
  textColor: color,
  linkColor: color,

  // Column Layout
  columns: [
    {
      title: string,
      items: [
        {
          type: 'link' | 'text' | 'image',
          label: string,
          content: portableText | image,
          link: string,
        }
      ],
    }
  ],

  // Social Links
  socialLinks: [
    {
      platform: string,
      url: string,
      icon: image | string,
    }
  ],

  // Bottom Bar
  bottomBar: {
    copyrightText: string,
    links: [
      {
        label: string,
        url: string,
      }
    ],
  },

  // Newsletter
  newsletter: {
    enabled: boolean,
    heading: string,
    description: portableText,
    placeholder: string,
    buttonText: string,
    successMessage: string,
    errorMessage: string,
  },
}
```

---

## 5. Page Builder System

### `page` (New Universal Schema)
```typescript
{
  title: string,
  slug: slug,
  template: 'default' | 'landing' | 'blog' | 'custom',

  // SEO
  seo: {
    metaTitle: string,
    metaDescription: string,
    ogImage: image,
    noIndex: boolean,
    canonical: string,
  },

  // Sections (Drag & Drop)
  sections: [
    {
      _type: 'heroSection' | 'contentBlock' | 'ctaSection' | 'gridSection' | 'formSection' | ...,
      // Each section type has its own schema
    }
  ],

  // Page Settings
  settings: {
    showNavigation: boolean,
    showFooter: boolean,
    customBackgroundColor: color,
    customBackgroundImage: image,
    customSpacing: number,
  },
}
```

---

## 6. Component Schemas

### `heroSection` (Enhanced)
```typescript
{
  // Layout
  layout: 'centered' | 'left' | 'right' | 'split',
  height: 'auto' | 'screen' | 'custom',
  customHeight: string,

  // Background
  background: {
    type: 'color' | 'gradient' | 'image' | 'video',
    color: color,
    gradient: {
      from: color,
      to: color,
      direction: string,
    },
    image: image,
    video: file,
    overlay: {
      enabled: boolean,
      color: color,
      opacity: number,
    },
  },

  // Content
  miniBadge: {
    icon: string | image,
    text: string,
    color: color,
  },

  heading: {
    line1: string,
    line2: string,
    color1: color,
    color2: color | 'gradient',
    gradient: {
      from: color,
      to: color,
    },
  },

  description: portableText,
  descriptionColor: color,

  // CTAs
  ctas: [
    {
      text: string,
      link: string,
      style: 'primary' | 'secondary' | 'outline' | 'ghost',
      icon: string,
    }
  ],

  // Stats/Features
  stats: [
    {
      value: string,
      label: string,
      icon: string,
    }
  ],
}
```

### `contentBlock` (New)
```typescript
{
  heading: string,
  subheading: string,
  content: portableText,

  layout: 'text-only' | 'text-image' | 'image-text' | 'grid',
  alignment: 'left' | 'center' | 'right',

  image: image,
  imagePosition: 'left' | 'right' | 'top' | 'bottom',
  imageSize: 'small' | 'medium' | 'large' | 'full',

  backgroundColor: color,
  backgroundImage: image,

  spacing: {
    paddingTop: string,
    paddingBottom: string,
  },
}
```

### `gridSection` (New)
```typescript
{
  heading: string,
  subheading: portableText,

  items: [
    {
      icon: string | image,
      title: string,
      description: portableText,
      link: string,
      image: image,
    }
  ],

  columns: {
    mobile: number,
    tablet: number,
    desktop: number,
  },

  cardStyle: {
    background: color,
    border: boolean,
    borderColor: color,
    shadow: string,
    hoverEffect: 'lift' | 'scale' | 'glow' | 'none',
  },
}
```

### `ctaSection` (Enhanced)
```typescript
{
  heading: string,
  description: portableText,

  button: {
    text: string,
    link: string,
    style: 'primary' | 'secondary' | 'outline',
    icon: string,
  },

  background: {
    type: 'color' | 'gradient' | 'image',
    color: color,
    gradient: {
      from: color,
      to: color,
      via: color,
    },
    image: image,
  },

  layout: 'centered' | 'split',
  spacing: string,
}
```

### `formSection` (New)
```typescript
{
  heading: string,
  description: portableText,

  formType: 'contact' | 'quote' | 'newsletter' | 'custom',

  fields: [
    {
      name: string,
      label: string,
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio',
      placeholder: string,
      required: boolean,
      validation: string,      // Regex pattern
      options: string[],       // For select/radio
    }
  ],

  submitButton: {
    text: string,
    loadingText: string,
    successMessage: string,
    errorMessage: string,
  },

  integrations: {
    email: string,           // Email to send to
    webhook: string,         // Webhook URL
    zapier: string,
    googleSheets: string,
  },
}
```

---

## 7. Asset Management

### All Images in Sanity
```typescript
// Every image reference includes:
{
  asset: image,
  alt: string,
  caption: portableText,
  hotspot: {
    x: number,
    y: number,
  },
  crop: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
}
```

### Image Optimization Settings
```typescript
{
  quality: number,          // 1-100
  format: 'webp' | 'jpg' | 'png' | 'auto',
  blur: {
    enabled: boolean,
    amount: number,
  },
  sizes: string[],          // Responsive sizes
}
```

---

## 8. Advanced Features

### Version Control
- Built-in Sanity version history
- Publish/unpublish workflow
- Draft mode for previews

### Multi-language (Future)
- Language selector in schemas
- Translation management
- Locale-specific content

### A/B Testing (Future)
- Variant creation
- Analytics integration
- Auto-optimization

---

## Implementation Priority

### Phase 1: Foundation ✅ (In Progress)
- [x] systemPage schema
- [x] Portable Text support
- [x] Migration scripts
- [ ] Complete all system pages population

### Phase 2: Global Settings (NEXT)
- [ ] themeSettings schema
- [ ] Enhanced siteSettings
- [ ] Enhanced navigation schema
- [ ] Enhanced footer schema

### Phase 3: Page Builder
- [ ] Universal page schema
- [ ] Section registry
- [ ] Drag-and-drop ordering
- [ ] Section templates

### Phase 4: Component Library
- [ ] All component schemas
- [ ] Component preview system
- [ ] Reusable components

### Phase 5: Visual Editor
- [ ] Live preview
- [ ] Inline editing
- [ ] Image management
- [ ] Style controls

### Phase 6: Advanced
- [ ] Auto-save
- [ ] Undo/redo
- [ ] Keyboard shortcuts
- [ ] Batch operations

---

## Technical Stack

### Sanity Studio
- Custom input components
- Custom preview components
- Document actions
- Workflows

### Frontend Integration
- Server Components for performance
- Real-time preview with Presentation Tool
- Draft mode for staging
- ISR for optimal caching

---

## Client Experience Goals

1. **Zero Code Required** - Everything editable through UI
2. **Visual Feedback** - See changes in real-time
3. **Intuitive** - Squarespace-level ease of use
4. **Flexible** - Support any design changes
5. **Fast** - Instant saves, quick loads
6. **Reliable** - Never lose work
7. **Professional** - Production-ready output
