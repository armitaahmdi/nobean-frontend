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
            target_audience: { required: true },
            minAge: { min: 0, max: 120 },
            maxAge: { min: 0, max: 120 }
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

    // Time validation (check both time and duration)
    const timeValue = testData.time || testData.duration;
    if (!timeValue || timeValue < rules.time.min || timeValue > rules.time.max) {
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

    // Age range validation (optional fields)
    const minAge = testData.minAge;
    const maxAge = testData.maxAge;
    if (minAge !== null && minAge !== undefined) {
        if (isNaN(minAge) || minAge < rules.minAge.min || minAge > rules.minAge.max) {
            errors.minAge = 'حداقل سن باید بین 0 تا 120 باشد';
        }
    }
    if (maxAge !== null && maxAge !== undefined) {
        if (isNaN(maxAge) || maxAge < rules.maxAge.min || maxAge > rules.maxAge.max) {
            errors.maxAge = 'حداکثر سن باید بین 0 تا 120 باشد';
        }
    }
    if ((minAge !== null && minAge !== undefined) && (maxAge !== null && maxAge !== undefined) && minAge > maxAge) {
        errors.maxAge = 'حداکثر سن باید بزرگتر یا مساوی حداقل سن باشد';
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
        time: testData.duration || testData.time || 30, // Map duration to time
        date: testData.date || new Date().toISOString().split('T')[0],
        mainDescription: testData.description || testData.mainDescription || '', // Map description to mainDescription
        ShortDescription: testData.description || testData.ShortDescription || '', // Use description as ShortDescription too
        target_audience: testData.target_audience,
        price: testData.price || 0,
        category: testData.category,
        imagepath: testData.image || testData.imagePath || testData.imagepath || '',
        suitableFor: Array.isArray(testData.suitableFor) ? testData.suitableFor : [testData.target_audience || 'والدین'],
        tags: Array.isArray(testData.tags) ? testData.tags : (testData.tags ? testData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
        descriptionVideo: testData.descriptionVideo || '',
        minAge: (testData.minAge === '' || testData.minAge === null || testData.minAge === undefined) ? null : Number(testData.minAge),
        maxAge: (testData.maxAge === '' || testData.maxAge === null || testData.maxAge === undefined) ? null : Number(testData.maxAge),
        components: Array.isArray(testData.components) ? testData.components.filter(c => String(c).trim() !== '') : []
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
    return (user?.user?.role === 'admin' || user?.user?.role === 'superadmin') ||
           (user?.role === 'admin' || user?.role === 'superadmin') ||
           user?.phone === '09198718211';
};

// Check if user can add other admins (only superadmin)
export const canAddAdmins = (user) => {
    return user?.phone === '09198718211' || 
           user?.user?.role === 'superadmin' || 
           user?.role === 'superadmin';
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
