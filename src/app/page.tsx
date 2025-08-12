import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Additional content for scroll testing */}
      <div className="pt-20 pb-20">
        <div className="p-8 max-w-4xl mx-auto">
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
              More Content Coming Soon
            </h2>
            <p className="text-neutral-700 dark:text-neutral-400">
              Additional sections like Contact, Blog, and Experience will be added here.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
