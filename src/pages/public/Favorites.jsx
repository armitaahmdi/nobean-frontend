import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    FaHeart, 
    FaShoppingCart, 
    FaTrash, 
    FaArrowLeft,
    FaPlus,
    FaEye
} from 'react-icons/fa';
import { 
    removeFromFavorites, 
    clearFavorites,
    addToCart
} from '../../features/user/store/slices/cartSlice';
import HelmetSeo from '../../helper/helmet';
import translate from '../../locale/translate';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites, loading } = useSelector((state) => state.cart);
    const { setPageTitle, clearPageTitle } = useBreadcrumb();

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("علاقه مندی ها");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    const handleRemoveFromFavorites = (productId) => {
        dispatch(removeFromFavorites(productId));
    };

    const handleClearFavorites = () => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید همه علاقه‌مندی‌ها را حذف کنید؟')) {
            dispatch(clearFavorites());
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
    };

    const handleContinueShopping = () => {
        navigate('/store');
    };

    if (favorites.length === 0) {
        return (
            <>
                <HelmetSeo
                    title="علاقه‌مندی‌ها خالی | فروشگاه نوبین"
                    description="لیست علاقه‌مندی‌های شما خالی است. محصولات مورد نظر خود را اضافه کنید."
                    keywords="علاقه‌مندی‌ها, فروشگاه نوبین, محصولات مورد علاقه"
                />
                <div className="min-h-screen py-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FaHeart className="text-6xl text-red-400" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">لیست علاقه‌مندی‌های شما خالی است</h1>
                            <p className="text-xl text-gray-600 mb-8">محصولات مورد نظر خود را به علاقه‌مندی‌ها اضافه کنید</p>
                            <button
                                onClick={handleContinueShopping}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                            >
                                ادامه خرید
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HelmetSeo
                title={`علاقه‌مندی‌ها (${favorites.length} آیتم) | فروشگاه نوبین`}
                description={`لیست علاقه‌مندی‌های شما شامل ${favorites.length} محصول است.`}
                keywords="علاقه‌مندی‌ها, محصولات مورد علاقه, فروشگاه نوبین"
            />
            <div className="min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <FaArrowLeft className="text-xl text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">علاقه‌مندی‌ها</h1>
                                <p className="text-gray-600 mt-1">{favorites.length} محصول در لیست علاقه‌مندی‌های شما</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearFavorites}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <FaTrash className="text-lg" />
                            حذف همه
                        </button>
                    </div>

                    {/* Favorites Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                                {/* Product Image */}
                                <div className="relative">
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Discount Badge */}
                                    {product.discount && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-xl">
                                                {product.discount}% تخفیف
                                            </div>
                                        </div>
                                    )}

                                    {/* Remove from Favorites Button */}
                                    <button
                                        onClick={() => handleRemoveFromFavorites(product.id)}
                                        className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm text-red-500 rounded-full shadow-xl hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-110"
                                    >
                                        <FaHeart className="text-xl" />
                                    </button>

                                    {/* Quick View Button */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            onClick={() => navigate(`/store/${product.id}`)}
                                            className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <FaEye className="text-sm" />
                                            مشاهده سریع
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                                            {product.type === "book" ? "کتاب" : product.type === "magazine" ? "مجله" : "بازی"}
                                        </span>
                                        <span className="text-gray-600 text-sm">
                                            {product.ageGroup} سال
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            {product.discount ? (
                                                <>
                                                    <span className="text-xl font-bold text-green-600">
                                                        {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {product.price.toLocaleString()}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xl font-bold text-gray-900">
                                                    {product.price.toLocaleString()}
                                                </span>
                                            )}
                                            <span className="text-sm text-gray-600">تومان</span>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.categories.slice(0, 2).map((category, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={loading}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <FaShoppingCart className="text-lg" />
                                            افزودن به سبد
                                        </button>
                                        <button
                                            onClick={() => navigate(`/store/${product.id}`)}
                                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <FaPlus className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Continue Shopping Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={handleContinueShopping}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            ادامه خرید
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesPage;
