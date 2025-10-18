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
import { getHeroSection } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity';

export default async function Home() {
  const isDraftMode = draftMode().isEnabled
  const client = getClient(isDraftMode)

  // Fetch hero section data
  const heroData = await client.fetch(`*[_type == "heroSection"][0]{
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
  }`)

  return (
    <div className="min-h-screen relative">
      <DayNightBackground />
      <Navigation />
      <Hero data={heroData} />
      <About />
      <Systems />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
