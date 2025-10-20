import {
    HiUser,
    HiCalendar,
    HiTag,
    HiClock,
} from "react-icons/hi";

export default function ArticleInfo({ author, date, category, readingTime, tags }) {
    const formatJalali = (isoDate) => {
        try {
            if (!isoDate) return '';
            const d = new Date(isoDate);
            // Persian (Jalali) calendar using Intl
            const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
            return formatter.format(d);
        } catch {
            return date;
        }
    };

    const items = [
        { icon: HiUser, label: "نویسنده", value: author },
        { icon: HiCalendar, label: "تاریخ انتشار", value: formatJalali(date) },
        { icon: HiTag, label: "دسته‌بندی", value: category },
        { icon: HiClock, label: "زمان مطالعه", value: readingTime ? `${readingTime} دقیقه` : '' }
    ];
    return (
        <div className="mb-10 text-gray-800" dir="rtl">
            <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                {items.map((item, idx) =>
                    item.value ? (
                        <div
                            key={idx}
                            className="flex items-center gap-2
                           
                           px-4 py-2 rounded-lg shadow-md hover:shadow-lg
                           transition-transform duration-300 transform hover:scale-105
                           cursor-default select-none
                           w-auto min-w-[140px]"
                        >
                            <item.icon className="text-blue-800 w-5 h-5 flex-shrink-0" />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-blue-900">
                                {/* تو موبایل متن کنار هم */}
                                <span className="text-xs font-semibold whitespace-nowrap">{item.label}:</span>
                                <span className="text-sm font-bold whitespace-nowrap">{item.value}</span>
                            </div>
                        </div>
                    ) : null
                )}
            </div>

            {tags && tags.length > 0 && (
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="cursor-pointer
                             bg-blue-200 text-blue-900 font-semibold
                             px-4 py-1 rounded-full shadow-sm
                             hover:bg-blue-300
                             transition-colors duration-300 transform
                             hover:scale-105 select-none text-xs sm:text-sm"
                                title={tag}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
