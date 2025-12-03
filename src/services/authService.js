import { apiRequest, apiRequestWithRetry } from './api';

const AUTH_ENDPOINTS = {
  SEND_OTP: '/users/send-otp',
  VERIFY_OTP: '/users/verify-otp',
  REFRESH_TOKEN: '/users/refresh',
  LOGOUT: '/users/logout',
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
};

class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Send OTP to phone number
  async sendOtp(phone) {
    try {
      // Use apiRequest instead of apiRequestWithRetry to prevent multiple OTP sends
      return await apiRequest(`${this.baseURL}${AUTH_ENDPOINTS.SEND_OTP}`, {
        method: 'POST',
        body: { phone },
        timeout: 120000, // Allow more time for SMS gateway to respond (up to 60s)
      });
    } catch (error) {
      // Better error handling
      if (error.message.includes('timeout') || error.message.includes('Failed to fetch')) {
        throw new Error('ارتباط با سرور کند است. لطفاً چند ثانیه بعد دوباره تلاش کنید');
      }
      if (error.message.includes('500')) {
        throw new Error('خطای سرور: لطفاً با پشتیبانی تماس بگیرید یا دوباره تلاش کنید');
      }
      throw error;
    }
  }

  // Verify OTP and login
  async verifyOtp(phone, code) {
    try {
      return await apiRequest(`${this.baseURL}${AUTH_ENDPOINTS.VERIFY_OTP}`, {
        method: 'POST',
        body: { phone, code },
        timeout: 120000, // Match OTP send timeout
      });
    } catch (error) {
      if (error.message.includes('timeout') || error.message.includes('Failed to fetch')) {
        throw new Error('ارتباط با سرور هنگام تأیید کد دچار مشکل شد. لطفاً دوباره تلاش کنید');
      }
      throw error;
    }
  }

  // Refresh authentication token
  async refreshToken(token) {
    return apiRequestWithRetry(`${this.baseURL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      token,
    });
  }

  // Logout user
  async logout(token) {
    return apiRequestWithRetry(`${this.baseURL}${AUTH_ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      token,
    });
  }

  // Get user profile
  async getProfile(token) {
    return apiRequest(`${this.baseURL}${AUTH_ENDPOINTS.GET_PROFILE}`, {
      method: 'GET',
      token,
      timeout: 5000, // 5 seconds timeout for profile
    }); // No retry for profile - faster loading
  }

  // Create user profile (POST) - Use POST for CORS compatibility
  async createProfile(token, profileData) {
    return apiRequestWithRetry(`${this.baseURL}${AUTH_ENDPOINTS.UPDATE_PROFILE}`, {
      method: 'POST', // Use POST for CORS compatibility
      body: profileData,
      token,
    });
  }

  // Update user profile (PATCH) - Use PATCH for proper REST semantics
  async updateProfile(token, profileData) {
    return apiRequestWithRetry(`${this.baseURL}${AUTH_ENDPOINTS.UPDATE_PROFILE}`, {
      method: 'PATCH', // Use PATCH for proper REST semantics
      body: profileData,
      token,
    });
  }
}

// Use proxy in development, direct URL in production
const AUTH_BASE_URL = import.meta.env.DEV ? '/api/v1' : 'https://www.nobean.ir/api/v1';

export default new AuthService(AUTH_BASE_URL);
