# 🔌 Component Connection Examples

This guide shows exactly how to connect each component to Sanity CMS.

## Pattern: Server Component (Recommended)

```typescript
// app/page.tsx
import Hero from '@/components/Hero'
import { getHeroSection } from '@/lib/sanity'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const heroData = await getHeroSection()

  return (
    <main>
      <Hero data={heroData} />
    </main>
  )
}
```

## 1. Hero Component

```typescript
// components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
  data: {
    heading: string
    subheading: string
    ctaText: string
    ctaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    backgroundImage?: any
    stats?: Array<{ value: string; label: string }>
  }
}

const Hero = ({ data }: HeroProps) => {
  if (!data) return null

  return (
    <section
      style={{
        backgroundImage: data.backgroundImage
          ? `url(${urlFor(data.backgroundImage).width(1920).url()})`
          : undefined
      }}
    >
      <h1>{data.heading}</h1>
      <p>{data.subheading}</p>

      <a href={data.ctaLink}>{data.ctaText}</a>
      <a href={data.secondaryCtaLink}>{data.secondaryCtaText}</a>

      {data.stats && (
        <div>
          {data.stats.map((stat, i) => (
            <div key={i}>
              <span>{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Hero
```

## 2. Footer Component

```typescript
// components/Footer.tsx
'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

interface FooterProps {
  data: {
    companyDescription: string
    copyrightText: string
    companyLinks: Array<{ name: string; href: string }>
    systemsLinks: Array<{ name: string; href: string }>
    resourcesLinks: Array<{ name: string; href: string }>
    legalLinks: Array<{ name: string; href: string }>
    showScrollToTop: boolean
  }
  siteSettings: {
    phone: string
    email: string
    address: { country: string }
  }
}

const Footer = ({ data, siteSettings }: FooterProps) => {
  if (!data) return null

  return (
    <footer>
      <div>
        <p>{data.companyDescription}</p>

        <div>
          <Phone /> {siteSettings.phone}
        </div>
        <div>
          <Mail /> {siteSettings.email}
        </div>
        <div>
          <MapPin /> {siteSettings.address.country}
        </div>
      </div>

      <div>
        <h3>Company</h3>
        {data.companyLinks.map((link) => (
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
      </div>

      <div>
        <h3>Systems</h3>
        {data.systemsLinks.map((link) => (
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
      </div>

      <div>
        <p>{data.copyrightText}</p>
        {data.legalLinks.map((link) => (
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
```

## 3. About Component

```typescript
// components/About.tsx
'use client'

import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Shield } from 'lucide-react'

const iconMap = {
  award: Award,
  users: Users,
  trending: TrendingUp,
  shield: Shield,
}

interface AboutProps {
  data: {
    title: string
    subtitle: string
    description: string[]
    features: string[]
    stats: Array<{
      value: string
      label: string
      icon?: string
    }>
  }
}

const About = ({ data }: AboutProps) => {
  if (!data) return null

  return (
    <section>
      <div>
        <h2>{data.title}</h2>
        <h3>{data.subtitle}</h3>

        {data.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {data.features.map((feature, i) => (
          <div key={i}>
            <span>•</span> {feature}
          </div>
        ))}
      </div>

      <div>
        {data.stats.map((stat, i) => {
          const Icon = stat.icon ? iconMap[stat.icon] : Award
          return (
            <div key={i}>
              <Icon />
              <div>{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default About
```

## 4. Systems Component

```typescript
// components/Systems.tsx
'use client'

import { urlFor } from '@/lib/sanity'

interface SystemsProps {
  data: {
    sectionTitle: string
    sectionSubtitle: string
    ctaText: string
    ctaLink: string
    systems: Array<{
      _id: string
      title: string
      description: string
      features: string[]
      image: any
    }>
  }
}

const Systems = ({ data }: SystemsProps) => {
  if (!data) return null

  return (
    <section>
      <h2>{data.sectionTitle}</h2>
      <p>{data.sectionSubtitle}</p>

      <div>
        {data.systems.map((system) => (
          <div key={system._id}>
            {system.image && (
              <img
                src={urlFor(system.image).width(600).height(400).url()}
                alt={system.title}
              />
            )}
            <h3>{system.title}</h3>
            <p>{system.description}</p>

            <ul>
              {system.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a href={data.ctaLink}>{data.ctaText}</a>
    </section>
  )
}

export default Systems
```

## 5. Contact Component

