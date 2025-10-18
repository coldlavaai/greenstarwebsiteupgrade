import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Systems from '@/components/Systems';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DayNightBackground from '@/components/DayNightBackground';
import { draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity';

export default async function Home() {
  const isDraftMode = draftMode().isEnabled
  const client = getClient(isDraftMode)

  // Fetch all section data
  const [heroData, aboutData, contactData, navigationData, footerData] = await Promise.all([
    client.fetch(`*[_type == "heroSection"][0]{
      _id,
      _type,
      heading,
      subheading,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      backgroundImage,
      stats
    }`),
    client.fetch(`*[_type == "aboutSection"][0]{
      _id,
      _type,
      heading,
      content,
      stats
    }`),
    client.fetch(`*[_type == "contactSection"][0]{
      _id,
      _type,
      heading,
      subheading,
      email,
      phone,
      address
    }`),
    client.fetch(`*[_type == "navigationSection"][0]{
      _id,
      _type,
      title,
      navItems,
      ctaButton
    }`),
    client.fetch(`*[_type == "footerSection"][0]{
      _id,
      _type,
      title,
      companyDescription,
      copyright,
      socialLinks
    }`)
  ])

  return (
    <div className="min-h-screen relative">
      <DayNightBackground />
      <Navigation data={navigationData} />
      <Hero data={heroData} />
      <About data={aboutData} />
      <Systems />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact data={contactData} />
      <Footer data={footerData} />
    </div>
  );
}
