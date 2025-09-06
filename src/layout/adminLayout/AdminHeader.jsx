import ConfirmModal from "../../components/shared/ConfirmModal";
import setting from "../../assets/images/icons/settings.png"
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function AdminHeader({ role, onMobileMenuToggle }) {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        // اینجا logout واقعی رو انجام بده (مثلاً پاک کردن توکن و ریدایرکت)
        setShowModal(false);
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div className="flex items-center text-gray-800 text-lg font-semibold">

                <button
                    onClick={onMobileMenuToggle}
                    className="lg:hidden p-2 rounded hover:bg-gray-200 transition"
                    aria-label="باز و بسته کردن منوی موبایل"
                >
                    <HiMenu className="w-6 h-6" />
                </button>

                <img src={setting} alt="settings" className="w-6 h-6 ml-2" />
                <span>سلام، {role}</span>
            </div>

            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-sm text-red-600 hover:text-red-800 border border-red-100 hover:border-red-200 px-4 py-1.5 rounded transition"
                >
                    خروج
                </button>
            </div>

            {showModal && (
                <ConfirmModal
                    message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
                    onConfirm={handleLogout}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </header>
    );
}