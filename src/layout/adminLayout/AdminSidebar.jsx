import adminMenu from "../../config/adminMenu";
import SidebarItem from "../../features/admin/components/sidebar/SidebarItem";

import { useState } from "react";
import { HiSearch, HiSparkles } from "react-icons/hi";

export default function AdminSidebar() {
    const [searchQuery, setSearchQuery] = useState("");

    // فیلتر کردن منو بر اساس جستجو
    const filteredMenu = adminMenu.filter(item => {
        if (!searchQuery) return true;
        const nameMatch = item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const submenuMatch = item.submenu && item.submenu.some(sub => 
            sub.name && sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return nameMatch || submenuMatch;
    });

    return (
        <aside className="fixed top-0 right-0 h-screen w-72 bg-gradient-to-b from-slate-50 to-white shadow-xl border-l border-slate-200 flex flex-col">
            {/* هدر مدرن */}
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <HiSparkles className="text-white text-lg" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">پنل مدیریت</h1>
                    </div>
                </div>
            </div>

            {/* جستجوی مدرن */}
            <div className="px-4 py-4 border-b border-slate-200">
                <div className="relative">
                    <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                        type="text"
                        placeholder="جستجو در منو..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                    />
                </div>
            </div>

            {/* منو مدرن */}
            <nav className="flex flex-col flex-1 p-4 gap-2 overflow-auto">
                {filteredMenu.length === 0 ? (
                    <div className="text-center py-8">
                        <HiSearch className="text-slate-400 text-3xl mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">موردی یافت نشد</p>
                    </div>
                ) : (
                    filteredMenu.map((item) => (
                        <SidebarItem key={item.id} item={item} />
                    ))
                )}
            </nav>

            {/* فوتر مدرن */}
            <div className="p-4 border-t border-slate-200">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-600">نسخه پنل</p>
                            <p className="text-sm font-bold text-slate-800">2.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
