import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ role }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50" dir="rtl">
            {/* دسکتاپ: سایدبار ثابت فقط در صفحه بزرگ */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* موبایل: منوی drawer */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 flex"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    {/* بک‌دراپ نیمه شفاف */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* منوی سایدبار کشویی */}
                    <div
                        className="relative w-64 bg-white shadow-lg border-l border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AdminSidebar />
                    </div>
                </div>
            )}

            {/* محتوای اصلی */}
            <div className="flex flex-col flex-1 overflow-hidden lg:pr-72">
                <AdminHeader
                    role={role}
                    onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
                />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
