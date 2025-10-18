# Green Star Solar - Website Redesign

A modern, fully customizable website for Green Star Solar built with **Next.js 14** and **Sanity.io CMS**. This template is designed for web developers building client websites with a beautiful admin panel for easy content management.

## ✨ Features

- 🎨 **Modern, Responsive Design** - Beautiful animations with Framer Motion
- 🔧 **Fully Editable** - Clients can manage all content through the admin panel
- 🚀 **Built with Next.js 14** - Fast, SEO-friendly, production-ready
- 📝 **Sanity.io CMS** - Professional Studio interface (no coding required for updates)
- 🎯 **Type-Safe** - Built with TypeScript
- 📱 **Mobile-First** - Looks great on all devices
- 🎭 **Tailwind CSS 4** - Easy to customize and extend

## 📋 What Clients Can Edit

Through the Sanity Studio at `/studio`, clients can update:

- ✅ Company information & contact details
- ✅ Logo, colors, and branding
- ✅ Hero section headlines and CTAs
- ✅ Services and pricing
- ✅ Customer testimonials
- ✅ Project gallery
- ✅ Installation process steps
- ✅ Social media links
- ✅ Business hours

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))
- Git installed

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd greenstar-solar-redesign

# Install dependencies
npm install
```

### Step 2: Sanity Project Setup

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project named "Green Star Solar"
3. Choose the "Production" dataset
4. Copy your **Project ID** (looks like: `kpz3fwyf`)

### Step 3: Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your-project-id-here` with your actual Sanity Project ID.

### Step 4: Configure CORS

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Add: `http://localhost:3000` (and `http://localhost:3001` if needed)
6. Check "Allow credentials"
7. Save

### Step 5: Run the Development Server

```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### Step 6: Log In to Sanity Studio

1. Go to http://localhost:3000/studio
2. Log in with Google, GitHub, or email/password (same account used to create the Sanity project)
3. You're in! Start editing content

## 📁 Project Structure

```
greenstar-solar-redesign/
├── app/                    # Next.js app directory
│   ├── studio/            # Sanity Studio route
│   │   └── [[...index]]/page.tsx
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx          # Homepage hero section
│   ├── Navigation.tsx    # Site navigation
│   ├── About.tsx         # About section
│   ├── Services.tsx      # Services display
│   ├── Testimonials.tsx  # Customer reviews
│   ├── Gallery.tsx       # Project gallery
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Site footer
├── sanity/               # Sanity configuration
│   └── schemas/          # Content type schemas
│       ├── service.ts
│       ├── testimonial.ts
│       ├── galleryItem.ts
│       ├── processStep.ts
│       ├── siteSettings.ts
│       ├── heroSection.ts
│       ├── aboutSection.ts
│       └── index.ts
├── sanity.config.ts      # Sanity Studio configuration
└── .env.local           # Environment variables
```

## 🎯 Using This Template for Client Projects

### Customization Workflow

1. **Initial Setup**
   - Update company name in `src/payload/payload.config.ts`
   - Change brand colors in components (search for `#8cc63f`)
   - Add client's logo to `public/`

2. **Content Population**
   - Log into `/admin`
   - Update Site Settings with client info
   - Add services, testimonials, gallery images
   - Customize hero and about sections

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel (recommended) or any Node.js host
   - Update environment variables in production

### Handing Off to Clients

Send them this guide:

**For Your Client:**
```
# How to Update Your Website

1. Go to yourwebsite.com/studio
2. Log in with your credentials (Google, GitHub, or email)
3. Click on what you want to edit in the left sidebar:
   - "Site Settings" - Company info, contact details
   - "Services" - Add/edit solar services
   - "Testimonials" - Manage customer reviews
   - "Gallery Items" - Upload project photos
   - "Hero Section" - Change homepage headline
   - "About Section" - Update about us content
   - "Process Steps" - Edit installation process

4. Make your changes and click "Publish"
5. Changes appear on the live site immediately!

No coding required. User-friendly interface!
```

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
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 11.5.4
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel (recommended)

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel automatically handles:
- Serverless functions
- Image optimization
- Automatic builds

### Environment Variables for Production

Add these in your Vercel project settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=kpz3fwyf
NEXT_PUBLIC_SANITY_DATASET=production
```

### CORS Setup for Production

After deploying, add your production domain to Sanity CORS origins:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project "Green Star Solar"
3. Go to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Enter your production URL (e.g., `https://greenstarsolar.vercel.app`)
6. Check "Allow credentials"
7. Save

Your Studio will be accessible at `https://your-domain.com/studio`

## 🔐 Security Notes

- Never commit `.env.local` (already in `.gitignore`)
- Configure CORS origins properly in Sanity
- Use Sanity's built-in authentication (Google/GitHub/email)
- Regularly update dependencies with `npm update`
- Sanity handles all backend security automatically

## 📝 Content Types Explained

### Document Types (Multiple Items)

- **Services** - Solar panels, batteries, EV charging, etc.
  - Title, category, description, features, pricing
  - Featured toggle for homepage display

- **Testimonials** - Customer reviews and ratings
  - Customer name, company, rating (1-5 stars)
  - Review text, optional photo

- **Gallery Items** - Project photos with categories
  - Image upload, project title, description
  - Category (Residential, Commercial, Industrial)

- **Process Steps** - Installation process breakdown
  - Step number, title, description, icon

### Singleton Types (Single Instance)

- **Site Settings** - Global company settings
  - Company name, contact info, business hours
  - Social media links, branding colors, logo

- **Hero Section** - Homepage hero content
  - Main heading, subheading, CTA buttons, stats

- **About Section** - About us content
  - Heading, description, mission, values

## 🎨 Customization Guide

### Changing Brand Colors

Search and replace `#8cc63f` with your brand color in:
- `components/*.tsx`
- `app/globals.css`

Or create a theme config file for easier management.

### Adding New Sections

1. Create component in `components/`
2. Import in `app/page.tsx`
3. (Optional) Create a Global or Collection for it

### Adding New Content Types

To add a new schema (e.g., "Blog Posts"):

1. Create a new file in `sanity/schemas/blogPost.ts`
2. Define your schema using Sanity's syntax
3. Import and add to `sanity/schemas/index.ts`
4. Restart the dev server

## 🤝 Support & Documentation

- **Sanity Docs:** https://sanity.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

## 📄 License

Private - All rights reserved to Green Star Solar

---

**Powered by Sanity.io & Next.js**
