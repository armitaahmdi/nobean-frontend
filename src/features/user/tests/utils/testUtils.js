/**
 * Utility functions for test-related operations
 */

// Generate random rating between 3.8 and 5.0
export const generateRandomRating = () => {
    return (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
};

// Category mapping from English to Persian
const categoryMapping = {
    'learning_disability': 'اختلال یادگیری',
    'reading_disorder': 'اختلال خواندن',
    'writing_disorder': 'اختلال نوشتن',
    'math_disorder': 'اختلال ریاضی',
    'attention_disorder': 'اختلال توجه'
};

// Normalize target_audience values
export const normalizeTargetAudience = (targetAudience) => {
    const mapping = {
        'children': 'ویژه فرزندان',
        'parents': 'ویژه والدین', 
        'family': 'ویژه خانواده',
        'parents_and_children': 'ویژه والدین و فرزندان',
        'teachers': 'ویژه والدین',
        'professionals': 'ویژه والدین'
    };
    
    return mapping[targetAudience] || targetAudience || 'ویژه فرزندان';
};

// Process test data to ensure all fields are available
export const processTestData = (test, options = {}) => {
    const {
        generateRating = true,
        fallbackRating = null
    } = options;

    return {
        ...test,
        time: test.time !== undefined ? test.time : 30,
        participants: test.participantCount !== undefined 
            ? test.participantCount 
            : (test.participants !== undefined 
                ? test.participants 
                : Math.floor(Math.random() * 1000) + 100),
        questionsCount: test.question_count !== undefined 
            ? test.question_count 
            : (test.questionsCount !== undefined 
                ? test.questionsCount 
                : Math.floor(Math.random() * 20) + 5),
        target_audience: normalizeTargetAudience(test.target_audience),
        suitableFor: Array.isArray(test.suitableFor) 
            ? test.suitableFor 
            : (Array.isArray(test.suitablefor) 
                ? test.suitablefor 
                : ['والدین', 'کودکان']),
        description: test.description || test.mainDescription || test.shortDescription || test.ShortDescription || 'توضیحات در دسترس نیست',
        shortDescription: test.ShortDescription || test.shortDescription || 'توضیحات کوتاه در دسترس نیست',
        category: categoryMapping[test.category] || test.category || 'عمومی',
        rating: generateRating 
            ? (fallbackRating || generateRandomRating())
            : test.rating,
        reviews: test.reviews || [],
        imagePath: test.imagePath || test.imagepath || '/default-test.png',
        descriptionVideo: test.descriptionVideo || null
    };
};

// Process multiple tests
export const processTestsData = (tests, options = {}) => {
    return tests.map(test => processTestData(test, options));
};

// Constants
export const TEST_CONSTANTS = {
    DEFAULT_TIME: 30,
    MIN_PARTICIPANTS: 100,
    MAX_PARTICIPANTS: 1100,
    MIN_QUESTIONS: 5,
    MAX_QUESTIONS: 25,
    DEFAULT_SUITABLE_FOR: ['والدین', 'کودکان'],
    DEFAULT_CATEGORY: 'عمومی',
    DEFAULT_DESCRIPTION: 'توضیحات در دسترس نیست',
    DEFAULT_SHORT_DESCRIPTION: 'توضیحات کوتاه در دسترس نیست'
};

