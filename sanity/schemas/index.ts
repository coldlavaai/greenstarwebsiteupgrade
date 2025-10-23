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

export const schemaTypes = [
  // Settings (singleton documents)
  siteSettings,
  brandTheme,
  emailSettings,

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
