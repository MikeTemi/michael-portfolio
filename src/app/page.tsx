import Hero from '@/components/Hero';
import About from '@/components/About';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />

      {/* Rest of the page content for testing scroll effects */}
      <div className="pt-20">
        <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-950 dark:text-neutral-300 mb-6">
          Welcome to Michael's Portfolio
        </h1>
        <p className="mt-4 text-neutral-700 dark:text-neutral-400 text-lg mb-8">
          This is a test page to verify the theme toggle and scroll effects are working.
        </p>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
            About This Project
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400 mb-4">
            This portfolio showcases a modern navbar with smooth scroll effects, theme switching, and elegant hover animations. 
            The navbar transforms from a full-width header into a compact pill shape as you scroll down the page.
          </p>
          <p className="text-neutral-700 dark:text-neutral-400 mb-4">
            Key features include glassmorphism effects, rolling pin text animations, and seamless light/dark mode transitions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
            Technologies Used
          </h2>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-400 space-y-2">
            <li>Next.js 15 with App Router</li>
            <li>React 19 with TypeScript</li>
            <li>Tailwind CSS v4</li>
            <li>Lucide React Icons</li>
            <li>Custom Theme Provider</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
            Design Philosophy
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400 mb-4">
            The design focuses on clean, minimal aesthetics with subtle animations that enhance user experience without being distracting. 
            The color palette uses precise HSL values for optimal contrast and readability in both light and dark modes.
          </p>
          <p className="text-neutral-700 dark:text-neutral-400 mb-4">
            Scroll down to see the navbar transform into its compact pill form with beautiful glassmorphism effects.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
            Scroll Test Content
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <h3 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                  Section {num}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
            More Content for Scrolling
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400 mb-4">
            Keep scrolling to see how the navbar smoothly transitions. The effect triggers after scrolling 50px from the top.
            The navbar will compress into a pill shape while maintaining all its functionality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-lg">
              <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                Feature 1
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Responsive design that works beautifully on all devices and screen sizes.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-lg">
              <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                Feature 2
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Smooth animations and transitions that enhance the user experience.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-4 text-center">
            End of Test Content
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400 text-center">
            Scroll back up to see the navbar return to its full-width state.
          </p>
        </section>
        </div>
      </div>
    </div>
  );
}
