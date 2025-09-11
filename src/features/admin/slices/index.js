/**
 * Admin slices exports
 * Centralized export for all admin-related Redux slices
 */

// Tests management slice
export { default as adminTestsReducer } from './adminTestsSlice';
export {
    fetchAdminTests,
    createAdminTest,
    updateAdminTest,
    deleteAdminTest,
    fetchAdminTestDetails,
    clearError as clearTestsError,
    clearTests
} from './adminTestsSlice';

// Questions management slice - REMOVED
// This functionality was not implemented and has been removed

// Utility functions
export {
    validateTestData,
    formatTestDataForAPI,
    getApiErrorMessage,
    hasAdminPermissions,
    generateTestStats,
    ADMIN_CONSTANTS
} from '../utils/adminUtils';
