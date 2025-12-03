import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getGalleryBySlug, verifyGalleryPassword, getGalleryPhotos } from '../firebase/galleryService';
import { downloadImage, downloadAllAsZip } from '../utils/download';

export default function GalleryView() {
  const { galleryId } = useParams();
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGalleryBySlug(galleryId);
        if (!data) {
          setNotFound(true);
        } else {
          setGallery(data);
        }
      } catch (err) {
        console.error('Error loading gallery:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, [galleryId]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const isValid = gallery.password === password;
      
      if (isValid) {
        setUnlocked(true);
        // Load photos
        try {
          const photoData = await getGalleryPhotos(gallery.id);
          setPhotos(photoData);
        } catch (err) {
          console.error('Error loading photos:', err);
          setPhotos([]);
        }
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      console.error('Error verifying password:', err);
      setError('Error verifying password. Please try again.');
    }
  };

  const handleDownload = async (photo) => {
    try {
      const filename = `${gallery.name.replace(/[^a-z0-9]/gi, '-')}-${photo.id}.jpg`;
      await downloadImage(photo.url, filename);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try again.');
    }
  };

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    
    setDownloading(true);
    setDownloadProgress(0);
    
    try {
      await downloadAllAsZip(photos, gallery.name, (progress) => {
        setDownloadProgress(progress);
      });
    } catch (err) {
      console.error('Download all failed:', err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center">
        <div className="spinner"></div>
      </main>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <>
        <SEO title="Gallery Not Found" />
        <main className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center">
          <div className="max-w-md w-full mx-4 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl text-charcoal mb-4 font-serif">Gallery Not Found</h1>
            <p className="text-stone-500 mb-6 font-sans">
              This gallery may have been removed or the link is incorrect.
            </p>
            <Link to="/galleries" className="btn-secondary">
              View All Galleries
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Password entry view
  if (!unlocked) {
    return (
      <>
        <SEO title={gallery?.name || 'Gallery'} />
        
        <main className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <Link 
              to="/galleries"
              className="inline-flex items-center text-stone-500 hover:text-charcoal transition-colors mb-8 text-sm font-sans"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Galleries
            </Link>
            
            <div className="bg-white p-10 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-stone-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h1 className="text-2xl text-charcoal text-center mb-2 font-serif">
                {gallery?.name}
              </h1>
              <p className="text-stone-500 text-center mb-8 text-sm font-sans">
                Enter the password provided to view your gallery
              </p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-elegant text-center"
                  autoFocus
                />
                
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  View Gallery
                </button>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Gallery view (unlocked)
  return (
    <>
      <SEO title={gallery?.name || 'Gallery'} />
      
      <main className="pt-20 md:pt-24 bg-cream min-h-screen">
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <Link 
                  to="/galleries"
                  className="inline-flex items-center text-stone-500 hover:text-charcoal transition-colors mb-4 text-sm font-sans"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Galleries
                </Link>
                <h1 className="text-3xl md:text-4xl text-charcoal font-serif font-light">
                  {gallery?.name}
                </h1>
                <p className="text-stone-500 font-sans text-sm mt-1">
                  {photos.length} photos · {gallery?.date}
                </p>
              </div>
              
              {photos.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  disabled={downloading}
                  className="mt-4 md:mt-0 btn-primary flex items-center"
                >
                  {downloading ? (
                    <>
                      <div className="spinner w-4 h-4 mr-2 border-2"></div>
                      {downloadProgress}%
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download All
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Photo Grid */}
            {photos.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-stone-500 font-sans">No photos in this gallery yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="group relative aspect-square cursor-pointer overflow-hidden bg-stone-100"
                    onClick={() => setLightboxImage(photo)}
                  >
                    <img 
                      src={photo.url}
                      alt={photo.caption || 'Gallery photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(photo);
                          }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
                          aria-label="Download photo"
                        >
                          <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div 
            className="lightbox-overlay p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={lightboxImage.url}
              alt={lightboxImage.caption || 'Gallery photo'}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4">
              {lightboxImage.caption && (
                <span className="text-white/80 text-sm font-sans">{lightboxImage.caption}</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(lightboxImage);
                }}
                className="px-6 py-2 bg-white text-charcoal text-xs tracking-widest uppercase font-sans hover:bg-stone-100 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}