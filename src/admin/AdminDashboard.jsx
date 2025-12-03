import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllGalleries, deleteGallery } from '../firebase/galleryService';

export default function AdminDashboard() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadGalleries();
  }, []);

  async function loadGalleries() {
    try {
      const data = await getAllGalleries();
      setGalleries(data);
    } catch (err) {
      console.error('Error loading galleries:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteGallery(id);
      setGalleries(galleries.filter(g => g.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting gallery:', err);
    }
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl text-charcoal font-serif">Dashboard</h1>
          <p className="text-stone-500 text-sm mt-1">Manage your client galleries</p>
        </div>
        <Link
          to="/admin/galleries/new"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-charcoal text-white text-sm hover:bg-stone-700 transition-colors"
        >
          <span className="mr-2">+</span>
          Create New Gallery
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-3xl font-serif text-charcoal">{galleries.length}</p>
          <p className="text-sm text-stone-500">Total Galleries</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-3xl font-serif text-charcoal">
            {galleries.filter(g => g.is_active).length}
          </p>
          <p className="text-sm text-stone-500">Active</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-3xl font-serif text-charcoal">
            {galleries.reduce((sum, g) => sum + (g.photo_count || 0), 0)}
          </p>
          <p className="text-sm text-stone-500">Total Photos</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-3xl font-serif text-charcoal">
            {galleries.filter(g => g.type === 'Wedding').length}
          </p>
          <p className="text-sm text-stone-500">Weddings</p>
        </div>
      </div>

      {/* Galleries Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : galleries.length === 0 ? (
        <div className="bg-white rounded shadow-sm p-12 text-center">
          <p className="text-stone-500 mb-4">No galleries yet</p>
          <Link
            to="/admin/galleries/new"
            className="inline-block px-4 py-2 bg-charcoal text-white text-sm hover:bg-stone-700 transition-colors"
          >
            Create Your First Gallery
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="bg-white rounded shadow-sm overflow-hidden">
              {/* Cover Image */}
              <div className="aspect-video bg-stone-100 relative">
                {gallery.cover_photo ? (
                  <img
                    src={gallery.cover_photo}
                    alt={gallery.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded ${
                  gallery.is_active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                }`}>
                  {gallery.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-serif text-lg text-charcoal">{gallery.name}</h3>
                <p className="text-sm text-stone-500 mt-1">
                  {gallery.type} · {gallery.date} · {gallery.photo_count || 0} photos
                </p>
                <p className="text-xs text-stone-400 mt-2 font-mono">
                  Password: {gallery.password}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                  <Link
                    to={`/admin/galleries/${gallery.id}`}
                    className="text-sm text-charcoal hover:text-stone-600 transition-colors"
                  >
                    Edit Gallery →
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(gallery.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded p-6 max-w-sm w-full">
            <h3 className="text-lg font-serif text-charcoal mb-2">Delete Gallery?</h3>
            <p className="text-sm text-stone-500 mb-6">
              This will permanently delete the gallery and all its photos. This cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-stone-600 hover:text-charcoal transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
