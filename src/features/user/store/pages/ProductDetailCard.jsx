import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiStar, HiHeart, HiShare, HiEye, HiMinus, HiPlus, HiX } from "react-icons/hi";
import { FaHeart, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo, FaTrash, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../../components/shared/Button";
import translate from "../../../../locale/translate";
import { addToCart, addToFavorites, increaseQuantity, decreaseQuantity, removeFromCart } from "../slices/cartSlice";

const ProductDetailCard = ({ product }) => {
    const dispatch = useDispatch();
    const { favorites, loading, items } = useSelector((state) => state.cart);
    
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

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

    // Mock product images array
    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image
    ];

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        try {
            await dispatch(addToCart({ product, quantity })).unwrap();
            toast.success(`${quantity} عدد ${product.title} به سبد خرید اضافه شد`);
        } catch (error) {
            toast.error("خطا در افزودن به سبد خرید");
        } finally {
            setIsAddingToCart(false);
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

    const handleBuyNow = () => {
        toast.success("در حال انتقال به صفحه پرداخت...");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    toast.success("لینک کپی شد");
                })
                .catch(() => {
                    toast.error("کپی لینک انجام نشد");
                });
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success("لینک کپی شد");
            })
            .catch(() => {
                toast.error("کپی لینک انجام نشد");
            });
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isImageZoomed) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isImageZoomed]);

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Clean Product Showcase */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Main Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="relative bg-gray-50 p-6">
                            {/* Main Image */}
                            <div className="relative group mb-4">
                                <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm cursor-zoom-in"
                                     onClick={() => setIsImageZoomed(true)}>
                                    <img
                                        src={productImages[selectedImage]}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                
                                {/* Discount Badge */}
                                {product.discount && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {product.discount}% تخفیف
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="flex gap-2 justify-center">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            selectedImage === index
                                                ? "border-blue-500 shadow-md"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="p-6">
                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 mb-6">
                                <button
                                    onClick={handleLike}
                                    disabled={loading}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        isLiked
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isLiked ? <FaHeart className="text-lg" /> : <HiHeart className="text-lg" />}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                                >
                                    <HiShare className="text-lg" />
                                </button>
                            </div>

                            {/* Product Meta */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    {product.type === "book" ? "کتاب" : product.type === "magazine" ? "مجله" : "بازی"}
                                </span>
                                {product.ratingAverage > 0 && (
                                    <div className="flex items-center gap-1">
                                        <HiStar className="text-yellow-500 text-sm" />
                                        <span className="text-sm font-semibold text-gray-700">{product.ratingAverage}</span>
                                        <span className="text-xs text-gray-500">({product.reviews?.length || 0})</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Title */}
                            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>
                            
                            {/* Product Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 text-sm">گروه سنی:</span>
                                    <span className="text-sm font-semibold text-gray-800">{product.ageGroup} سال</span>
                                </div>
                                {product.target_audience && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600 text-sm">مناسب برای:</span>
                                        <span className="text-sm font-semibold text-gray-800">{product.target_audience}</span>
                                    </div>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.categories.map((category, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>

                            {/* Price Section */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                {product.discount ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-bold text-green-600">
                                                {finalPrice.toLocaleString()}
                                            </span>
                                            <span className="text-lg text-gray-600">تومان</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg text-gray-400 line-through">
                                                {product.price.toLocaleString()} تومان
                                            </span>
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                                                {product.discount}% تخفیف
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-bold text-gray-900">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-lg text-gray-600">تومان</span>
                                    </div>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm text-gray-600">
                                        {product.stock > 0 ? `${product.stock} عدد موجود` : "ناموجود"}
                                    </span>
                                </div>
                            </div>

                            {/* Cart Controls */}
                            {cartQuantity === 0 ? (
                                <div className="space-y-4">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0 || isAddingToCart}
                                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                                            product.stock > 0 && !isAddingToCart
                                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        {isAddingToCart ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                در حال افزودن...
                                            </>
                                        ) : (
                                            <>
                                                <FaShoppingCart className="text-lg" />
                                                افزودن به سبد خرید
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                                        <button
                                            onClick={handleIncreaseQuantity}
                                            disabled={product.stock <= cartQuantity}
                                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
                                        >
                                            <HiPlus className="text-sm" />
                                        </button>
                                        
                                        <div className="flex-1 text-center">
                                            <span className="text-lg font-semibold text-gray-900">{cartQuantity}</span>
                                            <span className="text-sm text-gray-600 mr-2">عدد در سبد</span>
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
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="px-6 py-8 border-t border-gray-200">
                        {/* Trust Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                                <FaTruck className="text-blue-600 text-lg" />
                                <div>
                                    <div className="text-sm font-semibold text-blue-800">ارسال رایگان</div>
                                    <div className="text-xs text-blue-600">برای خریدهای بالای 500 هزار تومان</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl">
                                <FaShieldAlt className="text-green-600 text-lg" />
                                <div>
                                    <div className="text-sm font-semibold text-green-800">ضمانت کیفیت</div>
                                    <div className="text-xs text-green-600">محصولات اورجینال</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl">
                                <FaUndo className="text-purple-600 text-lg" />
                                <div>
                                    <div className="text-sm font-semibold text-purple-800">بازگشت 7 روزه</div>
                                    <div className="text-xs text-purple-600">بدون قید و شرط</div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details Tabs */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex border-b border-gray-300 mb-6 overflow-x-auto">
                                {[
                                    { id: "description", label: "توضیحات", icon: HiEye },
                                    { id: "reviews", label: `نظرات (${product.reviews?.length || 0})`, icon: HiStar },
                                    { id: "specifications", label: "مشخصات", icon: FaCheck }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        <tab.icon className="text-lg" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[300px]">
                                {activeTab === "description" && (
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                    </div>
                                )}

                                {activeTab === "reviews" && (
                                    <div className="space-y-4">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map((review) => (
                                                <div key={review.id} className="bg-white rounded-xl p-4 border border-gray-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                                {review.user.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold text-gray-900">{review.user}</span>
                                                                <div className="text-xs text-gray-500">{review.createdAt}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <HiStar
                                                                    key={i}
                                                                    className={`text-lg ${
                                                                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <HiStar className="text-2xl text-gray-400" />
                                                </div>
                                                <p className="text-gray-500 text-lg font-medium mb-2">هنوز نظری ثبت نشده است</p>
                                                <p className="text-gray-400 text-sm">اولین نفری باشید که نظر می‌دهد</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "specifications" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-700 text-sm font-medium">نوع محصول:</span>
                                                    <span className="font-semibold text-blue-900 text-sm">
                                                        {product.type === "book" ? "کتاب" : product.type === "magazine" ? "مجله" : "بازی"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-green-700 text-sm font-medium">گروه سنی:</span>
                                                    <span className="font-semibold text-green-900 text-sm">{product.ageGroup} سال</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-purple-700 text-sm font-medium">موجودی:</span>
                                                    <span className="font-semibold text-purple-900 text-sm">{product.stock} عدد</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-orange-700 text-sm font-medium">تاریخ انتشار:</span>
                                                    <span className="font-semibold text-orange-900 text-sm">{product.publishedAt}</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-red-700 text-sm font-medium">امتیاز:</span>
                                                    <span className="font-semibold text-red-900 text-sm">{product.ratingAverage || "بدون امتیاز"}</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-indigo-700 text-sm font-medium">دسته‌بندی:</span>
                                                    <span className="font-semibold text-indigo-900 text-sm">{product.categories.join(", ")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Zoom Modal */}
            {isImageZoomed && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                     onClick={() => setIsImageZoomed(false)}>
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setIsImageZoomed(false)}
                            className="absolute -top-16 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
                        >
                            <HiX />
                        </button>
                        <img
                            src={productImages[selectedImage]}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailCard;