# Authentication System Documentation

This document describes the Redux Toolkit-based authentication system implemented for the Nobean project.

## Overview

The authentication system uses Redux Toolkit with `createAsyncThunk` for API calls and provides a modular, reusable structure for handling user authentication via OTP (One-Time Password) verification.

## File Structure

```
src/
├── api/
│   └── endpoints.js                    # Centralized API endpoints
├── features/
│   └── authentication/
│       ├── slices/
│       │   ├── loginSlice.js           # Main authentication slice
│       │   └── otpSlice.js             # OTP-specific operations slice
│       ├── LoginForm.jsx               # Login form component
│       ├── OtpForm.jsx                 # OTP verification form component
│       └── AuthContainer.jsx           # Example parent component
└── app/
    └── store.js                        # Redux store configuration
```

## API Endpoints

### Authentication Endpoints

- `SEND_OTP`: Send OTP to mobile number
- `VERIFY_OTP`: Verify OTP and login
- `REFRESH_TOKEN`: Refresh authentication token
- `LOGOUT`: Logout user
- `GET_PROFILE`: Get user profile
- `UPDATE_PROFILE`: Update user profile

### Usage

```javascript
import { AUTH_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../api/endpoints';

// Example API call
const response = await fetch(AUTH_ENDPOINTS.SEND_OTP, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify({ mobile: '09123456789' }),
});

const data = await handleApiResponse(response);
```

## Redux Slices

### Login Slice (`loginSlice.js`)

**Actions:**
- `sendOtp(mobile)` - Send OTP to mobile number
- `verifyOtp({ mobile, otp })` - Verify OTP and authenticate user
- `logout()` - Logout user
- `getUserProfile()` - Fetch user profile
- `clearError()` - Clear authentication errors
- `clearAuth()` - Clear all authentication data
- `setMobile(mobile)` - Store mobile number
- `resetOtpState()` - Reset OTP-related state

**State:**
```javascript
{
  user: null,                    // User data
  token: string | null,         // Authentication token
  isAuthenticated: boolean,     // Authentication status
  isLoading: boolean,           // Loading state
  error: string | null,        // Error message
  otpSent: boolean,            // OTP sent status
  mobile: string | null,       // Mobile number
}
```

### OTP Slice (`otpSlice.js`)

**Actions:**
- `resendOtp(mobile)` - Resend OTP
- `validateOtp({ mobile, otp })` - Client-side OTP validation
- `clearOtpError()` - Clear OTP errors
- `resetOtpState()` - Reset OTP state
- `startResendCooldown(seconds)` - Start resend cooldown
- `decrementCooldown()` - Decrement cooldown timer
- `incrementResendAttempts()` - Increment resend attempts

**State:**
```javascript
{
  isLoading: boolean,           // Loading state
  error: string | null,        // Error message
  resendCooldown: number,      // Cooldown timer (seconds)
  maxResendAttempts: number,   // Maximum resend attempts
  resendAttempts: number,      // Current resend attempts
  canResend: boolean,          // Can resend OTP
  lastResendTime: number,      // Last resend timestamp
}
```

## Component Usage

### LoginForm Component

```jsx
import LoginForm from './features/authentication/LoginForm';

function App() {
  const handleLoginSubmit = (data) => {
    console.log('Mobile submitted:', data.mobile);
    // Navigate to OTP form
  };

  return (
    <LoginForm onSubmit={handleLoginSubmit} />
  );
}
```

### OtpForm Component

```jsx
import OtpForm from './features/authentication/OtpForm';

function App() {
  const handleOtpSubmit = (data) => {
    console.log('OTP submitted:', data.otp);
    // Handle successful authentication
  };

  const handleBackToLogin = () => {
    // Navigate back to login form
  };

  return (
    <OtpForm 
      mobile="09123456789"
      onSubmit={handleOtpSubmit}
      onBack={handleBackToLogin}
    />
  );
}
```

### Using Redux State in Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { sendOtp, verifyOtp, logout } from './features/authentication/slices/loginSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading, error } = useSelector((state) => state.auth);

  const handleSendOtp = async (mobile) => {
    const result = await dispatch(sendOtp(mobile));
    if (sendOtp.fulfilled.match(result)) {
      console.log('OTP sent successfully');
    }
  };

  const handleVerifyOtp = async (mobile, otp) => {
    const result = await dispatch(verifyOtp({ mobile, otp }));
    if (verifyOtp.fulfilled.match(result)) {
      console.log('User authenticated:', result.payload);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## Environment Variables

Set the following environment variable for API configuration:

```bash
REACT_APP_API_BASE_URL=https://your-api-domain.com
```

If not set, defaults to `https://api.nobean.com`.

## Error Handling

The system provides comprehensive error handling:

1. **API Errors**: Automatically caught and stored in Redux state
2. **Network Errors**: Handled with user-friendly messages
3. **Validation Errors**: Client-side validation with form feedback
4. **Toast Notifications**: User-friendly success/error messages

## Best Practices

1. **Centralized API Management**: All endpoints defined in `endpoints.js`
2. **Modular Slices**: Separate concerns between authentication and OTP operations
3. **Error Boundaries**: Proper error handling and user feedback
4. **Loading States**: Visual feedback during API calls
5. **Token Management**: Automatic token storage and cleanup
6. **Type Safety**: Consistent data structures and validation

## Integration with Existing Code

The authentication system is designed to integrate seamlessly with existing Redux slices. Simply import the actions and use them in your components:

```javascript
// In your component
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from './features/authentication/slices/loginSlice';

// Use the actions
const dispatch = useDispatch();
const authState = useSelector((state) => state.auth);
```

## Future Enhancements

1. **Token Refresh**: Automatic token refresh before expiration
2. **Biometric Authentication**: Integration with device biometrics
3. **Social Login**: OAuth integration
4. **Multi-factor Authentication**: Additional security layers
5. **Session Management**: Advanced session handling

## Troubleshooting

### Common Issues

1. **API Connection**: Check `REACT_APP_API_BASE_URL` environment variable
2. **Token Storage**: Verify localStorage is available in your environment
3. **Redux DevTools**: Use Redux DevTools to debug state changes
4. **Network Errors**: Check CORS settings on your API server

### Debug Mode

Enable Redux DevTools in development:

```javascript
// In store.js
const store = configureStore({
  reducer: {
    // ... your reducers
  },
  devTools: process.env.NODE_ENV !== 'production',
});
```
