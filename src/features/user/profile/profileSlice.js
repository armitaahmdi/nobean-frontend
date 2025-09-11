import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';

// Async thunk for getting user profile
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      let token = auth.token;
      
      // Fallback to localStorage if token not in Redux
      if (!token) {
        token = localStorage.getItem('authToken');
      }
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await authService.getProfile(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating user profile
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      let token = auth.token;
      
      // Fallback to localStorage if token not in Redux
      if (!token) {
        token = localStorage.getItem('authToken');
      }
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await authService.createProfile(token, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      let token = auth.token;
      
      // Fallback to localStorage if token not in Redux
      if (!token) {
        token = localStorage.getItem('authToken');
      }
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await authService.updateProfile(token, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    age: null,
    isParent: true,
    childPhone: '',
    isFather: false,
  },
  isLoading: false,
  isUpdating: false,
  error: null,
  lastUpdated: null,
};

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfile: (state) => {
      state.profile = initialState.profile;
      state.error = null;
      state.lastUpdated = null;
    },
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      state.profile[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // Extract user data from response
        const userData = action.payload.user || action.payload;
        state.profile = {
          ...state.profile,
          ...userData,
        };
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create Profile cases
      .addCase(createProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Extract user data from response
        const userData = action.payload.user || action.payload;
        state.profile = {
          ...state.profile,
          ...userData,
        };
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      
      // Update Profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Extract user data from response
        const userData = action.payload.user || action.payload;
        state.profile = {
          ...state.profile,
          ...userData,
        };
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, resetProfile, updateProfileField } = profileSlice.actions;
export default profileSlice.reducer;
