import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import {
  Sun,
  TrendingDown,
  Shield,
  Zap,
  Target,
  Award,
  Leaf,
  Users,
  ArrowRight,
  Battery,
  Home,
  Building2,
  Plug,
  Moon,
  Power,
  Clock,
  CheckCircle,
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import PortableText, { PortableTextInline } from '@/components/PortableText'
import MotionDiv, { MotionLink, MotionH1 } from '@/components/MotionDiv'
import { getClient } from '@/lib/sanity'

// Icon mapping - maps string names from CMS to actual components
const iconMap: Record<string, any> = {
  Sun,
  TrendingDown,
  Shield,
  Zap,
  Target,
  Award,
  Leaf,
  Users,
  Battery,
  Home,
  Building2,
  Plug,
  Moon,
  Power,
  Clock,
  CheckCircle,
}

// Fetch system page data from CMS
async function getSystemPageData(slug: string) {
  const isDraftMode = draftMode().isEnabled
  const client = getClient(isDraftMode)

  const data = await client.fetch(
    `*[_type == "systemPage" && slug.current == $slug && published == true][0]{
      _id,
      title,
      pageType,
      heroMiniBadge,
      heroHeading,
      heroDescription,
      heroCta,
      benefitsHeading,
      benefitsSubheading,
      benefits[]{
        _key,
        icon,
        title,
        description
      },
      processHeading,
      processSubheading,
      processSteps[]{
        _key,
        number,
        title,
        description
      },
      faqHeading,
      faqs[]{
        _key,
        question,
        answer
      },
      ctaHeading,
      ctaDescription,
      ctaButton,
      metaTitle,
      metaDescription,
      showNavigation,
      showFooter
    }`,
    { slug },
    { next: { revalidate: 60 } } // Revalidate every 60 seconds
  )

  return data
}

// Fetch navigation and footer data
async function getLayoutData() {
  const isDraftMode = draftMode().isEnabled
  const client = getClient(isDraftMode)

  const [nav, footer] = await Promise.all([
    client.fetch(`*[_type == "navigationSection"][0]{ _id, _type, title, navItems, ctaButton }`),
    client.fetch(`*[_type == "footerSection"][0]`),
  ])

  return { nav, footer }
}

export default async function SolarPanelsBusinessCMS() {
  // Fetch data server-side
  const pageData = await getSystemPageData('solar-panels-business')
  const { nav, footer } = await getLayoutData()

  // Return 404 if page not found
  if (!pageData) {
    notFound()
  }

  const IconComponent = pageData.heroMiniBadge?.icon ? iconMap[pageData.heroMiniBadge.icon] : Building2

  return (
    <PageWrapper>
      {pageData.showNavigation && <Navigation data={nav} />}

      {/* Hero Section */}
      <section className="relative py-20 flex items-center overflow-hidden pt-32 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Mini Badge */}
            {pageData.heroMiniBadge && (
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center space-x-3 mb-8"
              >
                <IconComponent className="w-8 h-8 text-primary" />
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                  {pageData.heroMiniBadge.text}
                </span>
              </MotionDiv>
            )}

            {/* Heading */}
            {pageData.heroHeading && (
              <MotionH1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="block text-white">{pageData.heroHeading.line1}</span>
                <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  {pageData.heroHeading.line2}
                </span>
              </MotionH1>
            )}

            {/* Description */}
            {pageData.heroDescription && (
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-4xl mx-auto mb-10"
              >
                <PortableText value={pageData.heroDescription} />
              </MotionDiv>
            )}

            {/* CTA Buttons */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {pageData.heroCta && (
                <MotionLink
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={pageData.heroCta.link}
                  className="group relative px-8 py-4 rounded-full font-semibold text-base overflow-hidden"
                  style={{
                    background: 'rgba(140, 198, 63, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(140, 198, 63, 0.3)',
                    boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center space-x-3">
                    <span className="tracking-wide text-white drop-shadow-lg">{pageData.heroCta.text}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-white drop-shadow-lg" />
                  </span>
                </MotionLink>
              )}

              <MotionLink
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/#systems"
                className="backdrop-blur-xl bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-base border-2 border-white/20 hover:border-primary/50 transition-all shadow-xl"
              >
                ← Back to Systems
              </MotionLink>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {pageData.benefits && pageData.benefits.length > 0 && (
        <section className="py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {pageData.benefitsHeading && (
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {pageData.benefitsHeading}
                </h2>
              )}
              {pageData.benefitsSubheading && (
                <div className="text-xl text-white/70 max-w-3xl mx-auto font-light">
                  <PortableTextInline value={pageData.benefitsSubheading} />
                </div>
              )}
            </MotionDiv>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pageData.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon ? iconMap[benefit.icon] : Zap
                return (
                  <MotionDiv
                    key={benefit._key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                      <BenefitIcon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {benefit.title}
                    </h3>
                    <div className="text-white/60 text-sm leading-relaxed font-light">
                      <PortableTextInline value={benefit.description} />
                    </div>
                  </MotionDiv>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {pageData.processSteps && pageData.processSteps.length > 0 && (
        <section className="py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {pageData.processHeading && (
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {pageData.processHeading}
                </h2>
              )}
              {pageData.processSubheading && (
                <div className="text-xl text-white/70 max-w-3xl mx-auto font-light">
                  <PortableTextInline value={pageData.processSubheading} />
                </div>
              )}
            </MotionDiv>

            {/* Process Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {pageData.processSteps.map((step, index) => (
                <MotionDiv
                  key={step._key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-xl p-6 border border-white/10"
                >
                  <div className="text-4xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <div className="text-white/60 text-sm leading-relaxed">
                    <PortableTextInline value={step.description} />
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {pageData.faqHeading && (
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {pageData.faqHeading}
                </h2>
              )}

              <div className="space-y-6">
                {pageData.faqs.map((faq, index) => (
                  <MotionDiv
                    key={faq._key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                    <div className="text-white/70 leading-relaxed">
                      <PortableTextInline value={faq.answer} />
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {pageData.ctaHeading && (
        <section className="py-16 bg-transparent">
          <div className="container mx-auto px-4">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {pageData.ctaHeading}
                </h2>
                {pageData.ctaDescription && (
                  <div className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                    <PortableTextInline value={pageData.ctaDescription} />
                  </div>
                )}
                {pageData.ctaButton && (
                  <MotionLink
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={pageData.ctaButton.link}
                    className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
                  >
                    <span>{pageData.ctaButton.text}</span>
                    <ArrowRight className="w-5 h-5" />
                  </MotionLink>
                )}
              </div>
            </MotionDiv>
          </div>
        </section>
      )}

      {pageData.showFooter && <Footer data={footer} />}
    </PageWrapper>
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  const pageData = await getSystemPageData('solar-panels-business')

  if (!pageData) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription,
  }
}
