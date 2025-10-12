import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import { getProfile } from '../../user/profile/profileSlice';

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
      
      // If this is the designated superadmin phone, persist role on backend as well
      try {
        if (phone === '09198718211' && data.token) {
          await authService.updateProfile(data.token, { role: 'superadmin' });
        }
      } catch (roleErr) {
        console.warn('Failed to persist superadmin role on backend:', roleErr.message);
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
  async (_, { rejectWithValue, dispatch }) => {
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
      
      // Try to get complete profile data from profile API
      let completeProfileData = userData;
      try {
        console.log('restoreUserSession: fetching complete profile data...');
        
        // Call profile API directly instead of using dispatch
        const profileResponse = await authService.getProfile(token);
        console.log('restoreUserSession: profile response:', profileResponse);
        
        // Extract profile data from response
        const profileData = profileResponse.profile || profileResponse;
        
        // Merge profile data with user data
        completeProfileData = { ...userData, ...profileData };
      } catch (profileError) {
        console.log('restoreUserSession: profile fetch failed, using basic user data:', profileError.message);
        // If profile fetch fails, use basic user data
        completeProfileData = userData;
      }
      
      // If this is the designated superadmin phone but backend role is not set, try to persist it
      try {
        if (completeProfileData?.phone === '09198718211' && completeProfileData?.role !== 'superadmin') {
          await authService.updateProfile(token, { role: 'superadmin' });
          completeProfileData = { ...completeProfileData, role: 'superadmin' };
        }
      } catch (persistErr) {
        console.warn('restoreUserSession: failed to persist superadmin role on backend:', persistErr.message);
      }

      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(completeProfileData));
      
      console.log('restoreUserSession: success, user data:', completeProfileData);
      return { user: completeProfileData, token };
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
    updateUserData: (state, action) => {
      // Update user data in auth state
      if (state.user && state.user.id === action.payload.id) {
        state.user = { ...state.user, ...action.payload };
        // Also update localStorage
        localStorage.setItem('userData', JSON.stringify(state.user));
      }
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
        let mergedUser = {
          ...action.payload.user,
          phone: action.payload.user?.phone || state.mobile
        };
        // Promote specific phone to superadmin
        if (mergedUser?.phone === '09198718211') {
          mergedUser = { ...mergedUser, role: 'superadmin' };
        }
        state.user = mergedUser;
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
        let restoredUser = action.payload.user;
        if (restoredUser?.phone === '09198718211') {
          restoredUser = { ...restoredUser, role: 'superadmin' };
        }
        state.user = restoredUser;
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

export const { clearError, clearAuth, setMobile, resetOtpState, updateUserData } = authSlice.actions;
export default authSlice.reducer;
