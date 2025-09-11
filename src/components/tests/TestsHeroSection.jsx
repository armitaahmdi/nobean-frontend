import React from 'react';
import { FaUsers, FaChartLine, FaStar, FaClock, FaBrain, FaHeart } from 'react-icons/fa';

export default function TestsHeroSection({ tests = [] }) {
    // Static statistics for marketing purposes
    const staticStats = {
        totalChildrenEvaluated: 450, // Static number as requested
        parentSatisfaction: 94, // Static percentage as requested
        completionRate: 87,
        totalTests: tests.length
    };
    
    // Calculate dynamic statistics from tests data
    const totalParticipants = tests.reduce((sum, test) => sum + (test.participants || 0), 0);
    const averageRating = tests.length > 0 
        ? (tests.reduce((sum, test) => sum + parseFloat(test.rating || 0), 0) / tests.length).toFixed(1)
        : 0;
    

    return (
        <div className="mx-auto px-4 py-6">
            {/* Learning Disorders Focused Design */}
            <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
                
                {/* Main Content */}
                <div className="relative z-10 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Content */}
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                                <FaBrain className="w-3.5 h-3.5" />
                                تشخیص اختلالات یادگیری
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                                شناسایی و درمان{' '}
                                <span className="inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    اختلالات یادگیری
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                                با آزمون‌های تخصصی روان‌شناسی، اختلالات یادگیری کودکان را زودتر تشخیص دهید و مسیر رشد بهتری برای آن‌ها فراهم کنید
                            </p>
                            
                            {/* Key Benefits */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">تشخیص زودهنگام اختلالات یادگیری</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">ارائه راهکارهای درمانی تخصصی</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">پشتیبانی از والدین و مربیان</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Side - Statistics Cards */}
                        <div className="space-y-4">
                            {/* Top Row */}
                            <div className="flex gap-4">
                                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <FaUsers className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">+{staticStats.totalChildrenEvaluated}</div>
                                        <div className="text-xs text-gray-600 font-medium">کودک ارزیابی شده</div>
                                    </div>
                                </div>
                                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <FaBrain className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">{staticStats.totalTests}</div>
                                        <div className="text-xs text-gray-600 font-medium">آزمون تخصصی</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Row */}
                            <div className="flex gap-4">
                                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <FaChartLine className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">{staticStats.completionRate}%</div>
                                        <div className="text-xs text-gray-600 font-medium">نرخ بهبود</div>
                                    </div>
                                </div>
                                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <FaStar className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">{staticStats.parentSatisfaction}%</div>
                                        <div className="text-xs text-gray-600 font-medium">رضایت والدین</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white">
                                <div className="text-center">
                                    <h3 className="text-base font-bold mb-1">چرا تشخیص زودهنگام مهم است؟</h3>
                                    <p className="text-xs opacity-90 leading-relaxed">
                                        تشخیص و درمان اختلالات یادگیری در سنین پایین، شانس موفقیت تحصیلی و اجتماعی کودکان را تا ۸۵٪ افزایش می‌دهد
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
