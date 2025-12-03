import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  getGalleryById,
  updateGallery,
  getGalleryPhotos,
  uploadPhoto,
  deletePhoto,
  setGalleryCover,
  generatePassword
} from '../firebase/galleryService';

export default function AdminGalleryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    loadGallery();
  }, [id]);

  async function loadGallery() {
    try {
      const [galleryData, photosData] = await Promise.all([
        getGalleryById(id),
        getGalleryPhotos(id)
      ]);
      setGallery(galleryData);
      setPhotos(photosData);
    } catch (err) {
      console.error('Error loading gallery:', err);
      showToast('Failed to load gallery', 'error');
    } finally {
      setLoading(false);
    }
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    
    setUploading(true);
    setUploadProgress(0);
    setUploadErrors([]);

    const total = acceptedFiles.length;
    let completed = 0;
    const errors = [];

    for (const file of acceptedFiles) {
      try {
        console.log(`Uploading: ${file.name}`);
        const photo = await uploadPhoto(id, file);
        console.log('Upload result:', photo);
        setPhotos(prev => [...prev, photo]);
        completed++;
        setUploadProgress(Math.round((completed / total) * 100));
      } catch (err) {
        console.error(`Upload failed for ${file.name}:`, err);
        errors.push(`${file.name}: ${err.message}`);
        completed++;
        setUploadProgress(Math.round((completed / total) * 100));
      }
    }

    setUploading(false);
    setUploadProgress(0);
    
    if (errors.length > 0) {
      setUploadErrors(errors);
      showToast(`${errors.length} file(s) failed to upload`, 'error');
    } else {
      showToast(`${total} photo(s) uploaded successfully!`, 'success');
    }
    
    // Refresh to get updated photo count
    loadGallery();
  }, [id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    disabled: uploading
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateGallery(id, {
        name: gallery.name,
        password: gallery.password,
        client_email: gallery.client_email,
        type: gallery.type,
        date: gallery.date,
        is_active: gallery.is_active
      });
      showToast('Gallery saved successfully!', 'success');
    } catch (err) {
      console.error('Error saving:', err);
      showToast('Failed to save gallery', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await deletePhoto(photoId, id);
      setPhotos(photos.filter(p => p.id !== photoId));
      showToast('Photo deleted', 'success');
    } catch (err) {
      console.error('Error deleting photo:', err);
      showToast('Failed to delete photo', 'error');
    }
  };

  const handleSetCover = async (photoUrl) => {
    try {
      await setGalleryCover(id, photoUrl);
      setGallery({ ...gallery, cover_photo: photoUrl });
      showToast('Cover photo updated', 'success');
    } catch (err) {
      console.error('Error setting cover:', err);
      showToast('Failed to set cover photo', 'error');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="p-8 text-center">
        <p className="text-stone-500 mb-4">Gallery not found</p>
        <button
          onClick={() => navigate('/admin')}
          className="text-charcoal hover:text-stone-600 text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-stone-500 hover:text-charcoal transition-colors mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl text-charcoal font-serif">{gallery.name}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-charcoal text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded shadow-sm p-6 space-y-4">
            <h2 className="font-serif text-lg text-charcoal mb-4">Gallery Settings</h2>

            <div>
              <label className="block text-sm text-stone-600 mb-1">Name</label>
              <input
                type="text"
                value={gallery.name}
                onChange={(e) => setGallery({ ...gallery, name: e.target.value })}
                className="input-elegant"
              />
            </div>

            <div>
              <label className="block text-sm text-stone-600 mb-1">Password</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={gallery.password}
                  onChange={(e) => setGallery({ ...gallery, password: e.target.value })}
                  className="input-elegant flex-1 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setGallery({ ...gallery, password: generatePassword() })}
                  className="px-3 py-2 bg-stone-100 text-stone-600 text-xs hover:bg-stone-200"
                >
                  New
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-stone-600 mb-1">Client Email</label>
              <input
                type="email"
                value={gallery.client_email || ''}
                onChange={(e) => setGallery({ ...gallery, client_email: e.target.value })}
                className="input-elegant"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-stone-600 mb-1">Type</label>
                <select
                  value={gallery.type}
                  onChange={(e) => setGallery({ ...gallery, type: e.target.value })}
                  className="input-elegant"
                >
                  <option>Wedding</option>
                  <option>Engagement</option>
                  <option>Family</option>
                  <option>Maternity</option>
                  <option>Newborn</option>
                  <option>Portrait</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-stone-600 mb-1">Date</label>
                <input
                  type="text"
                  value={gallery.date || ''}
                  onChange={(e) => setGallery({ ...gallery, date: e.target.value })}
                  className="input-elegant"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-sm text-stone-600">Visible to clients</span>
              <button
                onClick={() => setGallery({ ...gallery, is_active: !gallery.is_active })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  gallery.is_active ? 'bg-green-500' : 'bg-stone-300'
                }`}
              >
                <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  gallery.is_active ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Gallery Link */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-sm text-stone-600 mb-1">Gallery Link</label>
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/galleries/${gallery.slug}`}
                className="input-elegant text-xs bg-stone-50"
                onClick={(e) => {
                  e.target.select();
                  navigator.clipboard.writeText(e.target.value);
                  showToast('Link copied!', 'success');
                }}
              />
              <p className="text-xs text-stone-400 mt-1">Click to copy</p>
            </div>
          </div>
        </div>

        {/* Photos Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-charcoal">
                Photos ({photos.length})
              </h2>
            </div>

            {/* Upload Errors */}
            {uploadErrors.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 font-medium mb-2">Upload Errors:</p>
                <ul className="text-sm text-red-600 list-disc pl-5">
                  {uploadErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
                <button 
                  onClick={() => setUploadErrors([])}
                  className="mt-2 text-xs text-red-500 hover:text-red-700"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Upload Zone */}
            <div
              {...getRootProps()}
              className={`dropzone mb-6 ${isDragActive ? 'active' : ''} ${uploading ? 'opacity-75 cursor-wait' : ''}`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="py-4">
                  <div className="w-full h-2 bg-stone-200 rounded overflow-hidden">
                    <div 
                      className="h-full bg-charcoal transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-stone-500 mt-2">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <>
                  <svg className="w-10 h-10 text-stone-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-stone-500">
                    {isDragActive ? 'Drop photos here...' : 'Drag photos here or click to upload'}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">JPG, PNG, WEBP supported</p>
                </>
              )}
            </div>

            {/* Photo Grid */}
            {photos.length === 0 ? (
              <p className="text-center text-stone-400 py-8">No photos yet. Upload some!</p>
            ) : (
              <div className="photo-grid-admin">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group aspect-square bg-stone-100">
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
                      }}
                    />
                    {gallery.cover_photo === photo.url && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-charcoal text-white text-xs">
                        Cover
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleSetCover(photo.url)}
                        className="p-1.5 bg-white rounded text-xs mr-1 hover:bg-stone-100"
                        title="Set as cover"
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="p-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}