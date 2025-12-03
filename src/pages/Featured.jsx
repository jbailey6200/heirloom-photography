import { useState } from 'react';
import SEO from '../components/SEO';

const FEATURED_PHOTOS = [
  // Weddings
  { id: 1, url: '/wedding-bride.png', alt: 'Bride with bouquet - North Alabama wedding photographer', category: 'wedding' },
  { id: 2, url: '/wedding-ceremony.png', alt: 'Barn wedding ceremony - Cullman Alabama wedding venue', category: 'wedding' },
  { id: 3, url: '/wedding-bridesmaids.png', alt: 'Bridesmaids laughing - Alabama wedding party photos', category: 'wedding' },
  { id: 4, url: '/wedding-groomsmen.png', alt: 'Groomsmen fun photo - North Alabama wedding photography', category: 'wedding' },
  { id: 5, url: '/wedding-kiss.png', alt: 'Bride and groom kissing - Wedding couple portrait', category: 'wedding' },
  { id: 6, url: '/wedding-bouquets.png', alt: 'Wedding bouquets - Floral details photography', category: 'wedding' },
  { id: 7, url: '/wedding-groom.png', alt: 'Groom getting ready - Wedding preparation photos', category: 'wedding' },
  { id: 8, url: '/wedding-prep.png', alt: 'Bride getting ready in mirror - Wedding day moments', category: 'wedding' },
  
  // Couples
  { id: 9, url: '/couples-1.png', alt: 'Couple kissing in field - Engagement photography Alabama', category: 'couples' },
  { id: 10, url: '/couples-2.png', alt: 'Golden hour couple portrait - Anniversary photography', category: 'couples' },
  { id: 11, url: '/couples-3.jpeg', alt: 'Romantic couple kiss in black and white - North Alabama couples photographer', category: 'couples' },
  { id: 12, url: '/couples-4.jpeg', alt: 'Happy couple walking arm in arm in golden field - Cullman engagement photographer', category: 'couples' },
  
  // Families
  { id: 13, url: '/family-1.png', alt: 'Extended family portrait in field - Family photography Alabama', category: 'family' },
  { id: 14, url: '/family-2.png', alt: 'Father and baby - Newborn family photography', category: 'family' },
  { id: 15, url: '/family-3.png', alt: 'Mother daughter portrait - Family session North Alabama', category: 'family' },
  { id: 16, url: '/family-4.jpeg', alt: 'Beautiful family portrait in Alabama countryside with hay bales - North Alabama family photographer', category: 'family' },
  
  // Portraits
  { id: 17, url: '/girl-1.jpeg', alt: 'Senior portrait with cello near rustic barn - Cullman senior photographer', category: 'portraits' },
  { id: 18, url: '/girl-2.jpeg', alt: 'Artistic cello portrait in lace dress - North Alabama portrait photography', category: 'portraits' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'couples', label: 'Couples' },
  { id: 'family', label: 'Families' },
  { id: 'portraits', label: 'Portraits' },
];

export default function Featured() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos = activeCategory === 'all' 
    ? FEATURED_PHOTOS 
    : FEATURED_PHOTOS.filter(p => p.category === activeCategory);

  const openLightbox = (photo, index) => {
    setLightboxImage(photo);
    setCurrentIndex(index);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIndex);
    setLightboxImage(filteredPhotos[nextIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prevIndex);
    setLightboxImage(filteredPhotos[prevIndex]);
  };

  return (
    <>
      <SEO 
        title="Portfolio"
        description="Browse the portfolio of Heirloom & Co. Photography. Wedding, engagement, and family photography serving Cullman, Huntsville, and North Alabama."
        url="/featured"
        keywords="wedding photography portfolio, Alabama wedding photos, North Alabama photographer gallery, Cullman family portraits, senior portraits Alabama"
      />
      
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] bg-charcoal flex items-center justify-center overflow-hidden">
          <img 
            src="/wedding-ceremony.png"
            alt="Barn wedding ceremony - North Alabama wedding photographer"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative text-center px-4">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 font-sans">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl text-white font-serif font-light mb-4">
              Featured Work
            </h1>
            <p className="text-white/80 text-lg font-serif italic max-w-xl mx-auto">
              "Your story deserves to be told as beautifully as it's lived."
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 md:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 text-xs tracking-[0.15em] uppercase font-sans transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-charcoal text-white'
                      : 'bg-transparent text-stone-500 hover:text-charcoal border border-stone-300 hover:border-charcoal'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photo Grid - Masonry Style */}
            <div className="gallery-grid">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="gallery-item cursor-pointer group"
                  onClick={() => openLightbox(photo, index)}
                >
                  <img 
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full shadow-sm group-hover:shadow-xl transition-shadow duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div 
            className="lightbox-overlay p-4"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 p-2"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 p-2"
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <img 
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans">
              {currentIndex + 1} / {filteredPhotos.length}
            </div>
          </div>
        )}
      </main>
    </>
  );
}