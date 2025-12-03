import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const WEDDING_PACKAGES = [
  {
    title: 'Full Wedding Day',
    price: '$1,500',
    popular: true,
    features: [
      'Up to 10 Hours of coverage',
      '300+ Edited Digital Images',
      'Online Gallery with Downloads',
      'Second Shooter Available (+$300)',
      'Complimentary Engagement Session'
    ],
    deposit: '50% Deposit to Book',
    balance: '50% Due 2 weeks prior'
  },
  {
    title: 'Half Wedding Day',
    price: '$1,000',
    features: [
      'Up to 5 Hours of coverage',
      'Ceremony & Reception',
      '150+ Edited Digital Images',
      'Online Gallery with Downloads'
    ],
    deposit: '50% Deposit to Book',
    balance: '50% Due 2 weeks prior'
  },
  {
    title: 'Elopement',
    price: '$500',
    features: [
      'Up to 3 Hours of coverage',
      'Intimate ceremony & portraits',
      '50+ Edited Digital Images',
      'Online Gallery with Downloads'
    ],
    deposit: 'Full Payment at Booking'
  }
];

const PORTRAIT_PACKAGES = [
  {
    title: 'Family Session',
    price: '$200',
    features: [
      '1.5 Hours of coverage',
      '25+ Edited Images',
      'Online Gallery',
      'Location of your choice'
    ]
  },
  {
    title: 'Couples/Engagement',
    price: '$150',
    features: [
      '1 Hour of coverage',
      '20+ Edited Images',
      'Online Gallery',
      'Perfect for save-the-dates'
    ]
  },
  {
    title: 'Maternity',
    price: '$200',
    features: [
      '1.5 Hours of coverage',
      '25+ Edited Images',
      'Online Gallery',
      'Indoor or Outdoor'
    ]
  },
  {
    title: 'Newborn',
    price: '$200',
    features: [
      '2 Hours of coverage',
      '25+ Edited Images',
      'Online Gallery',
      'In-home or Studio'
    ]
  }
];

export default function Pricing() {
  return (
    <>
      <SEO 
        title="Pricing"
        description="Wedding and portrait photography pricing for Heirloom & Co. Photography. Packages start at $150 for couples and $500 for elopements. Serving North Alabama."
        url="/pricing"
        keywords="wedding photography prices Alabama, Cullman photographer cost, North Alabama wedding packages"
      />
      
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
              Pricing
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-charcoal font-serif font-light mb-6">
              Photography Packages
            </h1>
            <p className="text-stone-600 text-lg font-serif max-w-2xl mx-auto">
              Every package includes a personal online gallery with unlimited downloads 
              for you and your family. No hidden fees, no print minimums.
            </p>
          </div>
        </section>

        {/* Wedding Packages */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl text-charcoal font-serif font-light">
                Wedding & Elopement
              </h2>
              <div className="w-16 h-px bg-sage mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {WEDDING_PACKAGES.map((pkg, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-8 ${
                    pkg.popular 
                      ? 'bg-charcoal text-white' 
                      : 'bg-stone-50 border border-stone-100'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute top-0 right-0 bg-sage text-white text-xs tracking-wider uppercase px-3 py-1 font-sans">
                      Popular
                    </span>
                  )}
                  
                  <h3 className={`text-xl font-serif mb-2 ${pkg.popular ? 'text-white' : 'text-charcoal'}`}>
                    {pkg.title}
                  </h3>
                  <p className={`text-3xl font-serif mb-6 ${pkg.popular ? 'text-white' : 'text-charcoal'}`}>
                    {pkg.price}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li 
                        key={i} 
                        className={`flex items-start text-sm font-sans ${
                          pkg.popular ? 'text-stone-200' : 'text-stone-600'
                        }`}
                      >
                        <svg className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                          pkg.popular ? 'text-sage' : 'text-sage'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`text-xs border-t pt-4 font-sans ${
                    pkg.popular ? 'border-stone-600 text-stone-300' : 'border-stone-200 text-stone-500'
                  }`}>
                    <p>{pkg.deposit}</p>
                    {pkg.balance && <p className="mt-1">{pkg.balance}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portrait Sessions */}
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl text-charcoal font-serif font-light">
                Portrait Sessions
              </h2>
              <div className="w-16 h-px bg-sage mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PORTRAIT_PACKAGES.map((pkg, idx) => (
                <div key={idx} className="bg-white p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg text-charcoal font-serif mb-2">{pkg.title}</h3>
                  <p className="text-2xl text-charcoal font-serif mb-4">{pkg.price}</p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="text-stone-500 text-sm font-sans flex items-start">
                        <span className="text-sage mr-2">·</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mini Sessions Note */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-blush/40 px-8 py-6 max-w-lg">
                <h3 className="text-lg text-charcoal font-serif mb-2">Mini Sessions</h3>
                <p className="text-stone-600 text-sm font-sans">
                  Seasonal mini sessions available throughout the year! 
                  Follow me on <a href="https://instagram.com/heirloomphotosco" target="_blank" rel="noopener noreferrer" className="underline hover:text-charcoal">Instagram</a> for announcements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h3 className="text-2xl md:text-3xl text-charcoal font-serif font-light mb-4">
              Need Something Custom?
            </h3>
            <p className="text-stone-600 mb-8 font-serif text-lg">
              Every love story is unique. Let's chat about creating the perfect package for your needs.
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