import { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

export default function ModernFilters({ 
    products, 
    filteredProducts, 
    onFilterChange, 
    onSearchChange,
    searchTerm,
    activeFilters
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
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

    return (
        <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="جستجو در محصولات..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                />
            </div>

            {/* Filter Toggle Button */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <FaFilter className="w-4 h-4" />
                    فیلترها
                </button>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">فیلتر محصولات</h3>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Suitable For Filter */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 text-lg">مناسب برای</h4>
                            
                            <div className="space-y-3">
                                {targetAudiences.map((audience) => (
                                    <label key={audience} className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedAudiences.includes(audience)}
                                            onChange={() => handleAudienceFilter(audience)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <span className="mr-3 text-gray-700">{audience}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sort Options */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 text-lg">مرتب‌سازی</h4>
                            
                            <div className="relative">
                                <select
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white cursor-pointer"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Discount Filter */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 text-lg">تخفیف‌دار</h4>
                            
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showDiscountedOnly}
                                        onChange={handleDiscountFilter}
                                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                    />
                                    <span className="mr-3 text-gray-700">فقط محصولات تخفیف‌دار</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={clearFilters}
                            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                        >
                            پاک کردن همه فیلترها
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
