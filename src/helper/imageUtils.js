/**
 * Utility functions for handling image URLs
 */

// Get the base URL for images based on environment
const getImageBaseUrl = () => {
  // Always use production server since backend is running on server
  return 'https://www.nobean.ir';
};

/**
 * Convert relative image path to full URL
 * @param {string} imagePath - Relative path like "/uploads/images/file.jpg"
 * @returns {string} Full URL for the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === '/default-test.png') {
    return '/default-test.png';
  }
  
  // Remove double slashes
  const cleanPath = imagePath.replace(/\/\/+/g, '/');
  
  // If it's already a full URL, return as is
  if (cleanPath.startsWith('http')) {
    return cleanPath;
  }
  
  // Add base URL
  const baseUrl = getImageBaseUrl();
  return `${baseUrl}${cleanPath}`;
};

/**
 * Check if image URL is valid
 * @param {string} imagePath - Image path to check
 * @returns {boolean} Whether the image path is valid
 */
export const isValidImagePath = (imagePath) => {
  return imagePath && 
         imagePath !== '/default-test.png' && 
         imagePath.startsWith('/uploads/');
};

/**
 * Convert relative video path to full URL
 * @param {string} videoPath - Relative path like "/uploads/videos/file.mp4"
 * @returns {string} Full URL for the video
 */
export const getVideoUrl = (videoPath) => {
  if (!videoPath) {
    return null;
  }
  
  // Remove double slashes
  const cleanPath = videoPath.replace(/\/\/+/g, '/');
  
  // If it's already a full URL, return as is
  if (cleanPath.startsWith('http')) {
    return cleanPath;
  }
  
  // Add base URL
  const baseUrl = getImageBaseUrl();
  return `${baseUrl}${cleanPath}`;
};

/**
 * Check if video URL is valid
 * @param {string} videoPath - Video path to check
 * @returns {boolean} Whether the video path is valid
 */
export const isValidVideoPath = (videoPath) => {
  return videoPath && 
         videoPath.startsWith('/uploads/') &&
         (videoPath.includes('/videos/') || videoPath.endsWith('.mp4') || videoPath.endsWith('.webm') || videoPath.endsWith('.ogg'));
};

export default {
  getImageUrl,
  isValidImagePath,
  getVideoUrl,
  isValidVideoPath
};
