import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Featured photos for homepage - using Marie's actual work
const heroPhotos = [
  '/wedding-bride.png',
  '/wedding-ceremony.png',
  '/wedding-kiss.png',
  '/wedding-bridesmaids.png',
];

export default function Home() {
  return (
    <>
      <SEO 
        url="/"
        keywords="wedding photographer Cullman Alabama, North Alabama wedding photographer, Huntsville wedding photography, family photographer Alabama"
      />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-stone-100" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-blush/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-5xl mx-auto px-4 text-center py-20">
            {/* Subheading */}
            <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-6 font-sans fade-in-up">
              Wedding & Lifestyle Photography
            </p>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight font-serif font-light fade-in-up delay-100">
              Capturing moments that become
              <br />
              <span className="font-script text-5xl md:text-6xl lg:text-7xl text-stone-700 block mt-2">
                family heirlooms
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-2xl mx-auto font-serif leading-relaxed fade-in-up delay-200">
              Serving Cullman, Huntsville, Decatur, and all of North Alabama.
              <br className="hidden md:block" />
              Creating timeless memories for generations to treasure.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up delay-300">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Book Your Session
              </Link>
              <Link
                to="/featured"
                className="btn-secondary"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Photo Strip - Horizontally scrollable on mobile */}
        <section className="py-4 bg-white">
          {/* Mobile: horizontal scroll, Desktop: equal columns */}
          <div className="
            flex gap-4 px-4
            overflow-x-auto md:overflow-x-visible
            snap-x snap-mandatory md:snap-none
            scrollbar-hide
            -mx-4 px-4 md:mx-0 md:px-4
          ">
            {heroPhotos.map((photo, idx) => (
              <div 
                key={idx} 
                className="
                  flex-shrink-0 md:flex-shrink md:flex-1
                  w-[75vw] sm:w-[50vw] md:w-auto
                  aspect-[4/5] 
                  overflow-hidden 
                  img-hover-zoom
                  snap-center md:snap-align-none
                "
              >
                <img 
                  src={photo} 
                  alt={`Wedding photography sample ${idx + 1} - North Alabama photographer`}
                  className="w-full h-full object-cover"
                  loading={idx > 1 ? 'lazy' : 'eager'}
                />
              </div>
            ))}
          </div>
          
          {/* Scroll indicator for mobile */}
          <div className="flex justify-center mt-3 md:hidden">
            <p className="text-xs text-stone-400 font-sans flex items-center">
              <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Swipe to see more
            </p>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                About
              </p>
              <h2 className="text-3xl md:text-4xl text-charcoal mb-6 font-serif font-light">
                Hi, I'm Marie
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6 text-lg font-serif">
                I'm a wedding, family, and couples photographer with a heart for capturing 
                real emotion and timeless stories. I specialize in weddings—not just behind 
                the lens, but on the coordinating side too.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8 font-serif">
                My goal is to make every session fun, comfortable, and meaningful. 
                I believe in creating heirlooms that your family will hold onto for generations.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-charcoal text-sm tracking-[0.15em] uppercase font-sans link-underline"
              >
                Read My Story
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img 
                  src="/Marie.png"
                  alt="Marie - Cullman Alabama wedding photographer"
                  className="w-full rounded-sm shadow-xl"
                />
                {/* Decorative frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-taupe/20 rounded-sm -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 md:py-32 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                Services
              </p>
              <h2 className="text-3xl md:text-4xl text-charcoal font-serif font-light">
                What I Photograph
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Weddings', 
                  desc: 'Full day coverage capturing every beautiful moment of your celebration.',
                  image: '/wedding-ceremony.png'
                },
                { 
                  title: 'Couples', 
                  desc: 'Engagement sessions and anniversary portraits celebrating your love story.',
                  image: '/couples-1.png'
                },
                { 
                  title: 'Families', 
                  desc: 'Maternity, newborn, and family sessions to treasure for generations.',
                  image: '/family-1.png'
                },
              ].map((service, idx) => (
                <div 
                  key={idx}
                  className="bg-white text-center card-hover overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={`${service.title} photography - North Alabama`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl text-charcoal mb-3 font-serif">{service.title}</h3>
                    <p className="text-stone-500 text-sm font-sans leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/pricing"
                className="btn-secondary"
              >
                View Pricing Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="quote-mark">"</span>
            <blockquote className="text-2xl md:text-3xl text-charcoal font-serif font-light italic leading-relaxed -mt-8">
              Marie captured the most amazing pictures from our wedding day. 
              They will be something that I will treasure forever.
            </blockquote>
            <p className="mt-8 text-sm tracking-[0.15em] uppercase text-taupe font-sans">
              — Sarah & Michael, Huntsville Wedding
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-charcoal text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 font-sans">
              Ready to begin?
            </p>
            <h2 className="text-3xl md:text-4xl mb-6 font-serif font-light">
              Let's create something timeless together
            </h2>
            <p className="text-stone-300 mb-10 text-lg font-serif">
              I'd love to hear your story and help you preserve these beautiful moments.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-white text-charcoal text-sm tracking-[0.15em] uppercase font-sans hover:bg-stone-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}