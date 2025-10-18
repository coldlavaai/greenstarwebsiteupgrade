import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})

// Client for draft mode with token and stega encoding
export const draftClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

// Helper to get the right client based on draft mode
export function getClient(preview = false) {
  return preview ? draftClient : client
}

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper functions for fetching specific sections

export async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getBrandTheme() {
  return await client.fetch(`*[_type == "brandTheme"][0]`)
}

export async function getHeroSection() {
  return await client.fetch(`*[_type == "heroSection"][0]`)
}

export async function getAboutSection() {
  return await client.fetch(`*[_type == "aboutSection"][0]{
    ...,
    stats[]{
      value,
      label,
      icon
    }
  }`)
}

export async function getSystemsSection() {
  return await client.fetch(`*[_type == "systemsSection"][0]{
    ...,
    systems[]->{
      _id,
      title,
      description,
      features,
      icon,
      image
    }
  }`)
}

export async function getProcessSection() {
  return await client.fetch(`*[_type == "processSection"][0]{
    ...,
    steps[]->{
      _id,
      title,
      description,
      stepNumber,
      icon
    }
  }`)
}

export async function getTestimonialsSection() {
  return await client.fetch(`*[_type == "testimonialsSection"][0]{
    ...,
    testimonials[]->{
      _id,
      name,
      role,
      company,
      content,
      rating,
      image
    }
  }`)
}

export async function getGallerySection() {
  return await client.fetch(`*[_type == "gallerySection"][0]{
    ...,
    items[]->{
      _id,
      title,
      description,
      image,
      category,
      location
    }
  }`)
}

export async function getContactSection() {
  return await client.fetch(`*[_type == "contactSection"][0]`)
}

export async function getNavigationSection() {
  return await client.fetch(`*[_type == "navigationSection"][0]{
    ...,
    logo,
    navItems[] | order(order asc)
  }`)
}

export async function getFooterSection() {
  return await client.fetch(`*[_type == "footerSection"][0]`)
}

// Get all services/systems
export async function getAllServices() {
  return await client.fetch(`*[_type == "service"] | order(_createdAt asc)`)
}

// Get all testimonials
export async function getAllTestimonials() {
  return await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`)
}

// Get all gallery items
export async function getAllGalleryItems() {
  return await client.fetch(`*[_type == "galleryItem"] | order(_createdAt desc)`)
}

// Get all process steps
export async function getAllProcessSteps() {
  return await client.fetch(`*[_type == "processStep"] | order(stepNumber asc)`)
}
