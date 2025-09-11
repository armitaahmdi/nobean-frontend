import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    FaShoppingCart, 
    FaTrash, 
    FaPlus, 
    FaMinus, 
    FaHeart,
    FaArrowLeft,
    FaCreditCard,
    FaTruck,
    FaShieldAlt,
    FaUndo,
    FaTag,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import { 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart,
    addToFavorites
} from '../../features/user/store/slices/cartSlice';
import HelmetSeo from '../../helper/helmet';
import translate from '../../locale/translate';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalItems, totalPrice, loading } = useSelector((state) => state.cart);
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    
    // Discount code state
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [discountError, setDiscountError] = useState('');
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("سبد خرید");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید سبد خرید را خالی کنید؟')) {
            dispatch(clearCart());
        }
    };

    const handleAddToFavorites = (product) => {
        dispatch(addToFavorites(product));
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/store');
    };

    // Mock discount codes for demonstration
    const validDiscountCodes = {
        'WELCOME10': { percentage: 10, description: 'تخفیف 10 درصدی برای خرید اول' },
        'SAVE20': { percentage: 20, description: 'تخفیف 20 درصدی ویژه' },
        'STUDENT15': { percentage: 15, description: 'تخفیف دانشجویی 15 درصد' },
        'FAMILY25': { percentage: 25, description: 'تخفیف خانوادگی 25 درصد' }
    };

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            setDiscountError('لطفاً کد تخفیف را وارد کنید');
            return;
        }

        setIsApplyingDiscount(true);
        setDiscountError('');

        // Simulate API call
        setTimeout(() => {
            const code = discountCode.trim().toUpperCase();
            if (validDiscountCodes[code]) {
                const discount = validDiscountCodes[code];
                setAppliedDiscount({
                    code: code,
                    percentage: discount.percentage,
                    description: discount.description,
                    amount: Math.round((totalPrice * discount.percentage) / 100)
                });
                setDiscountError('');
            } else {
                setDiscountError('کد تخفیف اشتباه است');
                setAppliedDiscount(null);
            }
            setIsApplyingDiscount(false);
        }, 1000);
    };

    const handleRemoveDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode('');
        setDiscountError('');
    };

    // Calculate final total
    const finalTotal = appliedDiscount 
        ? totalPrice - appliedDiscount.amount 
        : totalPrice;

    if (items.length === 0) {
        return (
            <>
                <HelmetSeo
                    title="سبد خرید خالی | فروشگاه نوبین"
                    description="سبد خرید شما خالی است. محصولات مورد نظر خود را اضافه کنید."
                    keywords="سبد خرید, فروشگاه نوبین, خرید آنلاین"
                />
                <div className="min-h-screen py-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FaShoppingCart className="text-6xl text-gray-400" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">سبد خرید شما خالی است</h1>
                            <p className="text-xl text-gray-600 mb-8">محصولات مورد نظر خود را اضافه کنید</p>
                            <button
                                onClick={handleContinueShopping}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl"
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
                title={`سبد خرید (${totalItems} آیتم) | فروشگاه نوبین`}
                description={`سبد خرید شما شامل ${totalItems} آیتم به ارزش ${totalPrice.toLocaleString()} تومان است.`}
                keywords="سبد خرید, خرید آنلاین, فروشگاه نوبین, تسویه حساب"
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
                                <h1 className="text-3xl font-bold text-gray-900">سبد خرید</h1>
                                <p className="text-gray-600 mt-1">{totalItems} آیتم در سبد شما</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <FaTrash className="text-lg" />
                            خالی کردن سبد
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="p-6">
                                        <div className="flex items-center gap-6">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                                                        {item.type === "book" ? "کتاب" : item.type === "magazine" ? "مجله" : "بازی"}
                                                    </span>
                                                    <span className="text-gray-600 text-sm">
                                                        گروه سنی: {item.ageGroup} سال
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {item.price.toLocaleString()} تومان
                                                        </span>
                                                        {item.discount && (
                                                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                                                                {item.discount}% تخفیف
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                                                    <button
                                                        onClick={() => handleDecreaseQuantity(item.id)}
                                                        className="p-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                                                    >
                                                        <FaMinus className="text-lg" />
                                                    </button>
                                                    <span className="px-6 py-3 border-x border-gray-300 min-w-[80px] text-center text-lg font-bold bg-gray-50">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncreaseQuantity(item.id)}
                                                        className="p-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                                                    >
                                                        <FaPlus className="text-lg" />
                                                    </button>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleAddToFavorites(item)}
                                                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 hover:scale-105"
                                                        title="افزودن به علاقه‌مندی‌ها"
                                                    >
                                                        <FaHeart className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 hover:scale-105"
                                                        title="حذف از سبد"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">خلاصه سفارش</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">تعداد آیتم‌ها:</span>
                                        <span className="font-bold text-gray-900">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">قیمت کل:</span>
                                        <span className="font-bold text-gray-900">{totalPrice.toLocaleString()} تومان</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">هزینه ارسال:</span>
                                        <span className="font-bold text-green-600">رایگان</span>
                                    </div>
                                    
                                    {/* Discount Code Section */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FaTag className="text-lightBlue" />
                                            <span className="text-gray-700 font-semibold">کد تخفیف</span>
                                        </div>
                                        
                                        {!appliedDiscount ? (
                                            <div className="space-y-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={discountCode}
                                                        onChange={(e) => setDiscountCode(e.target.value)}
                                                        placeholder="کد تخفیف خود را وارد کنید"
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent text-sm"
                                                        dir="ltr"
                                                    />
                                                    <button
                                                        onClick={handleApplyDiscount}
                                                        disabled={isApplyingDiscount || !discountCode.trim()}
                                                        className="px-4 py-2 bg-lightBlue text-white rounded-xl hover:bg-darkBlue transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                    >
                                                        {isApplyingDiscount ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        ) : (
                                                            <FaCheck className="text-sm" />
                                                        )}
                                                    </button>
                                                </div>
                                                
                                                {discountError && (
                                                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                                                        <FaTimes className="text-sm" />
                                                        <span>{discountError}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FaCheck className="text-green-600" />
                                                        <div>
                                                            <p className="text-green-800 font-semibold text-sm">{appliedDiscount.code}</p>
                                                            <p className="text-green-600 text-xs">{appliedDiscount.description}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleRemoveDiscount}
                                                        className="text-green-600 hover:text-green-800 transition-colors"
                                                    >
                                                        <FaTimes className="text-sm" />
                                                    </button>
                                                </div>
                                                <div className="mt-2 text-green-800 font-bold">
                                                    تخفیف: {appliedDiscount.amount.toLocaleString()} تومان ({appliedDiscount.percentage}%)
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between items-center text-xl">
                                        <span className="font-bold text-gray-900">مجموع:</span>
                                        <span className={`font-bold ${appliedDiscount ? 'text-green-600' : 'text-blue-600'}`}>
                                            {finalTotal.toLocaleString()} تومان
                                        </span>
                                    </div>
                                    
                                    {appliedDiscount && (
                                        <div className="text-sm text-gray-500 text-center">
                                            شما {appliedDiscount.amount.toLocaleString()} تومان صرفه‌جویی کردید!
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <FaCreditCard className="text-xl" />
                                            تسویه حساب
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleContinueShopping}
                                    className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    <FaTruck className="text-xl" />
                                    ادامه خرید
                                </button>

                                {/* Trust Indicators */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaTruck className="text-blue-500" />
                                        <span>ارسال رایگان برای خریدهای بالای 500 هزار تومان</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaShieldAlt className="text-green-500" />
                                        <span>ضمانت کیفیت محصولات</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaUndo className="text-purple-500" />
                                        <span>بازگشت 7 روزه بدون قید و شرط</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
