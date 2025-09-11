import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaGift, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function AmazingOffersSlider({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef(null);
    const sliderRef = useRef(null);
    
    // Filter products with discounts and sort by highest discount, take top 6
    const discountedProducts = products
        .filter(product => product.discount && product.discount > 0)
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 6);
    
    // Responsive slides per view
    const getSlidesPerView = () => {
        return isMobile ? 1 : 3;
    };
    
    const slidesPerView = getSlidesPerView();
    
    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Intersection Observer for visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );
        
        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }
        
        return () => {
            if (sliderRef.current) {
                observer.unobserve(sliderRef.current);
            }
        };
    }, []);
    
    // Auto-scroll functionality - different behavior for mobile vs desktop
    // Only auto-scroll when visible
    useEffect(() => {
        if (discountedProducts.length <= slidesPerView || !isVisible) return;
        
        intervalRef.current = setInterval(() => {
            if (isMobile) {
                // Mobile: slide-based scrolling (change every 2 seconds)
                const totalSlides = Math.ceil(discountedProducts.length / slidesPerView);
                setCurrentIndex((prev) => {
                    const currentSlide = Math.floor(prev / slidesPerView);
                    const nextSlide = (currentSlide + 1) % totalSlides;
                    return nextSlide * slidesPerView;
                });
            } else {
                // Desktop: individual product scrolling (change every 2 seconds)
                setCurrentIndex((prev) => (prev + 1) % discountedProducts.length);
            }
        }, 2000);
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [discountedProducts.length, isVisible, slidesPerView, isMobile]);
    
    if (discountedProducts.length === 0) {
        return null;
    }
    
    // Calculate visible products - different logic for mobile vs desktop
    const getVisibleProducts = () => {
        const visible = [];
        
        if (isMobile) {
            // Mobile: slide-based (show 1 product per slide)
            const startIndex = Math.floor(currentIndex / slidesPerView) * slidesPerView;
            for (let i = 0; i < slidesPerView; i++) {
                const productIndex = (startIndex + i) % discountedProducts.length;
                visible.push(discountedProducts[productIndex]);
            }
        } else {
            // Desktop: individual product scrolling (show 3 products, scroll one at a time)
            for (let i = 0; i < slidesPerView; i++) {
                const productIndex = (currentIndex + i) % discountedProducts.length;
                visible.push(discountedProducts[productIndex]);
            }
        }
        
        return visible;
    };
    
    const visibleProducts = getVisibleProducts();
    
    // Calculate scroll-based transforms (removed vertical movement)
    const parallaxOffset = scrollY * 0.05;
    
    return (
        <div 
            ref={sliderRef}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 overflow-hidden relative"
        >
            <div className="flex flex-col lg:flex-row">
                {/* Fixed Amazing Offers Section */}
                <div 
                    className="lg:w-1/3 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-8 flex flex-col justify-center items-center lg:items-start relative overflow-hidden"
                    style={{
                        transform: `translateX(${parallaxOffset}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-40">
                        <div 
                            className="absolute top-4 right-4"
                            style={{
                                animation: isVisible ? 'pulse 2s infinite' : 'none'
                            }}
                        >
                            <FaFire className="w-8 h-8 text-yellow-300" />
                        </div>
                        <div 
                            className="absolute bottom-4 left-4"
                            style={{
                                animation: isVisible ? 'bounce 2s infinite' : 'none'
                            }}
                        >
                            <FaGift className="w-6 h-6 text-yellow-300" />
                        </div>
                        <div 
                            className="absolute top-1/2 right-1/4"
                            style={{
                                animation: isVisible ? 'pulse 2s infinite 1s' : 'none'
                            }}
                        >
                            <FaStar className="w-4 h-4 text-yellow-300" />
                        </div>
                    </div>
                    
                    <div className="text-center lg:text-right relative z-10">
                        {/* Main Title with Animation */}
                        <div className="mb-4">
                            <h2 
                                className="text-4xl font-black mb-2"
                                style={{
                                    animation: isVisible ? 'pulse 2s infinite' : 'none'
                                }}
                            >
                                🔥 پیشنهادات شگفت‌انگیز
                            </h2>
                            <div 
                                className="w-16 h-1 bg-yellow-300 mx-auto lg:mx-0 rounded-full"
                                style={{
                                    animation: isVisible ? 'pulse 2s infinite' : 'none'
                                }}
                            ></div>
                        </div>
                        
                        {/* Enthusiastic Subtitle */}
                        <p className="text-red-100 mb-4 text-xl font-bold">
                            تخفیفات فوق‌العاده!
                        </p>
                        <p className="text-red-200 mb-6 text-lg">
                            بهترین قیمت‌ها فقط امروز
                        </p>
                        
                        {/* Call to Action */}
                        <div 
                            className="bg-yellow-400 text-red-800 px-4 py-2 rounded-full font-bold text-sm"
                            style={{
                                animation: isVisible ? 'bounce 2s infinite' : 'none'
                            }}
                        >
                            ⚡ فرصت محدود!
                        </div>
                    </div>
                </div>
                
                {/* Products Section */}
                <div 
                    className="lg:w-2/3 bg-gradient-to-br from-gray-50 to-gray-100 p-6" 
                    dir="rtl"
                >
                    <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {visibleProducts.map((product, index) => (
                            <div 
                                key={`${product.id}-${currentIndex}-${index}`}
                                className={`bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2
                                `}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Product Image */}
                                    <div className="relative mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-44 object-cover rounded-xl"
                                        />
                                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                                            🔥 {product.discount}% تخفیف
                                        </div>
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                                {product.title}
                                            </h3>
                                            
                                            {/* Price */}
                                            <div className="mb-4">
                                                <span className="text-2xl font-bold text-red-600">
                                                    {product.price.toLocaleString()} تومان
                                                </span>
                                                <div className="text-sm text-gray-400 line-through">
                                                    {Math.round(product.price / (1 - product.discount / 100)).toLocaleString()} تومان
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Action Button */}
                                        <Link
                                            to={`/store/${product.id}`}
                                            className="block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                                        >
                                            🛒 مشاهده محصول
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Enhanced Dots Indicator */}
                    {discountedProducts.length > slidesPerView && (
                        <div className="flex justify-center gap-3 mt-8">
                            {isMobile ? (
                                // Mobile: show dots for slides
                                Array.from({ length: Math.ceil(discountedProducts.length / slidesPerView) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index * slidesPerView)}
                                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                            Math.floor(currentIndex / slidesPerView) === index
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 scale-125 shadow-lg animate-pulse' 
                                                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                                        }`}
                                    />
                                ))
                            ) : (
                                // Desktop: show dots for individual products
                                discountedProducts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                            index === currentIndex 
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 scale-125 shadow-lg animate-pulse' 
                                                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                                        }`}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
