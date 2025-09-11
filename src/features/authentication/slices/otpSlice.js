import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';

// Async thunk for resending OTP
export const resendOtp = createAsyncThunk(
  'otp/resendOtp',
  async (phone, { rejectWithValue }) => {
    try {
      const data = await authService.sendOtp(phone);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for validating OTP format (client-side validation)
export const validateOtp = createAsyncThunk(
  'otp/validateOtp',
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      // Client-side validation
      if (!code || code.length !== 5) {
        throw new Error('کد تأیید باید ۵ رقمی باشد');
      }
      
      if (!/^\d{5}$/.test(code)) {
        throw new Error('کد تأیید باید فقط شامل اعداد باشد');
      }

      // Return validation success
      return { phone, code, isValid: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  error: null,
  resendCooldown: 0,
  maxResendAttempts: 3,
  resendAttempts: 0,
  canResend: true,
  lastResendTime: null,
};

// OTP slice
const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    clearOtpError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.error = null;
      state.resendCooldown = 0;
      state.resendAttempts = 0;
      state.canResend = true;
      state.lastResendTime = null;
    },
    startResendCooldown: (state, action) => {
      state.resendCooldown = action.payload; // seconds
      state.canResend = false;
      state.lastResendTime = Date.now();
    },
    decrementCooldown: (state) => {
      if (state.resendCooldown > 0) {
        state.resendCooldown -= 1;
      } else {
        state.canResend = true;
      }
    },
    incrementResendAttempts: (state) => {
      state.resendAttempts += 1;
      if (state.resendAttempts >= state.maxResendAttempts) {
        state.canResend = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Resend OTP cases
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.resendAttempts += 1;
        state.resendCooldown = 60; // 60 seconds cooldown
        state.canResend = false;
        state.lastResendTime = Date.now();
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Validate OTP cases
      .addCase(validateOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearOtpError, 
  resetOtpState, 
  startResendCooldown, 
  decrementCooldown, 
  incrementResendAttempts 
} = otpSlice.actions;

export default otpSlice.reducer;
