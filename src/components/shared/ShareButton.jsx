import React from "react";
import { IoShareSocialOutline, IoCopyOutline } from "react-icons/io5";
import { FaShareNodes } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ShareButton() {
    const currentUrl = window.location.href;

    const handleShareClick = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: "این مقاله رو بخون!",
                    url: currentUrl,
                });
                toast.success("اشتراک‌گذاری انجام شد");
            } catch {
                toast.error("اشتراک‌گذاری لغو یا خطایی رخ داد");
            }
        } else {
            // fallback: کپی آدرس به کلیپبورد
            try {
                await navigator.clipboard.writeText(currentUrl);
                toast.success("آدرس کپی شد!");
            } catch {
                toast.error("کپی آدرس انجام نشد");
            }
        }
    };

    return (
        <div>
            <button
                onClick={handleShareClick}
                className="flex items-center gap-2 px-6 py-3
                            rounded-lg
                            bg-blue-600 text-white
                            font-semibold
                            shadow-md
                            hover:bg-blue-700
                            active:bg-blue-800
                            transition
                            duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-300
                            select-none
  "
            >
                <FaShareNodes />
                اشتراک‌گذاری
            </button>

            {/* این کامپوننت باید یک بار تو روت پروژه باشه، می‌تونی اینجا بذاری */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
            />
        </div>
    );
}
