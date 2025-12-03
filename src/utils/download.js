import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Download a single image
 */
export async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

/**
 * Download all images as a ZIP file
 */
export async function downloadAllAsZip(photos, galleryName, onProgress) {
  const zip = new JSZip();
  const folder = zip.folder(galleryName.replace(/[^a-z0-9]/gi, '-'));
  
  let completed = 0;
  const total = photos.length;

  // Download each photo and add to zip
  const promises = photos.map(async (photo, index) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      
      // Get file extension from URL or default to jpg
      const ext = photo.filename?.split('.').pop() || 'jpg';
      const filename = `${String(index + 1).padStart(3, '0')}-${photo.caption || 'photo'}.${ext}`;
      
      folder.file(filename, blob);
      
      completed++;
      if (onProgress) {
        onProgress(Math.round((completed / total) * 100));
      }
    } catch (error) {
      console.error(`Failed to download photo ${index + 1}:`, error);
    }
  });

  await Promise.all(promises);

  // Generate and save ZIP
  const content = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  const zipFilename = `${galleryName.replace(/[^a-z0-9]/gi, '-')}-photos.zip`;
  saveAs(content, zipFilename);
  
  return true;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default {
  downloadImage,
  downloadAllAsZip,
  formatFileSize
};
