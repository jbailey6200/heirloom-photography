import { supabase, STORAGE_BUCKET } from './supabaseConfig';

// =====================================================
// GALLERY SERVICE
// All CRUD operations for galleries and photos
// =====================================================

// Helper to generate URL-safe slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36);
}

// =====================================================
// GALLERY OPERATIONS
// =====================================================

/**
 * Create a new gallery
 */
export async function createGallery({ name, password, clientEmail, type, date }) {
  const slug = generateSlug(name);
  
  const { data, error } = await supabase
    .from('galleries')
    .insert([{
      name,
      slug,
      password,
      client_email: clientEmail,
      type: type || 'Wedding',
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      photo_count: 0,
      is_active: true
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating gallery:', error);
    throw error;
  }
  return data;
}

/**
 * Get all galleries (for admin)
 */
export async function getAllGalleries() {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching galleries:', error);
    throw error;
  }
  return data || [];
}

/**
 * Get active galleries (for public display)
 */
export async function getActiveGalleries() {
  const { data, error } = await supabase
    .from('galleries')
    .select('id, name, slug, date, type, cover_photo, photo_count')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active galleries:', error);
    throw error;
  }
  return data || [];
}

/**
 * Get a single gallery by slug
 */
export async function getGalleryBySlug(slug) {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching gallery by slug:', error);
    throw error;
  }
  return data;
}

/**
 * Get a single gallery by ID
 */
export async function getGalleryById(id) {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching gallery by ID:', error);
    throw error;
  }
  return data;
}

/**
 * Verify gallery password
 */
export async function verifyGalleryPassword(galleryId, password) {
  const { data, error } = await supabase
    .from('galleries')
    .select('password')
    .eq('id', galleryId)
    .single();

  if (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
  return data.password === password;
}

/**
 * Update gallery details
 */
export async function updateGallery(id, updates) {
  const { data, error } = await supabase
    .from('galleries')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating gallery:', error);
    throw error;
  }
  return data;
}

/**
 * Update gallery password
 */
export async function updateGalleryPassword(id, newPassword) {
  return updateGallery(id, { password: newPassword });
}

/**
 * Delete a gallery and all its photos
 */
export async function deleteGallery(id) {
  // First, get all photos to delete from storage
  const { data: photos } = await supabase
    .from('photos')
    .select('url')
    .eq('gallery_id', id);

  // Delete photos from storage
  if (photos && photos.length > 0) {
    const filePaths = photos.map(p => {
      try {
        const url = new URL(p.url);
        // Extract path after /storage/v1/object/public/photos/
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.indexOf(STORAGE_BUCKET);
        if (bucketIndex !== -1) {
          return pathParts.slice(bucketIndex + 1).join('/');
        }
        return pathParts.slice(-2).join('/');
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove(filePaths);
      
      if (storageError) {
        console.error('Error deleting photos from storage:', storageError);
      }
    }
  }

  // Delete gallery (photos will cascade delete from DB)
  const { error } = await supabase
    .from('galleries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting gallery:', error);
    throw error;
  }
  return true;
}

// =====================================================
// PHOTO OPERATIONS
// =====================================================

/**
 * Upload a photo to a gallery
 */
export async function uploadPhoto(galleryId, file, caption = '') {
  // Generate unique filename
  const fileExt = file.name.split('.').pop().toLowerCase();
  const fileName = `${galleryId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

  console.log(`Uploading to bucket: ${STORAGE_BUCKET}, path: ${fileName}`);

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  console.log('Upload successful:', uploadData);

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  const publicUrl = urlData.publicUrl;
  console.log('Public URL:', publicUrl);

  // Insert photo record into database
  const { data: photo, error: insertError } = await supabase
    .from('photos')
    .insert([{
      gallery_id: galleryId,
      url: publicUrl,
      filename: file.name,
      caption: caption
    }])
    .select()
    .single();

  if (insertError) {
    console.error('Database insert error:', insertError);
    // Try to clean up the uploaded file
    await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);
    throw new Error(`Failed to save photo record: ${insertError.message}`);
  }

  // Update photo count and set cover if first photo
  const { data: gallery } = await supabase
    .from('galleries')
    .select('photo_count, cover_photo')
    .eq('id', galleryId)
    .single();

  const updateData = {
    photo_count: (gallery?.photo_count || 0) + 1,
    updated_at: new Date().toISOString()
  };

  // Set as cover photo if it's the first one
  if (!gallery?.cover_photo) {
    updateData.cover_photo = publicUrl;
  }

  await supabase
    .from('galleries')
    .update(updateData)
    .eq('id', galleryId);

  return photo;
}

/**
 * Get all photos for a gallery
 */
export async function getGalleryPhotos(galleryId) {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('gallery_id', galleryId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
  return data || [];
}

/**
 * Delete a photo
 */
export async function deletePhoto(photoId, galleryId) {
  // Get photo URL first
  const { data: photo, error: fetchError } = await supabase
    .from('photos')
    .select('url')
    .eq('id', photoId)
    .single();

  if (fetchError) {
    console.error('Error fetching photo for deletion:', fetchError);
    throw fetchError;
  }

  if (photo?.url) {
    try {
      // Extract file path from URL
      const url = new URL(photo.url);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.indexOf(STORAGE_BUCKET);
      let filePath;
      
      if (bucketIndex !== -1) {
        filePath = pathParts.slice(bucketIndex + 1).join('/');
      } else {
        filePath = pathParts.slice(-2).join('/');
      }
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);
      
      if (storageError) {
        console.error('Error deleting from storage:', storageError);
      }
    } catch (e) {
      console.error('Error parsing photo URL:', e);
    }
  }

  // Delete record from database
  const { error: deleteError } = await supabase
    .from('photos')
    .delete()
    .eq('id', photoId);

  if (deleteError) {
    console.error('Error deleting photo record:', deleteError);
    throw deleteError;
  }

  // Update photo count
  const { data: gallery } = await supabase
    .from('galleries')
    .select('photo_count')
    .eq('id', galleryId)
    .single();

  await supabase
    .from('galleries')
    .update({
      photo_count: Math.max(0, (gallery?.photo_count || 1) - 1),
      updated_at: new Date().toISOString()
    })
    .eq('id', galleryId);

  return true;
}

/**
 * Update photo caption or order
 */
export async function updatePhoto(photoId, updates) {
  const { data, error } = await supabase
    .from('photos')
    .update(updates)
    .eq('id', photoId)
    .select()
    .single();

  if (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
  return data;
}

/**
 * Set gallery cover photo
 */
export async function setGalleryCover(galleryId, photoUrl) {
  return updateGallery(galleryId, { cover_photo: photoUrl });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Generate a random secure password
 */
export function generatePassword(length = 12) {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export default {
  createGallery,
  getAllGalleries,
  getActiveGalleries,
  getGalleryBySlug,
  getGalleryById,
  verifyGalleryPassword,
  updateGallery,
  updateGalleryPassword,
  deleteGallery,
  uploadPhoto,
  getGalleryPhotos,
  deletePhoto,
  updatePhoto,
  setGalleryCover,
  generatePassword
};