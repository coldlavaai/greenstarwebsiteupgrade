# 🎨 GreenStar Solar - Sanity CMS Admin Guide

## 📋 Table of Contents
- [Accessing the Admin Panel](#accessing-the-admin-panel)
- [Content Structure](#content-structure)
- [Editing Content](#editing-content)
- [Connecting Components](#connecting-components)

## 🚀 Accessing the Admin Panel

### Local Development
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the Sanity Studio at:
   ```
   http://localhost:3000/studio
   ```

### Production
Visit: `https://your-domain.com/studio`

## 📁 Content Structure

Your CMS is organized into three main sections:

### 1. ⚙️ Settings
Control global site settings and branding:

- **Site Settings**
  - Company name, tagline, contact info
  - Logo uploads
  - Social media links
  - SEO descriptions

- **Brand & Theme**
  - Primary, secondary, and accent colors
  - Typography settings (heading & body fonts)
  - Button styles
  - Background images
  - Favicon

### 2. 📄 Page Sections
Edit every section of your website:

- **Navigation** - Menu items, logo, CTA button
- **Hero Section** - Main headline, subtext, buttons, stats, background
- **About Section** - Company description, stats, features
- **Systems Section** - Solar solutions display settings
- **Process Section** - Step-by-step process display
- **Testimonials Section** - Customer reviews and stats
- **Gallery Section** - Project portfolio settings
- **Contact Section** - Form settings, placeholders, messages
- **Footer** - Company description, links, copyright

### 3. 📦 Content Items
Reusable content that appears in sections:

- **Services/Systems** - Individual solar products (panels, batteries, etc.)
- **Testimonials** - Customer reviews
- **Gallery Items** - Project photos and descriptions
- **Process Steps** - Individual steps in your process

## ✏️ Editing Content

### Changing Text

1. Navigate to the section you want to edit
2. Click on the text field
3. Update the content
4. Click "Publish" (top right)
5. Changes appear live in 30-60 seconds

### Changing Colors

1. Go to Settings → Brand & Theme
2. Click on any color field
3. Use the color picker or enter hex codes
4. Publish changes
5. Your entire site will update with the new colors

### Uploading Images

1. Click on any image field
2. Drag and drop or click to browse
3. Select your image
4. Adjust hotspot (optional - for smart cropping)
5. Publish

**Recommended Sizes:**
- Logo: 300x100px (PNG with transparency)
- Hero Background: 1920x1080px
- Gallery Images: 1200x800px
- Favicon: 32x32px

### Adding New Items

#### To add a new Service/System:
1. Click "Services/Systems" in sidebar
2. Click "Create" button
3. Fill in:
   - Title (e.g., "Solar Panels for Home")
   - Description
   - Features list
   - Icon selection
   - Image upload
   - Pricing (optional)
4. Publish

#### To add a new Testimonial:
1. Click "Testimonials"
2. Click "Create"
3. Fill in:
   - Customer name
   - Role/Title
   - Company
   - Review text
   - Star rating
   - Photo (optional)
4. Publish

### Editing Button Text

All buttons can be customized:

1. Find the section with the button
2. Look for fields like "CTA Button Text" or "Submit Button Text"
3. Change the text
4. Publish

### Managing Navigation

1. Go to Page Sections → Navigation
2. Edit nav items array:
   - Add new menu items
   - Change labels
   - Reorder (drag and drop)
   - Update links
3. Toggle CTA button on/off
4. Publish

## 🔌 Connecting Components (For Developers)

### Basic Setup

All components should fetch data from Sanity. Here's the pattern:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getHeroSection } from '@/lib/sanity'

const Hero = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getHeroSection().then(setContent)
  }, [])

  if (!content) return <div>Loading...</div>

  return (
    <section>
      <h1>{content.heading}</h1>
      <p>{content.subheading}</p>
      <button>{content.ctaText}</button>
    </section>
  )
}
```

### Available Helper Functions

Located in `lib/sanity.ts`:

- `getSiteSettings()` - Global site settings
- `getBrandTheme()` - Colors, fonts, styling
- `getHeroSection()` - Hero section content
- `getAboutSection()` - About section with stats
- `getSystemsSection()` - Systems + referenced services
- `getProcessSection()` - Process steps
- `getTestimonialsSection()` - Testimonials + stats
- `getGallerySection()` - Gallery items
- `getContactSection()` - Contact form settings
- `getNavigationSection()` - Nav menu items
- `getFooterSection()` - Footer content

### Fetching Lists

```typescript
import { getAllServices, getAllTestimonials } from '@/lib/sanity'

// Get all services
const services = await getAllServices()

// Get all testimonials
const testimonials = await getAllTestimonials()
```

### Working with Images

```typescript
import { urlFor } from '@/lib/sanity'

// In your component:
<img
  src={urlFor(content.image).width(800).height(600).url()}
  alt={content.title}
/>
```

### Dynamic Colors

Apply brand colors from CMS:

```typescript
const brandTheme = await getBrandTheme()

<div style={{
  backgroundColor: brandTheme.colors.primary.hex,
  color: brandTheme.colors.text.hex
}}>
```

## 🎯 Quick Tips

### For Clients:

1. **Always Publish** - Content doesn't go live until you click "Publish"
2. **Preview Changes** - Use the preview pane to see changes before publishing
3. **Drafts Auto-Save** - Your work is saved automatically as you type
4. **Undo Available** - Click the clock icon to see revision history
5. **Ask for Help** - Contact your developer if you need new content types

### For Developers:

1. **Server Components** - Fetch data in Server Components when possible:
   ```typescript
   // app/page.tsx
   import { getHeroSection } from '@/lib/sanity'

   export default async function Page() {
     const heroData = await getHeroSection()
     return <Hero data={heroData} />
   }
   ```

2. **Client Components** - Use useState/useEffect for client-side fetching

3. **Revalidation** - Add ISR for better performance:
   ```typescript
   export const revalidate = 60 // Revalidate every 60 seconds
   ```

4. **Type Safety** - Generate types from schemas:
   ```bash
   npx sanity typegen generate
   ```

## 🔧 Troubleshooting

**Changes not appearing?**
- Clear browser cache
- Wait 60 seconds for CDN update
- Check you clicked "Publish" not just "Save"

**Can't upload images?**
- Check file size (max 10MB)
- Use supported formats: JPG, PNG, SVG, GIF

**Seeing old content?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)
- [Image URLs](https://www.sanity.io/docs/image-url)

---

**Need help?** Contact your developer or visit [Sanity's Help Center](https://www.sanity.io/help)
