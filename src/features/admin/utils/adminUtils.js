/**
 * Utility functions for admin-related operations
 */

// Admin-specific constants
export const ADMIN_CONSTANTS = {
    DEFAULT_TEST_DATA: {
        title: '',
        time: 30,
        date: new Date().toISOString().split('T')[0],
        mainDescription: '',
        ShortDescription: '',
        target_audience: 'children',
        price: 0,
        category: 'learning_disability',
        imagepath: '/images/default-test.png',
        suitableFor: ['والدین'],
        tags: [],
        descriptionVideo: ''
    },
    VALIDATION_RULES: {
        TEST: {
            title: { required: true, minLength: 3 },
            time: { required: true, min: 1, max: 300 },
            price: { required: true, min: 0 },
            category: { required: true },
            target_audience: { required: true }
        },
    }
};

// Validate test data
export const validateTestData = (testData) => {
    const errors = {};
    const rules = ADMIN_CONSTANTS.VALIDATION_RULES.TEST;

    // Title validation
    if (!testData.title || testData.title.length < rules.title.minLength) {
        errors.title = 'عنوان آزمون باید حداقل 3 کاراکتر باشد';
    }

    // Time validation
    if (!testData.time || testData.time < rules.time.min || testData.time > rules.time.max) {
        errors.time = 'زمان آزمون باید بین 1 تا 300 دقیقه باشد';
    }

    // Price validation
    if (testData.price === undefined || testData.price < rules.price.min) {
        errors.price = 'قیمت آزمون باید مثبت باشد';
    }

    // Category validation
    if (!testData.category) {
        errors.category = 'دسته‌بندی آزمون الزامی است';
    }

    // Target audience validation
    if (!testData.target_audience) {
        errors.target_audience = 'گروه هدف آزمون الزامی است';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};


// Format test data for API
export const formatTestDataForAPI = (testData) => {
    return {
        title: testData.title.trim(),
        time: parseInt(testData.time),
        mainDescription: testData.mainDescription.trim(),
        ShortDescription: testData.ShortDescription.trim(),
        target_audience: testData.target_audience,
        price: parseInt(testData.price),
        category: testData.category,
        imagepath: testData.imagepath,
        suitableFor: Array.isArray(testData.suitableFor) ? testData.suitableFor : [testData.suitableFor],
        tags: Array.isArray(testData.tags) ? testData.tags : [],
        descriptionVideo: testData.descriptionVideo || ''
    };
};


// Get error message for API errors
export const getApiErrorMessage = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }
    
    if (error?.message) {
        return error.message;
    }
    
    return 'خطای نامشخص رخ داده است';
};

// Check if user has admin permissions
export const hasAdminPermissions = (user) => {
    return user?.role === 'admin' || user?.phone === '09198718211';
};

// Generate test statistics
export const generateTestStats = (tests) => {
    return {
        total: tests.length,
        active: tests.filter(test => test.status === 'active').length,
        draft: tests.filter(test => test.status === 'draft').length,
        totalQuestions: tests.reduce((sum, test) => sum + (test.question_count || 0), 0),
        totalParticipants: tests.reduce((sum, test) => sum + (test.participants || 0), 0)
    };
};
