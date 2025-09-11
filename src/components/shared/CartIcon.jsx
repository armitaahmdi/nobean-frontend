import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { toggleCart } from '../../features/user/store/slices/cartSlice';

const CartIcon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { totalItems, favorites } = useSelector((state) => state.cart);

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleFavoritesClick = () => {
        navigate('/favorites');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {/* Cart Icon */}
            <button
                onClick={handleCartClick}
                className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
            >
                <FaShoppingCart className="text-xl" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                        {totalItems > 99 ? '99+' : totalItems}
                    </span>
                )}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    سبد خرید ({totalItems} آیتم)
                </div>
            </button>

            {/* Favorites Icon */}
            <button
                onClick={handleFavoritesClick}
                className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
            >
                <FaHeart className="text-xl" />
                {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                        {favorites.length > 99 ? '99+' : favorites.length}
                    </span>
                )}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    علاقه‌مندی‌ها ({favorites.length} آیتم)
                </div>
            </button>
        </div>
    );
};

export default CartIcon;
