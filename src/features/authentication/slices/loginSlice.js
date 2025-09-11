import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phone, { rejectWithValue }) => {
    try {
      const data = await authService.sendOtp(phone);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for verifying OTP and logging in
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      const data = await authService.verifyOtp(phone, code);
      
      // Store token in localStorage if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      console.log('OTP Verification Success:', data);
      return data;
    } catch (error) {
      console.error('OTP Verification Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout (frontend only)
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from localStorage
      localStorage.removeItem('authToken');
      
      return true;
    } catch (error) {
      // Even if something goes wrong, clear local storage
      localStorage.removeItem('authToken');
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const data = await authService.getProfile(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for restoring user session on app initialization
export const restoreUserSession = createAsyncThunk(
  'auth/restoreUserSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('restoreUserSession: checking token:', {
        hasToken: !!token,
        tokenLength: token ? token.length : 0
      });
      
      if (!token) {
        throw new Error('No token found');
      }
      
      // Get fresh user data from API
      console.log('restoreUserSession: calling getProfile...');
      const response = await authService.getProfile(token);
      console.log('restoreUserSession: getProfile response:', response);
      
      // Extract user data from response
      const userData = response.user || response;
      
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      console.log('restoreUserSession: success, user data:', userData);
      return { user: userData, token };
    } catch (error) {
      console.error('restoreUserSession: error:', error);
      // If API call fails, clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return rejectWithValue(error.message);
    }
  }
);

// Get initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  
  console.log('Initializing auth state:', {
    hasToken: !!token,
    hasUserData: !!userData,
    tokenLength: token ? token.length : 0
  });
  
  return {
    user: userData ? JSON.parse(userData) : null,
    token: token, // Make sure token is properly set
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
    otpSent: false,
    mobile: null,
  };
};

const initialState = getInitialState();

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.otpSent = false;
      state.mobile = null;
      localStorage.removeItem('authToken');
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP cases
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.otpSent = false;
      })
      
      // Verify OTP cases
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add phone number to user object if not provided by backend
        state.user = {
          ...action.payload.user,
          phone: action.payload.user?.phone || state.mobile
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.otpSent = false;
        
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(state.user));
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.otpSent = false;
        state.mobile = null;
        
        // Clear user data from localStorage
        localStorage.removeItem('userData');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Still clear auth state even if logout fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.otpSent = false;
        state.mobile = null;
      })
      
      // Get user profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // If profile fetch fails, user might not be authenticated
        if (action.payload.includes('401') || action.payload.includes('403')) {
          state.isAuthenticated = false;
          state.token = null;
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      })
      
      // Restore user session cases
      .addCase(restoreUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(restoreUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      });
  },
});

export const { clearError, clearAuth, setMobile, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
