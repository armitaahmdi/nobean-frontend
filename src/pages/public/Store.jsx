import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../features/user/store/productsSlice";
import translate from "../../locale/translate";
import HelmetSeo from "../../helper/helmet";
import AmazingOffersSlider from "../../features/user/store/components/AmazingOffersSlider";
import ShoppingByCategory from "../../features/user/store/components/ShoppingByCategory";
import BestSellers from "../../features/user/store/components/BestSellers";
import NewArrivals from "../../features/user/store/components/NewArrivals";
import ModernFilters from "../../features/user/store/components/ModernFilters";
import PaginatedStoreList from "../../features/user/store/components/PaginatedStoreList";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { useBreadcrumb } from "../../contexts/BreadcrumbContext";

export default function Store() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((store) => store.products);
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [activeFilters, setActiveFilters] = useState({
        audiences: [],
        sort: 'newest',
        discount: false
    });

    // Ref for scrolling to All Products section
    const allProductsRef = useRef(null);

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("فروشگاه");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Apply filters and search
    useEffect(() => {
        let filtered = [...products];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply audience filters
        if (activeFilters.audiences.length > 0) {
            filtered = filtered.filter(product =>
                activeFilters.audiences.includes(product.target_audience)
            );
        }

        // Apply discount filter
        if (activeFilters.discount) {
            filtered = filtered.filter(product => product.discount && product.discount > 0);
        }

        // Apply sorting
        switch (activeFilters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, searchTerm, activeFilters]);

    const handleFilterChange = ({ type, value }) => {
        if (type === 'clear') {
            setActiveFilters({
                audiences: [],
                sort: 'newest',
                discount: false
            });
            setSearchTerm("");
        } else if (type === 'audience') {
            setActiveFilters(prev => ({
                ...prev,
                audiences: prev.audiences.includes(value)
                    ? prev.audiences.filter(aud => aud !== value)
                    : [...prev.audiences, value]
            }));
        } else if (type === 'sort') {
            setActiveFilters(prev => ({
                ...prev,
                sort: value
            }));
        } else if (type === 'discount') {
            setActiveFilters(prev => ({
                ...prev,
                discount: !prev.discount
            }));
        }
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    // Handle category selection - scroll to All Products and apply filter
    const handleCategorySelect = (categoryTitle) => {
        // Apply the category filter
        setActiveFilters(prev => ({
            ...prev,
            audiences: [categoryTitle] // Set only this category
        }));
        
        // Clear search term
        setSearchTerm("");
        
        // Scroll to All Products section after a short delay to ensure filter is applied
        setTimeout(() => {
            if (allProductsRef.current) {
                allProductsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;

    return (
        <>
            <HelmetSeo 
                title={translate.store.title}
                description={translate.store.description}
                keywords={translate.store.keywords}
            />
            
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Amazing Offers Slider */}
                <AmazingOffersSlider products={products} />
                
                {/* Shopping by Category */}
                <ShoppingByCategory onCategorySelect={handleCategorySelect} />
                
                {/* Best Sellers */}
                <BestSellers products={products} />
                
                {/* New Arrivals */}
                <NewArrivals products={products} />
                
                {/* Modern Filters */}
                <ModernFilters
                    products={products}
                    filteredProducts={filteredProducts}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                    activeFilters={activeFilters}
                />
                
                {/* Product List */}
                <div className="mb-8" ref={allProductsRef}>
                    {/* Category Filter Header */}
                    {activeFilters.audiences.length > 0 && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-900">
                                            نمایش محصولات: {activeFilters.audiences.join('، ')}
                                        </h3>
                                        <p className="text-sm text-blue-700">
                                            {filteredProducts.length} محصول از این دسته‌بندی یافت شد
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleFilterChange({ type: 'clear' })}
                                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    حذف فیلتر
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">همه محصولات</h2>
                        <div className="text-sm text-gray-600">
                            {filteredProducts.length} محصول
                        </div>
                    </div>
                    <PaginatedStoreList 
                        products={filteredProducts} 
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </div>
            </div>
        </>
    );
}
