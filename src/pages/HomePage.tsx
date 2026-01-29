import { useEffect, useRef, useState } from 'react';
import Navigation from '../components/layout/Navigation';
import AnimatedCycleText from '../components/common/AnimatedCycleText';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { images } from '../constants/images';

const HomePage = () => {
  const [visibleCounters, setVisibleCounters] = useState({
    row1: false,
    row2: false,
  });
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const row = target.dataset.row;
            if (row) {
              setVisibleCounters((prev) => ({ ...prev, [row]: true }));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const rows = document.querySelectorAll('[data-row]');
    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Gradually increase opacity as user scrolls
      const opacity = Math.min((scrolled / windowHeight) * 0.8, 0.8);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black relative font-lt-wave">
      {/* Navigation */}
      <Navigation />

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={images.homeHero}
          alt="Next Star Soccer Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #1e40af 0%, #10b981 100%)';
            }
          }}
        />
        {/* Single gradient overlay that progressively darkens */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-100"
          style={{ 
            opacity: scrollOpacity
          }}
        />
      </div>

      {/* Scrolling Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="h-screen w-full flex items-center justify-center">
          <AnimatedCycleText />
        </div>

        {/* Content sections - no additional overlays, just transparent backgrounds */}
        <div className="flex-grow">
          {/* Stats Section */}
          <section ref={statsRef} className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-white mb-16">
                Next Star In Numbers
              </h2>
              <div className="space-y-16">
                {/* Row 1 */}
                <div data-row="row1" className="grid grid-cols-3 gap-8">
                  <AnimatedCounter
                    isVisible={visibleCounters.row1}
                    endValue={1000}
                    label="Youth Players"
                    suffix="+"
                  />
                  <AnimatedCounter
                    isVisible={visibleCounters.row1}
                    endValue={100}
                    label="Professional Players"
                    suffix="+"
                  />
                  <AnimatedCounter
                    isVisible={visibleCounters.row1}
                    endValue={50}
                    label={'National & Youth\nNational Team Players'}
                    suffix="+"
                  />
                </div>

                {/* Row 2 */}
                <div data-row="row2" className="grid grid-cols-3 gap-8">
                  <AnimatedCounter
                    isVisible={visibleCounters.row2}
                    endValue={200}
                    label={'Collegiate NCAA\nDivision I Players'}
                    suffix="+"
                  />
                  <AnimatedCounter
                    isVisible={visibleCounters.row2}
                    endValue={50}
                    label={'Collegiate NCAA\nDivision II Players'}
                    suffix="+"
                  />
                  <AnimatedCounter
                    isVisible={visibleCounters.row2}
                    endValue={100}
                    label={'Collegiate NCAA\nDivision III Players'}
                    suffix="+"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-white mb-8">
                About Next Star
              </h2>
              <p className="text-lg text-white text-center leading-relaxed mb-6">
                At Next Star, we believe that passion and diligence are the driving
                forces behind success. Led by a team of experienced coaches and
                ex-pros, our mission is to nurture these qualities in every player
                while providing a profound understanding of the game.
              </p>
              <p className="text-lg text-white text-center leading-relaxed mb-6">
                Our approach extends beyond mere technical and physical development;
                we offer invaluable insights into the intricate dynamics of youth
                leagues, MLS academy programs, college recruitment, and professional
                pathways.
              </p>
              <p className="text-lg text-white text-center leading-relaxed mb-6">
                Additionally, we guide sports psychology, nutrition, and discipline,
                recognizing that holistic development is key to achieving
                excellence. We understand parents' vital role in a player's journey,
                and we prioritize their involvement and support.
              </p>
              <p className="text-lg text-white text-center leading-relaxed">
                Specializing in comprehensive soccer training, Next Star also
                delivers tailored programs designed to enhance technical skills and
                physical prowess for individuals and groups alike. Our services
                encompass mentorship, counseling, and consulting for academies,
                colleges, and aspiring professionals.
              </p>
            </div>
          </section>

          {/* Instagram Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Follow Us on Instagram
              </h2>
              <p className="text-xl text-white mb-8">
                Stay connected with Next Star Soccer
              </p>
              <button
                onClick={() => setShowInstagramModal(true)}
                className="inline-block"
              >
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="bg-black px-8 py-6 rounded-2xl hover:bg-gray-900 transition-colors">
                    <div className="flex items-center gap-4">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-white text-2xl font-bold">@nextstarsoccer</div>
                        <div className="text-gray-300 text-sm">Click to view our profile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </section>
        </div>

        {/* Footer - Now at the bottom of content, above background */}
        <footer className="relative z-10 bg-black py-8 px-4 mt-auto">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Next Star Soccer. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Instagram Modal with WebView-style iframe */}
      {showInstagramModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setShowInstagramModal(false)}
        >
          <div 
            className="relative bg-white rounded-lg w-full max-w-md h-[680px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInstagramModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Instagram WebView-style iframe with mobile user agent simulation */}
            <iframe
              src="https://www.instagram.com/nextstarsoccer/"
              className="w-full h-full border-0 rounded-lg"
              title="Instagram Profile"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{
                colorScheme: 'dark'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
