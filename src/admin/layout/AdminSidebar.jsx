// import adminMenu from "../config/adminMenu";
// import SidebarItem from "../components/sidebar/SidebarItem";

// export default function AdminSidebar() {
//     return (
//         <aside className="fixed top-0 right-0 h-screen w-64 bg-white shadow border-l border-gray-200 flex flex-col">
//             <div className="p-6 text-xl font-bold text-gray-700 border-b">پنل مدیریت</div>
//             <nav className="flex flex-col flex-1 p-4 gap-2 overflow-auto">
//                 {adminMenu.map((item) => (
//                     <SidebarItem key={item.id} item={item} />
//                 ))}
//             </nav>
//         </aside>
//     );
// }
import adminMenu from "../config/adminMenu";
import SidebarItem from "../components/sidebar/SidebarItem";

export default function AdminSidebar() {
    return (
        <aside className="fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-white to-blue-50 shadow-xl border-l border-blue-200 flex flex-col">
            {/* هدر زیبا با پس‌زمینه رنگی */}
            <div className="p-6 text-2xl font-extrabold text-blue-800 border-b border-blue-300 select-none">
                پنل مدیریت
            </div>

            {/* نوار جستجو ساده */}
            <div className="px-4 py-2 border-b border-blue-200">
                <input
                    type="text"
                    placeholder="جستجو در منو..."
                    className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
            </div>

            {/* منو با فضای بیشتر و فاصله بین آیتم‌ها */}
            <nav className="flex flex-col flex-1 p-4 gap-3 overflow-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                {adminMenu.map((item) => (
                    <SidebarItem key={item.id} item={item} />
                ))}
            </nav>

            {/* فوتر کوچک با نسخه */}
            <div className="p-4 text-center text-xs text-blue-400 border-t border-blue-200 select-none">
                نسخه پنل ۱.۰.۰
            </div>
        </aside>
    );
}
