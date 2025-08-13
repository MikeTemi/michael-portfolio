import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Specialty from '@/components/Specialty';
import TechStackDivider from '@/components/TechStackDivider';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Specialty Section */}
      <Specialty />

      {/* Tech Stack Divider */}
      <TechStackDivider />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
