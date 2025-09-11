import React, { useState, useEffect } from 'react';
import { FaStar, FaClock, FaUsers, FaArrowRight, FaPlay, FaBookOpen, FaGraduationCap, FaHeart, FaShareAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Default values
const DEFAULT_VALUES = {
    title: 'بدون عنوان',
    image: '/default-test.png',
    category: 'عمومی',
    age_range: '3-18 سال',
    description: 'توضیحات در دسترس نیست',
    rating: '0',
    time: 0,
    participants: 0
};

// Category mapping from English to Persian
const categoryMapping = {
    'learning_disability': 'اختلال یادگیری',
    'reading_disorder': 'اختلال خواندن',
    'writing_disorder': 'اختلال نوشتن',
    'math_disorder': 'اختلال ریاضی',
    'attention_disorder': 'اختلال توجه'
};

const RelatedTestsSection = ({ currentTest, allTests }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    
    // Filter related tests based on category and age range
    const relatedTests = allTests
        .filter(test => 
            test.id !== currentTest.id && 
            (test.category === currentTest.category || 
             test.age_range === currentTest.age_range)
        )
        .slice(0, 3); // Show 3 related tests

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (relatedTests.length === 0) return null;

    return (
        <div className="relative py-12 overflow-hidden max-w-7xl">
            {/* Simplified Background */}
            <div className="absolute inset-0 rounded-[20px]"></div>

            <div className="relative px-4 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Compact Header Section */} 
                    <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                            <FaBookOpen className="text-indigo-600 text-sm" />
                            <span className="text-indigo-700 font-semibold text-sm">آزمون‌های مرتبط</span>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-3">
                            آزمون‌های پیشنهادی برای شما
                        </h2>
                        <p className="text-gray-600 text-base max-w-2xl mx-auto">
                            بر اساس آزمون فعلی و نیازهای شما، این آزمون‌ها را پیشنهاد می‌کنیم
                        </p>
                    </div>

                    {/* Compact Tests Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {relatedTests.map((test, index) => (
                            <div 
                                key={test.id} 
                                className={`group relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Compact Card */}
                                <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden h-full flex flex-col">
                                    {/* Card Header */}
                                    <div className="relative p-4 pb-3">
                                        {/* Card number */}
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                            {index + 1}
                                        </div>

                                        {/* Test icon */}
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                                            <img src={test.image || DEFAULT_VALUES.image} alt={test.title || DEFAULT_VALUES.title} className="w-8 h-8 rounded object-cover" />
                                        </div>

                                        {/* Test title */}
                                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2">
                                            {test.title || DEFAULT_VALUES.title}
                                        </h3>

                                        {/* Category badges */}
                                        <div className="flex items-center gap-1 mb-2">
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                                                {categoryMapping[test.category] || test.category || DEFAULT_VALUES.category}
                                            </span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                               سن: {test.age_range || DEFAULT_VALUES.age_range}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="px-4 pb-3 flex-1 flex flex-col">
                                        {/* Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2">
                                            {test.description ? test.description.substring(0, 80) + '...' : DEFAULT_VALUES.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center text-yellow-500">
                                                <FaStar className="text-xs" />
                                                <span className="text-xs font-semibold mr-1">{test.rating || DEFAULT_VALUES.rating}</span>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <FaClock className="text-xs mr-1" />
                                                <span className="text-xs">{test.time || DEFAULT_VALUES.time} دقیقه</span>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <FaUsers className="text-xs mr-1" />
                                                <span className="text-xs">{test.participants || DEFAULT_VALUES.participants}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="p-4 pt-0">
                                        {/* Main action button */}
                                        <button 
                                            onClick={() => navigate(`/test-details/${test.id}`)}
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-300 font-semibold text-sm flex items-center justify-center group-hover:scale-105"
                                        >
                                            <FaPlay className="text-xs mr-2" />
                                            مشاهده جزئیات
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Compact Bottom CTA Section */}
                    <div className={`text-center transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                            <div className="relative z-10">
                                <FaGraduationCap className="text-3xl mx-auto mb-3 opacity-90" />
                                <h3 className="text-xl font-bold mb-2">آماده برای آزمون بعدی؟</h3>
                                <p className="text-indigo-100 mb-4 text-sm">
                                    مجموعه کاملی از آزمون‌های تخصصی در انتظار شماست
                                </p>
                                <button 
                                    onClick={() => navigate('/tests')}
                                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-sm hover:scale-105"
                                >
                                    <FaBookOpen />
                                    مشاهده همه آزمون‌ها
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedTestsSection;
