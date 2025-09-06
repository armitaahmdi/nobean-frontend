import { useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineClock } from "react-icons/hi";
import onlineeducation from "../../../../assets/images/icons/online-education.png"
const colors = [
    "text-pink-600 border-pink-600 bg-pink-100",
    "text-blue-600 border-blue-600 bg-blue-100",
    "text-green-600 border-green-600 bg-green-100",
    "text-yellow-600 border-yellow-600 bg-yellow-100",
    "text-purple-600 border-purple-600 bg-purple-100",
];

export default function AccordionSyllabus({ syllabus }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    if (!syllabus || syllabus.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-900 border-b pb-3">
                <img src={onlineeducation} className="w-10 h-10" />                سرفصل‌های دوره
                سرفصل‌های دوره
            </h3>

            <div className="space-y-4">
                {syllabus.map((chapter, i) => {
                    const isExpanded = expandedIndex === i;
                    const color = colors[i % colors.length];

                    return (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                                className={`w-full flex justify-between items-center p-5 font-semibold transition-colors duration-300 ${isExpanded ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${color}`}
                                    >
                                        {i + 1}
                                    </span>
                                    <span>{chapter.chapterTitle}</span>
                                </div>
                                {isExpanded ? (
                                    <HiChevronUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <HiChevronDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>

                            {/* فقط وقتی بازه، جلسات رو نشون بده */}
                            {isExpanded && (
                                <div className="px-6 pb-5">
                                    <ul className="space-y-3 text-gray-700 text-sm">
                                        {chapter.sessions.map((session, j) => (
                                            <li
                                                key={j}
                                                className="flex justify-between border-b border-gray-200 last:border-0 py-2 items-center"
                                            >
                                                <span>{session.title}</span>
                                                <span className={`flex items-center gap-1 text-gray-500 border border-current rounded-xl px-2 py-0.5 ${color}`}>
                                                    <HiOutlineClock className="w-4 h-4" />
                                                    {session.duration}
                                                </span>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
