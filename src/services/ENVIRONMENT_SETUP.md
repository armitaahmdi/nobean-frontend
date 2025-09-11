# Environment Configuration

## API Configuration

The application uses a flexible API URL configuration that works with both Vite and Create React App environments.

### For Vite (Default)
Create a `.env` file in the root directory:
```
VITE_API_URL=https://api.nobean.ir
```

### For Create React App
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=https://api.nobean.ir
```

### Default Fallback
If no environment variable is set, the application will use:
```
https://api.nobean.ir
```

## How It Works

The `testsApi.js` service automatically detects the environment and uses the appropriate environment variable:

1. **Vite Environment**: Uses `import.meta.env.VITE_API_URL`
2. **Create React App**: Uses `process.env.REACT_APP_API_URL`
3. **Fallback**: Uses the default URL `https://api.nobean.ir`

## Testing the Fix

After implementing this fix:

1. The "process is not defined" error should be resolved
2. API calls should work properly
3. Test creation and management should function correctly

## Troubleshooting

If you still see "process is not defined" errors:

1. Check if you have any other files using `process.env` directly
2. Ensure your build tool (Vite/CRA) is properly configured
3. Clear browser cache and restart the development server
4. Check browser console for any remaining environment variable issues
