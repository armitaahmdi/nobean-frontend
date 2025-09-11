import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = ({ onStartTest }) => {
    const testimonials = [
        {
            name: "مریم احمدی",
            role: "مادر علی (8 ساله)",
            content: "آزمون تشخیص اختلال خواندن واقعاً کمک کرد. حالا علی بهتر می‌خواند و اعتماد به نفس بیشتری دارد.",
            rating: 5,
            test: "آزمون تشخیص اختلال خواندن",
            result: "بهبود 80% در خواندن",
            avatar: "👩‍👦"
        },
        {
            name: "احمد رضایی", 
            role: "پدر سارا (10 ساله)",
            content: "دخترم در ریاضی مشکل داشت. بعد از آزمون و راهنمایی‌ها، حالا عاشق ریاضی شده و نمراتش بهتر شده.",
            rating: 5,
            test: "آزمون تشخیص اختلال ریاضی",
            result: "بهبود 90% در ریاضی",
            avatar: "👨‍👧"
        },
        {
            name: "فاطمه محمدی",
            role: "مادر امیر (12 ساله)", 
            content: "امیر مشکل تمرکز داشت. آزمون‌ها کمک کرد تا مشکلش را بفهمیم و راه حل مناسب پیدا کنیم.",
            rating: 5,
            test: "آزمون تشخیص اختلال توجه",
            result: "بهبود 75% در تمرکز",
            avatar: "👩‍👦"
        }
    ];

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
                        <FaQuoteLeft className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        تجربیات والدین
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        داستان‌های موفقیت والدینی که از آزمون‌های ما استفاده کرده‌اند
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="group relative">
                            {/* Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                                
                                {/* Quote Icon */}
                                <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                                    <FaQuoteLeft className="text-indigo-500 text-sm" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Rating */}
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <p className="text-gray-700 text-base leading-relaxed mb-6 pr-4">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4 text-white text-lg">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    {/* Test Details */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">آزمون انجام شده</p>
                                                <p className="text-sm font-semibold text-gray-800">{testimonial.test}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 mb-1">نتیجه</p>
                                                <p className="text-sm font-bold text-green-600">{testimonial.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">
                                شما هم می‌توانید موفق باشید
                            </h3>
                            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                                همین حالا آزمون مناسب را پیدا کنید و اولین قدم را برای بهبود وضعیت فرزندتان بردارید
                            </p>
                            <button 
                                onClick={onStartTest}
                                className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 font-bold text-lg shadow-lg"
                            >
                                شروع آزمون
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
