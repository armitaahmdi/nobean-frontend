import ConfirmModal from "../../components/shared/ConfirmModal";
import setting from "../../assets/images/icons/settings.png"
import { useState } from "react";
import { HiMenu, HiHome, HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, clearAuth } from "../../features/authentication/slices/loginSlice";
import NotificationBell from "../../components/admin/NotificationBell";

export default function AdminHeader({ role, onMobileMenuToggle }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // پاک کردن state از Redux
        dispatch(clearAuth());
        
        // پاک کردن localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // ریدایرکت به صفحه اصلی
        navigate('/');
        
        setShowModal(false);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center text-gray-800 text-lg font-semibold">
                <button
                    onClick={onMobileMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    aria-label="باز و بسته کردن منوی موبایل"
                >
                    <HiMenu className="w-6 h-6 text-gray-600" />
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <img src={setting} alt="settings" className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="text-gray-800 font-semibold">سلام، {role}</span>
                        <p className="text-xs text-gray-500">خوش آمدید</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <NotificationBell />
                
                {/* دکمه رفتن به صفحه اصلی */}
                <button
                    onClick={handleGoHome}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-50"
                    title="رفتن به صفحه اصلی"
                >
                    <HiHome className="w-4 h-4" />
                    خانه
                </button>
                
                {/* دکمه خروج */}
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-red-50"
                    title="خروج از سیستم"
                >
                    <HiLogout className="w-4 h-4" />
                    خروج
                </button>
            </div>

            {showModal && (
                <ConfirmModal
                    message="آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟"
                    onConfirm={handleLogout}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </header>
    );
}