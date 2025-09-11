/* eslint-disable no-unused-vars */
import { FaClock, FaUsers, FaStar, FaComments, FaList, FaCheckCircle, FaGraduationCap, FaAward, FaChartLine, FaBookOpen, FaCertificate, FaLanguage, FaTrophy, FaFire, FaRocket } from "react-icons/fa";
import translate from "../../../../locale/translate";
import { forwardRef } from "react";

// Default values
const DEFAULT_VALUES = {
    time: 0,
    participants: 0,
    rating: null,
    questionsCount: 0,
    suitableFor: [],
    category: 'تخصصی',
    reviews: []
};

const DetailsRowCards = forwardRef(({ test }, ref) => {
    // Ensure test object exists
    if (!test) return null;
    
    // Extract values with fallbacks
    const {
        time = DEFAULT_VALUES.time,
        participants = DEFAULT_VALUES.participants,
        rating = DEFAULT_VALUES.rating,
        questionsCount = DEFAULT_VALUES.questionsCount,
        suitableFor = DEFAULT_VALUES.suitableFor,
        category = DEFAULT_VALUES.category,
        reviews = DEFAULT_VALUES.reviews
    } = test;
    return (
        <div ref={ref} className="mt-4 space-y-3">
            {/* Hero Stats Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-lightBlue/5 via-white to-secondaryBlue/5 rounded-xl p-4 border border-lightBlue/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 w-12 h-12 bg-lightBlue rounded-full blur-xl"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-10 bg-secondaryBlue rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-lightYellow rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-lightBlue to-darkBlue rounded-lg flex items-center justify-center shadow-md">
                            <FaTrophy className="text-white text-sm" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900">آمار کلی آزمون</h2>
                            <p className="text-sm text-gray-600">اطلاعات جامع و دقیق</p>
                        </div>
            </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {/* Duration */}
                        {time && time > 0 && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-lightBlue/20 hover:scale-105 transition-all duration-300 shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-lightBlue to-darkBlue rounded-lg flex items-center justify-center">
                                        <FaClock className="text-white text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">{translate.duration}</p>
                                        <p className="text-xl font-bold text-lightBlue">{time} دقیقه</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Participants */}
                        {participants !== undefined && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-secondaryBlue/20 hover:scale-105 transition-all duration-300 shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-secondaryBlue to-lightBlue rounded-lg flex items-center justify-center">
                                        <FaUsers className="text-white text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">{translate.numberofdone}</p>
                                        <p className="text-xl font-bold text-secondaryBlue">+{participants}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rating */}
                        {rating && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-lightYellow/20 hover:scale-105 transition-all duration-300 shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-lightYellow to-darkYellow rounded-lg flex items-center justify-center">
                                        <FaStar className="text-white text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">{translate.rating}</p>
                                        <p className="text-xl font-bold text-lightYellow">{rating}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Questions */}
                        {questionsCount !== undefined && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-darkBlue/20 hover:scale-105 transition-all duration-300 shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-darkBlue to-lightBlue rounded-lg flex items-center justify-center">
                                        <FaList className="text-white text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">{translate.numberofquestion}</p>
                                        <p className="text-xl font-bold text-darkBlue">{questionsCount}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detailed Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Suitable For - Modern Design */}
                <div className="bg-gradient-to-br from-lightBlue/5 to-white rounded-xl p-4 shadow-lg border border-lightBlue/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-lightBlue/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-secondaryBlue/5 to-transparent rounded-full translate-y-6 -translate-x-6"></div>
                    
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-lightBlue to-darkBlue rounded-xl flex items-center justify-center shadow-lg">
                                <FaCheckCircle className="text-white text-sm" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900">{translate.suitablefor}</h3>
                                <p className="text-xs text-gray-600">گروه‌های هدف</p>
                            </div>
                        </div>
                        
                        {/* Modern List */}
                        <div className="space-y-2">
                            {suitableFor && suitableFor.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 bg-white/60 backdrop-blur-sm rounded-lg border border-lightBlue/10 hover:bg-white/80 transition-all duration-200">
                                    <div className="w-6 h-6 bg-gradient-to-r from-lightBlue to-secondaryBlue rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Test Details - Enhanced */}
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-lightYellow/10 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-lightYellow to-darkYellow rounded-lg flex items-center justify-center shadow-md">
                                <FaGraduationCap className="text-white text-sm" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900">جزئیات آزمون</h3>
                                <p className="text-sm text-gray-600">اطلاعات تکمیلی</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">نوع آزمون:</span>
                                <span className="font-bold text-lightBlue text-sm">{category}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">زبان:</span>
                                <span className="font-bold text-gray-900 text-sm">فارسی</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">گواهی:</span>
                                <span className="font-bold text-lightBlue flex items-center gap-1 text-sm">
                                    <FaCertificate className="text-xs" />
                                    دارد
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews & Social Proof */}
            <div className="bg-gradient-to-r from-secondaryBlue/20 to-lightBlue/10 rounded-xl p-4 border border-secondaryBlue/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-secondaryBlue/10 to-transparent rounded-full -translate-y-10 -translate-x-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-lightBlue/10 to-transparent rounded-full translate-y-8 translate-x-8"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-lightBlue to-secondaryBlue rounded-lg flex items-center justify-center shadow-md">
                                <FaComments className="text-white text-sm" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900">{translate.comments}</h3>
                                <p className="text-sm text-gray-600">نظرات و تجربیات شرکت کنندگان</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 mb-1">
                                <FaFire className="text-lightYellow text-sm" />
                                <span className="text-xs font-semibold text-gray-600">محبوب</span>
                            </div>
                            <p className="text-2xl font-bold text-secondaryBlue">{reviews ? reviews.length : 0}</p>
                            <p className="text-xs text-gray-500">نظر ثبت شده</p>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="text-center p-2 bg-white/60 rounded-lg">
                            <FaRocket className="text-lightBlue text-sm mx-auto mb-1" />
                            <p className="text-xs text-gray-600">سرعت بالا</p>
                        </div>
                        <div className="text-center p-2 bg-white/60 rounded-lg">
                            <FaAward className="text-lightYellow text-sm mx-auto mb-1" />
                            <p className="text-xs text-gray-600">کیفیت عالی</p>
                        </div>
                        <div className="text-center p-2 bg-white/60 rounded-lg">
                            <FaChartLine className="text-secondaryBlue text-sm mx-auto mb-1" />
                            <p className="text-xs text-gray-600">نتایج دقیق</p>
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
});

export default DetailsRowCards;