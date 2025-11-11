// API Base URL - uses environment variable or defaults based on mode
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api/v1`;
  }
  // In development mode, use proxy (relative path)
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  // In production, use production server
  return 'https://www.nobean.ir/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();
