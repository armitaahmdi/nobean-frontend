import { useState } from 'react';
import {
    HiLightBulb,
    HiCheckCircle,
    HiClipboardList,
    HiUsers,
    HiCube,
    HiGift,
    HiChevronDown,
    HiChevronUp,
} from 'react-icons/hi';
import AccordionSyllabus from './AccordionSyllabus';

const iconsMap = {
    'هدف دوره چیست؟': <HiLightBulb className="text-yellow-500 text-xl" />,
    'چرا این دوره مهم است؟': <HiCheckCircle className="text-blue-500 text-xl" />,
    'سرفصل‌های دوره': <HiClipboardList className="text-indigo-500 text-xl" />,
    'مناسب برای': <HiUsers className="text-pink-500 text-xl" />,
    'ویژگی‌های دوره': <HiCube className="text-green-500 text-xl" />,
    'مزایای دوره': <HiGift className="text-red-400 text-xl" />,
};

export default function CourseHighlights({ highlights }) {
    const [expanded, setExpanded] = useState(false);

    if (!highlights) return null;

    const { goals, importance, syllabus, suitableFor, features, benefits } = highlights;

    function renderSection(title, items) {
        if (!items || items.length === 0) return null;
        return (
            <div className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-3">
                    {iconsMap[title]}
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pr-1">
                    {items.map((item, i) => (
                        <li key={i} className="text-sm sm:text-base leading-relaxed">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    

    function renderFeaturesAsCards(items) {
        if (!items || items.length === 0) return null;

        const colorThemes = [
            { bg: 'bg-pink-50', border: 'border-pink-400' },
            { bg: 'bg-blue-50', border: 'border-blue-400' },
            { bg: 'bg-green-50', border: 'border-green-400' },
            { bg: 'bg-yellow-50', border: 'border-yellow-400' },
            { bg: 'bg-purple-50', border: 'border-purple-400' },
            { bg: 'bg-rose-50', border: 'border-rose-400' },
            { bg: 'bg-orange-50', border: 'border-orange-400' },
            { bg: 'bg-indigo-50', border: 'border-indigo-400' },
        ];

        return (
            <div className="col-span-full">
                <div className="flex items-center gap-2 mb-4">
                    {iconsMap['📦 ویژگی‌های دوره']}
                    <h3 className="text-lg font-semibold text-gray-800">ویژگی‌های دوره</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((feature, index) => {
                        const color = colorThemes[index % colorThemes.length];
                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition ${color.bg} ${color.border}`}
                            >
                                <img
                                    src={feature.icon}
                                    alt="ویژگی"
                                    className="w-10 h-10 object-contain"
                                />
                                <span className="text-sm text-gray-800 font-semibold text-center leading-tight">
                                    {feature.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const allSections = [
        { title: '🎯 هدف دوره چیست؟', items: goals },
        { title: '💡 چرا این دوره مهم است؟', items: importance },
        // { title: '🧩 سرفصل‌های دوره', items: syllabus },
        { title: '👨‍👩‍👧 مناسب برای', items: suitableFor },
        { title: '🎁 مزایای دوره', items: benefits },
    ];

    return (
        <>
            <div
                className={`relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 transition-all duration-500 ${expanded ? 'max-h-[2000px]' : 'max-h-[400px] overflow-hidden'
                    }`}
            >
                {allSections.map(({ title, items }) => renderSection(title, items))}
                <div className="col-span-full">
                    <AccordionSyllabus syllabus={syllabus} />
                </div>
                {renderFeaturesAsCards(features)}
                {!expanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                )}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
                >
                    {expanded ? 'بستن' : 'مشاهده بیشتر'}
                    {expanded ? <HiChevronUp className="text-xl" /> : <HiChevronDown className="text-xl" />}
                </button>
            </div>
        </>
    );
}
