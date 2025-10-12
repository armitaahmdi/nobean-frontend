import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { TbSparkles } from "react-icons/tb";

export default function ModernFilters({ 
    products, 
    filteredProducts, 
    onFilterChange, 
    onSearchChange,
    searchTerm,
    activeFilters
}) {
    const [selectedAudiences, setSelectedAudiences] = useState([]);
    const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
    
    // Sync internal state with activeFilters prop
    useEffect(() => {
        setSelectedAudiences(activeFilters.audiences || []);
        setShowDiscountedOnly(activeFilters.discount || false);
    }, [activeFilters]);
    
    // Get unique target audiences
    const targetAudiences = [...new Set(products.map(product => product.target_audience))];
    
    // Sort options
    const sortOptions = [
        { value: 'newest', label: 'جدیدترین' },
        { value: 'oldest', label: 'قدیمی‌ترین' },
        { value: 'price-low', label: 'کمترین قیمت' },
        { value: 'price-high', label: 'بیشترین قیمت' },
        { value: 'rating', label: 'بیشترین امتیاز' }
    ];

    const handleAudienceFilter = (audience) => {
        const newSelectedAudiences = selectedAudiences.includes(audience)
            ? selectedAudiences.filter(aud => aud !== audience)
            : [...selectedAudiences, audience];
        
        setSelectedAudiences(newSelectedAudiences);
        onFilterChange({ type: 'audience', value: audience });
    };

    const handleSortChange = (sortValue) => {
        onFilterChange({ type: 'sort', value: sortValue });
    };

    const handleDiscountFilter = () => {
        const newShowDiscountedOnly = !showDiscountedOnly;
        setShowDiscountedOnly(newShowDiscountedOnly);
        onFilterChange({ type: 'discount', value: newShowDiscountedOnly });
    };

    const clearFilters = () => {
        setSelectedAudiences([]);
        setShowDiscountedOnly(false);
        onFilterChange({ type: 'clear' });
    };

    // Check if any filters are active
    const hasActiveFilters = selectedAudiences.length > 0 || showDiscountedOnly;

    return (
        <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <FaSearch className="h-6 w-6 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="جستجو در محصولات..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pr-14 pl-6 py-5 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none text-right transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm"
                />
            </div>

            {/* Filter Section Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <FaFilter className="w-5 h-5" />
                    <span className="font-bold text-lg">فیلترها</span>
                    <TbSparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 rounded-full"></div>
            </div>

            {/* Ultra Modern Filter Panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-gradient-to-r from-blue-200 to-purple-200 rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl"></div>
                    <div className="absolute top-4 left-4 w-20 h-20 bg-blue-300 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 right-4 w-32 h-32 bg-purple-300 rounded-full blur-xl"></div>
                </div>
                
                <div className="relative z-10 flex flex-wrap items-center gap-8">
                    {/* Suitable For Filter */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold">مناسب برای</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {targetAudiences.map((audience) => (
                                <label key={audience} className="flex items-center cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={selectedAudiences.includes(audience)}
                                            onChange={() => handleAudienceFilter(audience)}
                                            className="w-6 h-6 text-transparent bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg appearance-none"
                                        />
                                        {selectedAudiences.includes(audience) && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <span className={`mr-3 text-sm font-semibold transition-all duration-300 ${
                                        selectedAudiences.includes(audience) 
                                            ? 'text-blue-700 bg-blue-100 px-3 py-1 rounded-xl' 
                                            : 'text-gray-600 group-hover:text-gray-800 group-hover:bg-gray-100 px-3 py-1 rounded-xl'
                                    }`}>
                                        {audience}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold">مرتب‌سازی</span>
                        </div>
                        <div className="relative">
                            <select
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-5 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-300 appearance-none bg-white cursor-pointer text-sm font-semibold shadow-lg hover:shadow-xl min-w-[160px]"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Discount Filter */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold">تخفیف‌دار</span>
                        </div>
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={showDiscountedOnly}
                                    onChange={handleDiscountFilter}
                                    className="w-6 h-6 text-transparent bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg appearance-none"
                                />
                                {showDiscountedOnly && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <span className={`mr-3 text-sm font-semibold transition-all duration-300 ${
                                showDiscountedOnly 
                                    ? 'text-orange-700 bg-orange-100 px-3 py-1 rounded-xl' 
                                    : 'text-gray-600 group-hover:text-gray-800 group-hover:bg-gray-100 px-3 py-1 rounded-xl'
                            }`}>
                                فقط تخفیف‌دار
                            </span>
                        </label>
                    </div>

                    {/* Clear Filters Button - Only show when filters are active */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <FaTimes className="w-4 h-4" />
                            پاک کردن فیلترها
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
