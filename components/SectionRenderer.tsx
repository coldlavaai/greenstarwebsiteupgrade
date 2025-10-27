import { lazy, Suspense } from 'react';

// Lazy load section components for better performance
const HeroSectionObject = lazy(() => import('./sections/HeroSectionObject'));
const ContentSection = lazy(() => import('./sections/ContentSection'));
const CTASection = lazy(() => import('./sections/CTASection'));
const GridSection = lazy(() => import('./sections/GridSection'));
const ImageTextSection = lazy(() => import('./sections/ImageTextSection'));
const FAQSection = lazy(() => import('./sections/FAQSection'));
const FormSection = lazy(() => import('./sections/FormSection'));
const SpacerSection = lazy(() => import('./sections/SpacerSection'));
const TestimonialSection = lazy(() => import('./sections/TestimonialSection'));
const StatsSection = lazy(() => import('./sections/StatsSection'));
const TeamSection = lazy(() => import('./sections/TeamSection'));
const PricingSection = lazy(() => import('./sections/PricingSection'));
const VideoSection = lazy(() => import('./sections/VideoSection'));
const LogoCloudSection = lazy(() => import('./sections/LogoCloudSection'));
const TimelineSection = lazy(() => import('./sections/TimelineSection'));
const ComparisonSection = lazy(() => import('./sections/ComparisonSection'));
const AccordionSection = lazy(() => import('./sections/AccordionSection'));
const GalleryGridSection = lazy(() => import('./sections/GalleryGridSection'));
const ContactMapSection = lazy(() => import('./sections/ContactMapSection'));
const NewsletterSection = lazy(() => import('./sections/NewsletterSection'));

interface SectionRendererProps {
  section: any;
  index: number;
}

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="py-12 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Map section types to components
const sectionComponents: Record<string, any> = {
  heroSectionObject: HeroSectionObject,
  contentSection: ContentSection,
  ctaSection: CTASection,
  gridSection: GridSection,
  imageTextSection: ImageTextSection,
  faqSection: FAQSection,
  formSection: FormSection,
  spacerSection: SpacerSection,
  testimonialSection: TestimonialSection,
  statsSection: StatsSection,
  teamSection: TeamSection,
  pricingSection: PricingSection,
  videoSection: VideoSection,
  logoCloudSection: LogoCloudSection,
  timelineSection: TimelineSection,
  comparisonSection: ComparisonSection,
  accordionSection: AccordionSection,
  galleryGridSection: GalleryGridSection,
  contactMapSection: ContactMapSection,
  newsletterSection: NewsletterSection,
};

export default function SectionRenderer({ section, index }: SectionRendererProps) {
  const SectionComponent = sectionComponents[section._type];

  if (!SectionComponent) {
    // Handle unknown section types gracefully
    console.warn(`Unknown section type: ${section._type}`);
    return (
      <div className="py-8 px-4 bg-yellow-500/10 border-l-4 border-yellow-500">
        <div className="container mx-auto">
          <p className="text-yellow-600 font-semibold">
            Unknown section type: &quot;{section._type}&quot;
          </p>
          <p className="text-yellow-600/80 text-sm mt-2">
            This section type is not yet implemented. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<SectionLoader />}>
      <SectionComponent data={section} index={index} />
    </Suspense>
  );
}
