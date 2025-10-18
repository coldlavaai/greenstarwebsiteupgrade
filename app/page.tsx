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

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <DayNightBackground />
      <Navigation />
      <Hero />
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
