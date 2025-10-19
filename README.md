# Green Star Solar - Website

A modern, fully customizable website for Green Star Solar built with **Next.js 14** and **Sanity.io CMS**.

## ✨ Features

- 🎨 **Modern, Responsive Design** - Beautiful animations with Framer Motion
- 🔧 **Fully Editable** - All content managed through Sanity CMS
- 🚀 **Built with Next.js 14** - Fast, SEO-friendly, production-ready
- 📝 **Sanity.io CMS** - Professional Studio interface at `/studio`
- 🎯 **Type-Safe** - Built with TypeScript
- 📱 **Mobile-First** - Optimized for all devices
- 🎭 **Tailwind CSS** - Modern styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))

### Installation

```bash
# Clone the repository
git clone https://github.com/coldlavaai/greenstarwebsiteupgrade.git
cd greenstar-solar-redesign

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your-token-here
```

See `.env.example` for a template.

### Running Locally

```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

## 📁 Project Structure

```
greenstar-solar-redesign/
├── app/                    # Next.js app directory
│   ├── studio/            # Sanity Studio route
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation
│   ├── About.tsx         # About section
│   ├── Systems.tsx       # Solar systems display
│   ├── Process.tsx       # Installation process
│   ├── Testimonials.tsx  # Customer reviews
│   ├── Gallery.tsx       # Project gallery
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Site footer
├── sanity/               # Sanity configuration
│   └── schemas/          # Content schemas
├── lib/                  # Utilities
│   ├── sanity.ts        # Sanity client
│   └── colorUtils.ts    # Color utilities
├── scripts/             # Utility scripts
│   └── populate-sanity.ts # Populate CMS with initial data
└── .env.local           # Environment variables (not in git)
```

## 🎯 Content Management

### Accessing Sanity Studio

1. Go to `https://your-domain.com/studio` (or `http://localhost:3000/studio` locally)
2. Log in with your Sanity credentials
3. Edit content and click "Publish"
4. Changes appear on the live site within 60 seconds

### What Can Be Edited

Through the Sanity Studio, you can manage:

- ✅ Navigation menu and logo
- ✅ Hero section headlines and CTAs
- ✅ About section content and stats
- ✅ Solar systems and services
- ✅ Installation process steps
- ✅ Customer testimonials and reviews
- ✅ Project gallery images
- ✅ Contact information
- ✅ Footer content and links
- ✅ Brand colors and theme

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run linting
```

## 📦 Tech Stack

- **Framework:** Next.js 14.2.13 (App Router)
- **CMS:** Sanity.io v3.67.1
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion 11.5.4
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_WRITE_TOKEN` (for write operations)
4. Deploy

### CORS Setup for Production

After deploying, configure CORS in Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Add your production URL (e.g., `https://greenstarwebsiteupgrade.vercel.app`)
5. Check "Allow credentials"
6. Save

## 🔐 Security

- Never commit `.env.local` (already in `.gitignore`)
- Configure CORS origins properly in Sanity
- Sanity handles authentication and security
- Regularly update dependencies

## 📝 Components

### Page Sections

- **Hero** - Main landing section with stats
- **About** - Company information with stats grid
- **Systems** - Solar system offerings
- **Process** - Installation process timeline
- **Gallery** - Project showcase
- **Testimonials** - Customer reviews with pagination
- **Contact** - Contact form
- **Footer** - Site footer with links

### Sanity Schemas

- **Site Settings** - Global settings
- **Navigation** - Menu configuration
- **Hero Section** - Hero content
- **About Section** - About content
- **Systems Section** - Systems configuration
- **Process Section** - Process steps
- **Testimonials Section** - Reviews settings
- **Gallery Section** - Gallery settings
- **Contact Section** - Contact form settings
- **Footer Section** - Footer content
- **Service** - Individual solar services
- **Testimonial** - Individual reviews
- **Gallery Item** - Individual projects
- **Process Step** - Individual process steps

## 🎨 Customization

### Brand Colors

The site uses CSS variables defined in Tailwind config:

- Primary: `#8cc63f` (Green Star green)
- Primary Light: `#9dd350`
- Primary Dark: `#7ab52f`
- Accent: `#d4af37` (Gold)

Update colors in the Sanity Studio under "Brand Theme" or directly in component files.

### Fonts

- **Headings:** Playfair Display (serif)
- **Body & Numbers:** Inter (sans-serif)

## 📄 License

Private - All rights reserved to Green Star Solar

---

**Live Site:** https://greenstarwebsiteupgrade.vercel.app
**GitHub:** https://github.com/coldlavaai/greenstarwebsiteupgrade
