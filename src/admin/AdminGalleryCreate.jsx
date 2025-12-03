import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGallery, generatePassword } from '../firebase/galleryService';

export default function AdminGalleryCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: generatePassword(),
    clientEmail: '',
    type: 'Wedding',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const gallery = await createGallery(formData);
      navigate(`/admin/galleries/${gallery.id}`);
    } catch (err) {
      console.error('Error creating gallery:', err);
      alert('Failed to create gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const regeneratePassword = () => {
    setFormData({ ...formData, password: generatePassword() });
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl text-charcoal font-serif mb-6">Create New Gallery</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm text-stone-600 mb-2">Gallery Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-elegant"
            placeholder="e.g., Kathy & Scotty Wedding"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-2">Client Password *</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input-elegant flex-1 font-mono"
            />
            <button
              type="button"
              onClick={regeneratePassword}
              className="px-4 py-2 bg-stone-100 text-stone-600 text-sm hover:bg-stone-200 transition-colors"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Share this password with your client to access their gallery
          </p>
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-2">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="input-elegant"
            placeholder="client@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-stone-600 mb-2">Session Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-elegant"
            >
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Family">Family</option>
              <option value="Maternity">Maternity</option>
              <option value="Newborn">Newborn</option>
              <option value="Portrait">Portrait</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-2">Session Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-elegant"
              placeholder="e.g., November 2024"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 text-sm text-stone-600 hover:text-charcoal transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-charcoal text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Gallery'}
          </button>
        </div>
      </form>
    </div>
  );
}
