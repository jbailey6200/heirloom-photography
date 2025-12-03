import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Marie"
        description="Meet Marie, the wedding and lifestyle photographer behind Heirloom & Co. Photography. Serving Cullman, Huntsville, and North Alabama with timeless photography."
        url="/about"
        keywords="Alabama wedding photographer, Cullman photographer, about Heirloom photography, North Alabama photographer"
      />
      
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Image */}
            <div className="order-1 md:order-2">
              <div className="relative">
                <img 
                  src="/Marie.png"
                  alt="Marie - Wedding and lifestyle photographer serving Cullman, Huntsville, and North Alabama"
                  className="w-full rounded-sm shadow-xl"
                />
                {/* Decorative frame */}
                <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-sage/30 rounded-sm -z-10" />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 md:order-1">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                About
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8 font-serif font-light leading-tight">
                Hi, I'm Marie,
                <br />
                the face behind the camera!
              </h1>
              
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-serif">
                <p>
                  I'm a wedding, family, and couples photographer with a heart for capturing 
                  real emotion and timeless stories. I specialize in weddings, not just behind 
                  the lens, but on the coordinating side too! I know exactly how to keep a day 
                  running smoothly while preserving every moment that matters.
                </p>
                <p>
                  My son and my husband are my world. I'm very blessed that they wholeheartedly 
                  support my crazy endeavors.
                </p>
                <p>
                  I'm a naturally bubbly, people-loving person, and my goal is to make every 
                  session fun, comfortable, and meaningful. I believe in creating heirlooms 
                  that your family will hold onto for generations... the kind of photos that 
                  make you smile years down the road.
                </p>
                <p className="italic text-stone-700 border-l-2 border-sage pl-6">
                  I can't wait to help you freeze the moments you never want to forget.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-block mt-10 btn-primary"
              >
                Let's Connect
              </Link>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                The Experience
              </p>
              <h2 className="text-3xl md:text-4xl text-charcoal font-serif font-light">
                What to Expect Working with Me
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Consultation',
                  desc: 'We\'ll chat about your vision, your story, and what matters most to you.'
                },
                {
                  step: '02',
                  title: 'The Session',
                  desc: 'A relaxed, fun experience where I guide you through natural poses.'
                },
                {
                  step: '03',
                  title: 'Your Gallery',
                  desc: 'Receive your beautifully edited images in a private online gallery.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8">
                  <span className="text-4xl font-script text-sage/60 block mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-xl text-charcoal mb-3 font-serif">{item.title}</h3>
                  <p className="text-stone-500 font-sans text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blush/30">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl text-charcoal mb-6 font-serif font-light italic">
              "Let's capture your story"
            </h2>
            <p className="text-stone-600 mb-10 font-serif text-lg">
              I'd love to hear from you and learn more about what you're celebrating.
            </p>
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}