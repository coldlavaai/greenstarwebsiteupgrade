// Document Types
import { service } from './service'
import { testimonial } from './testimonial'
import { galleryItem } from './galleryItem'
import { processStep } from './processStep'
import { formSubmission } from './formSubmission'
import { dbrLead } from './dbrLead'

// Knowledge Base Types
import productCategory from './productCategory'
import product from './product'
import knowledgeBase from './knowledgeBase'
import faq from './faq'
import review from './review'
import companyInfo from './companyInfo'

// Settings
import { siteSettings } from './siteSettings'
import { brandTheme } from './brandTheme'
import { emailSettings } from './emailSettings'
import { themeSettings } from './themeSettings'

// Section Schemas
import { heroSection } from './heroSection'
import { aboutSection } from './aboutSection'
import { contactSection } from './contactSection'
import { footerSection } from './footerSection'
import { navigationSection } from './navigationSection'
import { systemsSection } from './systemsSection'
import { testimonialsSection } from './testimonialsSection'
import { processSection } from './processSection'
import { gallerySection } from './gallerySection'

// System Pages (NEW - for CMS integration)
import { systemPage } from './systemPage'

// Universal Page Builder & Reusable Sections
import { page } from './page'
import { heroSectionObject } from './sections/heroSectionObject'
import { contentSection } from './sections/contentSection'
import { ctaSection } from './sections/ctaSection'
import { gridSection } from './sections/gridSection'
import { imageTextSection } from './sections/imageTextSection'
import { faqSection } from './sections/faqSection'
import { formSection } from './sections/formSection'
import { spacerSection } from './sections/spacerSection'

export const schemaTypes = [
  // Settings (singleton documents)
  siteSettings,
  brandTheme,
  emailSettings,
  themeSettings,

  // Section Configurations (singleton documents)
  heroSection,
  aboutSection,
  systemsSection,
  processSection,
  testimonialsSection,
  gallerySection,
  contactSection,
  navigationSection,
  footerSection,

  // System Pages (NEW - for CMS-managed product pages)
  systemPage,

  // Universal Page Builder (NEW - for creating custom pages)
  page,

  // Reusable Page Sections (for Page Builder)
  heroSectionObject,
  contentSection,
  ctaSection,
  gridSection,
  imageTextSection,
  faqSection,
  formSection,
  spacerSection,

  // Content Types (can have multiple instances)
  service,
  testimonial,
  galleryItem,
  processStep,

  // Form Submissions
  formSubmission,

  // DBR (Database Recovery) Leads
  dbrLead,

  // Knowledge Base
  productCategory,
  product,
  knowledgeBase,
  faq,
  review,
  companyInfo,
]