```typescript
// components/Contact.tsx
'use client'

import { useState } from 'react'

interface ContactProps {
  data: {
    title: string
    subtitle: string
    description: string
    formTitle: string
    submitButtonText: string
    successMessage: string
    placeholders: {
      name: string
      email: string
      phone: string
      message: string
    }
  }
}

const Contact = ({ data }: ContactProps) => {
  const [submitted, setSubmitted] = useState(false)

  if (!data) return null

  return (
    <section>
      <h2>{data.title}</h2>
      <p>{data.subtitle}</p>
      <p>{data.description}</p>

      {submitted ? (
        <div>{data.successMessage}</div>
      ) : (
        <form>
          <h3>{data.formTitle}</h3>

          <input
            type="text"
            placeholder={data.placeholders.name}
          />
          <input
            type="email"
            placeholder={data.placeholders.email}
          />
          <input
            type="tel"
            placeholder={data.placeholders.phone}
          />
          <textarea
            placeholder={data.placeholders.message}
          />

          <button type="submit">
            {data.submitButtonText}
          </button>
        </form>
      )}
    </section>
  )
}

export default Contact
```

## 6. Navigation Component

```typescript
// components/Navigation.tsx
'use client'

import { urlFor } from '@/lib/sanity'
import { useState } from 'react'

interface NavigationProps {
  data: {
    logo: any
    logoAlt: string
    navItems: Array<{
      label: string
      href: string
      order: number
    }>
    ctaButton: {
      text: string
      href: string
      show: boolean
    }
    sticky: boolean
  }
}

const Navigation = ({ data }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!data) return null

  return (
    <nav className={data.sticky ? 'sticky' : ''}>
      {data.logo && (
        <img
          src={urlFor(data.logo).width(150).url()}
          alt={data.logoAlt}
        />
      )}

      <ul>
        {data.navItems
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
      </ul>

      {data.ctaButton.show && (
        <a href={data.ctaButton.href}>
          {data.ctaButton.text}
        </a>
      )}
    </nav>
  )
}

export default Navigation
```

## 7. Main Page Integration

```typescript
// app/page.tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import Systems from '@/components/Systems'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import {
  getHeroSection,
  getAboutSection,
  getSystemsSection,
  getProcessSection,
  getTestimonialsSection,
  getContactSection,
  getFooterSection,
  getSiteSettings,
} from '@/lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    heroData,
    aboutData,
    systemsData,
    processData,
    testimonialsData,
    contactData,
    footerData,
    siteSettings,
  ] = await Promise.all([
    getHeroSection(),
    getAboutSection(),
    getSystemsSection(),
    getProcessSection(),
    getTestimonialsSection(),
    getContactSection(),
    getFooterSection(),
    getSiteSettings(),
  ])

  return (
    <main>
      <Hero data={heroData} />
      <About data={aboutData} />
      <Systems data={systemsData} />
      <Process data={processData} />
      <Testimonials data={testimonialsData} />
      <Contact data={contactData} />
      <Footer data={footerData} siteSettings={siteSettings} />
    </main>
  )
}
```

## 8. Using Brand Colors Dynamically

```typescript
// app/layout.tsx or a theme provider
import { getBrandTheme } from '@/lib/sanity'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const brandTheme = await getBrandTheme()

  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${brandTheme?.colors?.primary?.hex || '#8cc63f'};
              --color-primary-light: ${brandTheme?.colors?.primaryLight?.hex || '#9dd350'};
              --color-primary-dark: ${brandTheme?.colors?.primaryDark?.hex || '#7ab52f'};
              --color-secondary: ${brandTheme?.colors?.secondary?.hex || '#000'};
              --font-heading: ${brandTheme?.typography?.headingFont || 'Playfair Display'}, serif;
              --font-body: ${brandTheme?.typography?.bodyFont || 'Inter'}, sans-serif;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Testing Your Connection

1. Start dev server: `npm run dev`
2. Visit studio: `http://localhost:3000/studio`
3. Create/edit content
4. Refresh homepage to see changes
5. Check console for any errors

## Common Issues

**Data is null/undefined:**
- Check that you've created the document in Sanity Studio
- Verify the document type name matches your schema
- Ensure you've published (not just saved as draft)

**Images not loading:**
- Make sure you're using `urlFor()` helper
- Check that the image field has data
- Verify your Sanity project ID in `.env.local`

**Changes not appearing:**
- Wait 60 seconds for revalidation
- Hard refresh browser (Cmd+Shift+R)
- Check that you published in Studio

---

Need help? Check the main [SANITY-CMS-GUIDE.md](./SANITY-CMS-GUIDE.md)
