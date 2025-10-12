import React from 'react';
import { FaRocket, FaGraduationCap, FaBrain, FaHeart, FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
import dancingBookAnimation from '../../assets/images/Dancing-Book.json';
import walkingPencilAnimation from '../../assets/images/Walking-Pencil.json';

const HeroBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
            </div>

            {/* Animated Lottie Elements */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-auto lg:bottom-6 lg:left-6 flex gap-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 animate-float -ml-3 sm:-ml-4 lg:-ml-8">
                    <Lottie 
                        animationData={dancingBookAnimation} 
                        loop={true}
                        autoplay={true}
                    />
                </div>
                
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 animate-float delay-1000">
                    <Lottie 
                        animationData={walkingPencilAnimation} 
                        loop={true}
                        autoplay={true}
                    />
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/30 text-lg sm:text-xl animate-float">
                <FaRocket />
            </div>

            {/* Main Banner Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="text-center text-white">
                    {/* Badge */}
                    <div className="inline-block mb-3">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                            🎯 آزمون‌های هوشمند یادگیری
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 animate-fade-in">
                        <span className="text-white">نوبین</span>
                        <span className="text-white/70 mx-2">،</span>
                        <span className="text-yellow-300">بینشی نو</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
                        با آزمون‌های تخصصی ما، سبک یادگیری‌ت رو کشف کن و هوشمندانه‌تر پیشرفت کنی
                    </p>

                    {/* CTA Button */}
                    <div>
                        <button className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-blue-700 font-bold text-base sm:text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                            <span className="group-hover:animate-bounce-slow">شروع آزمون‌ها</span>
                            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
