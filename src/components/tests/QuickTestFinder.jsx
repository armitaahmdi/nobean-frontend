import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaArrowRight, FaArrowLeft, FaRedo, FaLightbulb, FaUser, FaGraduationCap, FaBookOpen, FaCalculator, FaEye, FaStar, FaClock, FaUsers, FaBullseye } from 'react-icons/fa';

export default function QuickTestFinder() {
    const { tests, loading } = useSelector((store) => store.tests);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    // Simple questions - only age and category
    const questions = [
        {
            id: "age",
            question: "سن فرزند شما چقدر است؟",
            type: "radio",
            icon: FaUser,
            gradient: "from-purple-500 to-pink-500",
            options: [
                { value: "3-6", label: "3 تا 6 سال", description: "پیش‌دبستانی", icon: FaUser, color: "purple" },
                { value: "7-12", label: "7 تا 12 سال", description: "دبستان", icon: FaGraduationCap, color: "blue" },
                { value: "13-18", label: "13 تا 18 سال", description: "دبیرستان", icon: FaBookOpen, color: "green" },
                { value: "adult", label: "بزرگسال", description: "والدین/مربیان", icon: FaUsers, color: "orange" }
            ]
        },
        {
            id: "category",
            question: "نوع آزمون مورد نظر شما چیست؟",
            type: "radio",
            icon: FaLightbulb,
            gradient: "from-blue-500 to-cyan-500",
            options: [
                { value: "reading_disorder", label: "اختلال خواندن", description: "مشکل در خواندن و درک متن", icon: FaBookOpen, color: "red" },
                { value: "writing_disorder", label: "اختلال نوشتن", description: "مشکل در نوشتن و املا", icon: FaGraduationCap, color: "blue" },
                { value: "math_disorder", label: "اختلال ریاضی", description: "مشکل در محاسبات و ریاضی", icon: FaCalculator, color: "green" },
                { value: "attention_disorder", label: "اختلال توجه", description: "مشکل در تمرکز و توجه", icon: FaEye, color: "yellow" },
                { value: "learning_disorder", label: "اختلال یادگیری", description: "ارزیابی کلی یادگیری", icon: FaLightbulb, color: "purple" }
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generateRecommendations();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const generateRecommendations = () => {
        console.log("=== GENERATING RECOMMENDATIONS ===");
        console.log("Available tests:", tests.length);
        console.log("Answers:", answers);

        // Start with all tests
        let filteredTests = [...tests];

        // Filter by age range
        if (answers.age) {
            console.log("Filtering by age:", answers.age);
            filteredTests = filteredTests.filter(test => {
                const ageRange = test.age_range;
                console.log(`Test "${test.title}" has age range: "${ageRange}"`);
                
                // Check if the selected age falls within the test's age range
                const isMatch = checkAgeMatch(answers.age, ageRange);
                console.log(`Age match: ${isMatch}`);
                return isMatch;
            });
        }

        console.log(`After age filtering: ${filteredTests.length} tests`);

        // Filter by category
        if (answers.category) {
            console.log("Filtering by category:", answers.category);
            filteredTests = filteredTests.filter(test => {
                const category = test.category;
                console.log(`Test "${test.title}" has category: "${category}"`);
                
                // Map category selection to actual categories
                const categoryMatch = checkCategoryMatch(answers.category, category);
                console.log(`Category match: ${categoryMatch}`);
                return categoryMatch;
            });
        }

        console.log(`After category filtering: ${filteredTests.length} tests`);

        // If no tests match, show top 3 most popular
        if (filteredTests.length === 0) {
            console.log("No tests match filters, showing top 3 most popular");
            filteredTests = [...tests].sort((a, b) => {
                const scoreA = (a.participants || 0) * 0.7 + (parseFloat(a.rating) || 4.5) * 0.3;
                const scoreB = (b.participants || 0) * 0.7 + (parseFloat(b.rating) || 4.5) * 0.3;
                return scoreB - scoreA;
            }).slice(0, 3);
        } else {
            // Sort by popularity and rating
            filteredTests = filteredTests.sort((a, b) => {
                const scoreA = (a.participants || 0) * 0.7 + (parseFloat(a.rating) || 4.5) * 0.3;
                const scoreB = (b.participants || 0) * 0.7 + (parseFloat(b.rating) || 4.5) * 0.3;
                return scoreB - scoreA;
            });
        }

        // Get top 3 recommendations
        const finalRecommendations = filteredTests.slice(0, 3);
        console.log("Final recommendations:", finalRecommendations.map(t => `${t.title} (${t.age_range})`));
        
        setRecommendations(finalRecommendations);
    };

    const checkAgeMatch = (selectedAge, testAgeRange) => {
        switch (selectedAge) {
            case "3-6":
                return testAgeRange === "3-12" || testAgeRange === "3-18";
            case "7-12":
                return testAgeRange === "3-12" || testAgeRange === "3-18";
            case "13-18":
                return testAgeRange === "13-18" || testAgeRange === "3-18";
            case "adult":
                return testAgeRange === "3-18"; // Family tests for adults with children
            default:
                return true;
        }
    };

    const checkCategoryMatch = (selectedCategory, testCategory) => {
        // Map category selection to actual categories
        switch (selectedCategory) {
            case "reading_disorder":
                return testCategory === "اختلال خواندن";
            case "writing_disorder":
                return testCategory === "اختلال نوشتن";
            case "math_disorder":
                return testCategory === "اختلال ریاضی";
            case "attention_disorder":
                return testCategory === "اختلال توجه";
            case "learning_disorder":
                return testCategory === "اختلال یادگیری";
            default:
                return true;
        }
    };

    const resetAssessment = () => {
        setCurrentStep(0);
        setAnswers({});
        setRecommendations([]);
    };

    if (loading) {
        return (
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
                        <div className="relative animate-spin rounded-full h-12 w-12 border-3 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">در حال بارگذاری آزمون‌ها</h3>
                    <p className="text-gray-600 text-sm">لطفاً صبر کنید...</p>
                </div>
            </div>
        );
    }

    if (!tests || tests.length === 0) {
        return (
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-lg opacity-20"></div>
                        <FaSearch className="relative text-red-400 text-4xl mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">هیچ آزمونی یافت نشد</h3>
                    <p className="text-gray-600 text-sm">لطفاً بعداً دوباره تلاش کنید</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <FaSearch className="text-lg" />
                </div>
                <h2 className="text-xl font-bold mb-1">یافتن آزمون مناسب</h2>
                <p className="text-white/90 text-sm">
                    با پاسخ به چند سوال ساده، بهترین آزمون را پیدا کنید
                </p>
            </div>

            <div className="p-6">
                    {recommendations.length === 0 ? (
                        <div>
                            
                            {/* Question */}
                            <div className="mb-6">
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-3">
                                        {React.createElement(questions[currentStep].icon, { 
                                            className: "text-indigo-600 text-lg" 
                                        })}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {questions[currentStep].question}
                                    </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {questions[currentStep].options.map((option) => {
                                        const IconComponent = option.icon || questions[currentStep].icon;
                                        const isSelected = answers[questions[currentStep].id] === option.value;
                                        return (
                                            <label
                                                key={option.value}
                                                className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                                                    isSelected
                                                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md'
                                                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={questions[currentStep].id}
                                                    value={option.value}
                                                    checked={isSelected}
                                                    onChange={() => handleAnswer(questions[currentStep].id, option.value)}
                                                    className="sr-only"
                                                />
                                                
                                                {/* Selection Indicator */}
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                                                    isSelected
                                                        ? 'border-indigo-500 bg-indigo-500'
                                                        : 'border-gray-300 group-hover:border-indigo-400'
                                                }`}>
                                                    {isSelected && (
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center flex-1">
                                                    <div className={`mr-3 transition-all duration-300 ${
                                                        isSelected ? 'scale-105' : 'group-hover:scale-105'
                                                    }`}>
                                                        <IconComponent className={`text-lg transition-colors ${
                                                            isSelected
                                                                ? 'text-indigo-600'
                                                                : 'text-gray-400 group-hover:text-indigo-500'
                                                        }`} />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 text-sm mb-0.5">{option.label}</div>
                                                        {option.description && (
                                                            <div className="text-gray-600 text-xs">{option.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                        currentStep === 0
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
                                    }`}
                                >
                                    <FaArrowLeft className="ml-1" />
                                    قبلی
                                </button>

                                <div className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                                    سوال {currentStep + 1} از {questions.length}
                                </div>

                                <button
                                    onClick={nextStep}
                                    disabled={!answers[questions[currentStep].id]}
                                    className={`flex items-center px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                        !answers[questions[currentStep].id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md hover:scale-105'
                                    }`}
                                >
                                    {currentStep === questions.length - 1 ? 'مشاهده نتایج' : 'بعدی'}
                                    <FaArrowRight className="mr-1" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Results Header */}
                            <div className="text-center mb-6">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 mb-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2">
                                        <FaStar className="text-lg" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">🎉 آزمون‌های پیشنهادی</h3>
                                    <p className="text-green-100 text-sm">بر اساس پاسخ‌های شما:</p>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="space-y-4 mb-6">
                                {recommendations.map((test, index) => (
                                    <div key={test.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-indigo-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs mr-3">
                                                        {index + 1}
                                                    </div>
                                                    <h4 className="font-bold text-gray-800 text-base">{test.title}</h4>
                                                </div>
                                                <p className="text-gray-600 mb-3 pr-6 text-sm leading-relaxed">{test.description}</p>
                                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                                                        <FaClock className="text-blue-600 mr-1" />
                                                        <span className="font-semibold">{test.time} دقیقه</span>
                                                    </div>
                                                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                                                        <FaUsers className="text-green-600 mr-1" />
                                                        <span className="font-semibold">{test.participants} نفر</span>
                                                    </div>
                                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                                        <FaStar className="text-yellow-600 mr-1" />
                                                        <span className="font-semibold">{test.rating}</span>
                                                    </div>
                                                    <div className="flex items-center bg-purple-50 px-2 py-1 rounded-full">
                                                        <FaBullseye className="text-purple-600 mr-1" />
                                                        <span className="font-semibold">{test.age_range}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 font-semibold text-sm">
                                                شروع آزمون
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <div className="text-center">
                                <button
                                    onClick={resetAssessment}
                                    className="flex items-center mx-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:shadow-sm font-semibold text-sm"
                                >
                                    <FaRedo className="ml-1" />
                                    شروع مجدد
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
}
