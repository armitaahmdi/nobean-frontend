import { Link } from "react-router-dom";

export default function StatCard({ title, count, icon: Icon, color = "blue", link }) {
    const colorConfig = {
        blue: {
            bg: "bg-gradient-to-br from-blue-50 via-white to-blue-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
            iconColor: "text-white",
            textColor: "text-blue-600",
            buttonBg: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            border: "border-blue-200/50",
            shadow: "shadow-blue-200/50",
            glow: "shadow-blue-500/20"
        },
        green: {
            bg: "bg-gradient-to-br from-emerald-50 via-white to-emerald-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            iconColor: "text-white",
            textColor: "text-emerald-600",
            buttonBg: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
            border: "border-emerald-200/50",
            shadow: "shadow-emerald-200/50",
            glow: "shadow-emerald-500/20"
        },
        purple: {
            bg: "bg-gradient-to-br from-purple-50 via-white to-purple-50",
            iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
            iconColor: "text-white",
            textColor: "text-purple-600",
            buttonBg: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
            border: "border-purple-200/50",
            shadow: "shadow-purple-200/50",
            glow: "shadow-purple-500/20"
        },
        orange: {
            bg: "bg-gradient-to-br from-orange-50 via-white to-orange-50",
            iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
            iconColor: "text-white",
            textColor: "text-orange-600",
            buttonBg: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
            border: "border-orange-200/50",
            shadow: "shadow-orange-200/50",
            glow: "shadow-orange-500/20"
        },
        red: {
            bg: "bg-gradient-to-br from-red-50 via-white to-red-50",
            iconBg: "bg-gradient-to-br from-red-500 to-red-600",
            iconColor: "text-white",
            textColor: "text-red-600",
            buttonBg: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
            border: "border-red-200/50",
            shadow: "shadow-red-200/50",
            glow: "shadow-red-500/20"
        },
        teal: {
            bg: "bg-gradient-to-br from-teal-50 via-white to-teal-50",
            iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
            iconColor: "text-white",
            textColor: "text-teal-600",
            buttonBg: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
            border: "border-teal-200/50",
            shadow: "shadow-teal-200/50",
            glow: "shadow-teal-500/20"
        }
    };

    const config = colorConfig[color] || colorConfig.blue;

    return (
        <div className={`${config.bg} ${config.border} border backdrop-blur-sm rounded-3xl shadow-lg ${config.shadow} hover:shadow-2xl ${config.glow} transition-all duration-500 hover:-translate-y-2 hover:scale-105 group relative overflow-hidden`}>
            {/* افکت پس‌زمینه */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* محتوای اصلی */}
            <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                    {/* آیکون فوق‌العاده مدرن */}
                    <div className={`${config.iconBg} ${config.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                        <Icon className="text-2xl" />
                        {/* افکت نور */}
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* دکمه مدرن */}
                    <Link
                        to={link}
                        className={`${config.buttonBg} ${config.iconColor} px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm`}
                    >
                        <span className="flex items-center gap-1">
                            بیشتر
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* آمار مدرن */}
                <div className="space-y-2">
                    <div className="text-4xl font-black text-gray-900 group-hover:text-gray-800 transition-colors duration-300">{count}</div>
                    <div className={`text-base font-semibold ${config.textColor} group-hover:scale-105 transition-transform duration-300`}>{title}</div>
                </div>
            </div>

            {/* نوار پایین مدرن */}
            <div className={`h-2 ${config.iconBg} rounded-b-3xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
        </div>
    );
}
