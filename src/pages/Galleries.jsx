import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getActiveGalleries } from '../firebase/galleryService';

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGalleries() {
      try {
        const data = await getActiveGalleries();
        setGalleries(data);
        setError(null);
      } catch (err) {
        console.error('Error loading galleries:', err);
        setError('Unable to load galleries. Please try again later.');
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }

    loadGalleries();
  }, []);

  return (
    <>
      <SEO 
        title="Client Galleries"
        description="Access your password-protected photo gallery from your Heirloom & Co. Photography session. Download your beautiful wedding and portrait photos."
        url="/galleries"
      />
      
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-cream min-h-screen">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-taupe mb-4 font-sans">
                Client
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-charcoal font-serif font-light">
                Galleries
              </h1>
              <p className="text-stone-500 mt-4 font-sans text-sm max-w-md mx-auto">
                Select your gallery below and enter the password provided to view and download your photos.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-20">
                <div className="spinner"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Gallery Grid */}
            {!loading && !error && galleries.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleries.map((gallery) => (
                  <Link
                    key={gallery.id}
                    to={`/galleries/${gallery.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] overflow-hidden mb-4 bg-stone-100">
                      {gallery.cover_photo ? (
                        <img 
                          src={gallery.cover_photo}
                          alt={`${gallery.name} - ${gallery.type} photography session`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-full h-full items-center justify-center text-stone-300 ${gallery.cover_photo ? 'hidden' : 'flex'}`}
                      >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl text-charcoal group-hover:text-stone-600 transition-colors font-serif">
                      {gallery.name}
                    </h3>
                    <p className="text-sm text-stone-500 font-sans mt-1">
                      {gallery.type} · {gallery.date} · {gallery.photo_count || 0} photos
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {/* No Galleries */}
            {!loading && !error && galleries.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl text-charcoal mb-2 font-serif">No Galleries Available</h3>
                <p className="text-stone-500 text-sm font-sans">
                  Check back soon or contact me for access to your photos.
                </p>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-16 text-center">
              <p className="text-stone-400 text-sm font-sans">
                Don't see your gallery?{' '}
                <Link to="/contact" className="text-charcoal underline hover:text-stone-600">
                  Contact me
                </Link>{' '}
                for assistance.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}