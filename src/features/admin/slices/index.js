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

// Questions management slice
export { default as adminQuestionsReducer } from './adminQuestionsSlice';
export {
    createQuestion,
    fetchTestQuestions,
    updateQuestion,
    deleteQuestion,
    clearError as clearQuestionsError,
    clearQuestions
} from './adminQuestionsSlice';

// Dashboard slice
export { default as dashboardReducer } from './dashboardSlice';
export {
    fetchDashboardStats,
    fetchUserStats,
    fetchTestStats,
    fetchExamAttemptsStats,
    fetchRecentUsers,
    fetchRecentActivities,
    clearErrors as clearDashboardErrors,
    clearError as clearDashboardError,
    resetDashboard,
    updateStats
} from './dashboardSlice';

// Utility functions
export {
    validateTestData,
    formatTestDataForAPI,
    getApiErrorMessage,
    hasAdminPermissions,
    generateTestStats,
    ADMIN_CONSTANTS
} from '../utils/adminUtils';
