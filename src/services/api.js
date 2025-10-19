// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.DEV ? '/api/v1' : 'https://api.nobean.ir/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Headers
export const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['X-Auth-Token'] = token; // Try both formats
  }
  
  return headers;
};

// API Response Handler
export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Provide more specific error messages based on status code
    let errorMessage;
    switch (response.status) {
      case 400:
        errorMessage = errorData.message || 'درخواست نامعتبر است';
        break;
      case 401:
        errorMessage = errorData.message || 'احراز هویت ناموفق';
        break;
      case 403:
        errorMessage = errorData.message || 'دسترسی غیرمجاز';
        break;
      case 404:
        errorMessage = errorData.message || 'منبع مورد نظر یافت نشد';
        break;
      case 500:
        errorMessage = errorData.message || 'خطای سرور. لطفاً دوباره تلاش کنید';
        break;
      case 502:
        errorMessage = errorData.message || 'خطای ارتباط با سرور';
        break;
      case 503:
        errorMessage = errorData.message || 'سرویس در دسترس نیست';
        break;
      default:
        errorMessage = errorData.message || `خطای HTTP: ${response.status}`;
    }
    
    throw new Error(errorMessage);
  }
  
  const responseData = await response.json();
  return responseData;
};

// Generic API Request Function
export const apiRequest = async (url, options = {}) => {
  const {
    method = 'GET',
    body = null,
    token = null,
    timeout = API_CONFIG.TIMEOUT,
    ...otherOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = getHeaders(token);
    const requestBody = body ? JSON.stringify(body) : null;

    // Debug logging for API requests
    console.log('API Request Debug:', {
      url,
      method,
      headers,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'No token',
      authorizationHeader: headers.Authorization,
      body: requestBody
    });

    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
      signal: controller.signal,
      ...otherOptions,
    });

    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Retry mechanism for failed requests
export const apiRequestWithRetry = async (url, options = {}, retryCount = 0, maxRetries = API_CONFIG.RETRY_ATTEMPTS) => {
  try {
    const result = await apiRequest(url, options);
    return result;
  } catch (error) {
    if (retryCount < maxRetries && !error.message.includes('401')) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return apiRequestWithRetry(url, options, retryCount + 1, maxRetries);
    }
    throw error;
  }
};

export const api = {
  request: apiRequest,
  requestWithRetry: apiRequestWithRetry,
  getHeaders,
  handleResponse
};

export default API_CONFIG;
