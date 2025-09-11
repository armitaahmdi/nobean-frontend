import { HiStar, HiHeart, HiEye, HiPlus, HiMinus } from "react-icons/hi2";
import { FaShoppingCart, FaHeart, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../../components/shared/Button";
import { addToCart, addToFavorites, increaseQuantity, decreaseQuantity, removeFromCart } from "../slices/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { favorites, loading, items } = useSelector((state) => state.cart);
    
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    // Check if product is in favorites and cart
    useEffect(() => {
        const isInFavorites = favorites.some(fav => fav.id === product.id);
        setIsLiked(isInFavorites);
    }, [favorites, product.id]);
    
    // Get cart item for this product
    const cartItem = items.find(item => item.id === product.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    
    const finalPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    const savings = product.discount ? product.price - finalPrice : 0;

    const handleAddToCart = async () => {
        try {
            await dispatch(addToCart({ product, quantity: 1 })).unwrap();
            toast.success(`${product.title} به سبد خرید اضافه شد`);
        } catch (error) {
            toast.error("خطا در افزودن به سبد خرید");
        }
    };

    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(product.id));
    };

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(product.id));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
        toast.success(`${product.title} از سبد خرید حذف شد`);
    };

    const handleLike = async () => {
        try {
            await dispatch(addToFavorites(product)).unwrap();
            if (isLiked) {
                toast.success("از علاقه‌مندی‌ها حذف شد");
            } else {
                toast.success("به علاقه‌مندی‌ها اضافه شد");
            }
        } catch (error) {
            toast.error("خطا در افزودن به علاقه‌مندی‌ها");
        }
    };

    return (
        <div 
            className="group w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image Container */}
            <div className="relative overflow-hidden">
                <Link to={`/store/${product.id}`}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                                isHovered ? 'scale-110' : 'scale-100'
                            }`}
                        />
                    </div>
                </Link>
                
                {/* Discount Badge */}
                {product.discount && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        {product.discount}% تخفیف
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleLike}
                    disabled={loading}
                    className={`absolute top-2 left-2 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                        isLiked 
                            ? 'bg-red-500 text-white shadow-lg' 
                            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLiked ? <FaHeart className="text-xs sm:text-sm" /> : <HiHeart className="text-xs sm:text-sm" />}
                </button>

                {/* Quick View Button */}
                <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                    <Link to={`/store/${product.id}`}>
                        <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <HiEye className="text-sm" />
                            مشاهده سریع
                        </button>
                    </Link>
                </div>

                {/* Stock Status Badge */}
                <div className="absolute bottom-4 left-4">
                    {product.stock > 0 ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            موجود
                        </span>
                    ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ناموجود
                        </span>
                    )}
                </div>
            </div>

            {/* Product Content */}
            <div className="p-3 sm:p-6 flex flex-col flex-grow">
                {/* Title and Description */}
                <div className="mb-3">
                    <Link to={`/store/${product.id}`}>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-right mb-2 leading-tight overflow-hidden hover:text-blue-600 transition-colors" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {product.title}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 text-right leading-relaxed overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {product.description}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.categories.slice(0, 2).map((category, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium"
                        >
                            {category}
                        </span>
                    ))}
                    {product.categories.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                            +{product.categories.length - 2}
                        </span>
                    )}
                </div>

                {/* Age Group and Rating */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                        {product.ratingAverage > 0 ? (
                            <>
                                <HiStar className="text-yellow-400 text-sm" />
                                <span className="text-sm font-medium text-gray-700">{product.ratingAverage}</span>
                                <span className="text-xs text-gray-500">({product.reviews?.length || 0})</span>
                            </>
                        ) : (
                            <span className="text-xs text-gray-400">بدون امتیاز</span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500">
                        گروه سنی: {product.ageGroup}
                    </div>
                </div>

                {/* Price Section */}
                <div className="mb-4">
                    {product.discount ? (
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-lg sm:text-xl font-bold text-green-600">
                                        {finalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">تومان</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                                        {product.price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-lg sm:text-xl font-bold text-gray-900">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500">تومان</span>
                        </div>
                    )}
                </div>

                {/* Dynamic Cart Button */}
                <div className="mt-auto">
                    {cartQuantity === 0 ? (
                        <Button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0 || loading}
                            className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                                product.stock > 0 && !loading
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <FaShoppingCart className="text-sm" />
                                    {product.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                                </>
                            )}
                        </Button>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 border border-gray-200">
                            <button
                                onClick={handleIncreaseQuantity}
                                disabled={product.stock <= cartQuantity}
                                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
                            >
                                <HiPlus className="text-sm" />
                            </button>
                            
                            <div className="flex-1 text-center">
                                <span className="text-sm font-bold text-gray-900">{cartQuantity}</span>
                            </div>
                            
                            <button
                                onClick={cartQuantity === 1 ? handleRemoveFromCart : handleDecreaseQuantity}
                                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors"
                            >
                                {cartQuantity === 1 ? (
                                    <FaTrash className="text-xs" />
                                ) : (
                                    <HiMinus className="text-sm" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
