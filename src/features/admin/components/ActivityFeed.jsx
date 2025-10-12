import { useState, useMemo } from "react";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";
import { selectRecentActivities, selectRecentUsers, selectDashboardStats } from "../slices/dashboardSlice";
import {
    FaUserPlus,
    FaClipboardList,
    FaComments,
    FaCreditCard,
    FaUserTie,
    FaBookOpen,
} from "react-icons/fa";

const iconMap = {
    signup: { icon: <FaUserPlus />, color: "bg-blue-500" },
    exam: { icon: <FaClipboardList />, color: "bg-green-500" },
    comment: { icon: <FaComments />, color: "bg-purple-500" },
    payment: { icon: <FaCreditCard />, color: "bg-yellow-500" },
    consultation: { icon: <FaUserTie />, color: "bg-pink-500" },
    coursePurchase: { icon: <FaBookOpen />, color: "bg-indigo-500" },
};

const typeLabels = {
    all: "همه",
    signup: "ثبت‌نام",
    exam: "آزمون",
    comment: "دیدگاه",
    payment: "پرداخت",
    consultation: "مشاوره",
    coursePurchase: "خرید دوره",
};

export default function ActivityFeed() {
    const [filter, setFilter] = useState("all");
    const activities = useSelector(selectRecentActivities);
    const recentUsers = useSelector(selectRecentUsers);
    const dashboardStats = useSelector(selectDashboardStats);

    console.log('ActivityFeed - Raw activities data:', activities);
    console.log('ActivityFeed - Recent users data:', recentUsers);

    // تبدیل فعالیت‌های آزمون به فرمت مورد نیاز
    const examActivities = (activities || []).map((attempt, index) => ({
        id: `exam-${attempt.id || index}`,
        type: 'exam',
        message: `کاربر ${attempt.user?.firstName || 'نامشخص'} ${attempt.user?.lastName || ''} آزمون "${attempt.examTitle || 'نامشخص'}" را با نمره ${attempt.score || 0} تکمیل کرد`,
        timestamp: attempt.completedAt || new Date().toISOString(),
        user: attempt.user,
        examTitle: attempt.examTitle,
        score: attempt.score
    }));

    // تبدیل ثبت‌نام‌های کاربران به فرمت مورد نیاز
    const signupActivities = (recentUsers || []).map((user, index) => ({
        id: `signup-${user.id || index}`,
        type: 'signup',
        message: `کاربر جدید "${user.firstName || 'نامشخص'} ${user.lastName || ''}" در سیستم ثبت‌نام کرد`,
        timestamp: user.createdAt || new Date().toISOString(),
        user: user
    }));

    // ترکیب و مرتب‌سازی فعالیت‌ها بر اساس زمان
    const allActivities = [...examActivities, ...signupActivities].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    console.log('ActivityFeed - All activities:', allActivities);

    const filteredData =
        filter === "all"
            ? allActivities
            : allActivities.filter((item) => item.type === filter);

    return (
        <div className="max-w-xl mt-6 p-4 bg-white rounded-lg shadow">
            {/* فیلتر دکمه‌ای */}
            <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(typeLabels).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${filter === key
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* لیست فعالیت‌ها */}
            <ul className="relative border-r-2 border-gray-300">
                {filteredData.length === 0 && (
                    <li className="text-gray-500 text-sm p-4 text-center">
                        {allActivities.length === 0 
                            ? "هنوز هیچ فعالیتی ثبت نشده است." 
                            : "موردی یافت نشد."
                        }
                    </li>
                )}
                {filteredData.map((item) => {
                    const { icon, color } = iconMap[item.type] || {
                        icon: null,
                        color: "bg-gray-400",
                    };
                    return (
                        <li key={item.id} className="mb-6 mr-6 relative">
                            <div className="bg-gray-50 shadow rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <span
                                        className={`text-white p-2 rounded-full text-sm flex items-center justify-center ${color}`}
                                    >
                                        {icon}
                                    </span>
                                    <p className="text-sm font-medium">{item.message}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {moment(item.timestamp).format("jYYYY/jMM/jDD HH:mm")}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
