import { HiClock } from "react-icons/hi2";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiOutlineListBullet } from "react-icons/hi2";
import translate from "../../../../locale/translate";
import { Link } from "react-router-dom";
import { getShortenText } from "../../../../helper/helperFunction";
import { useEffect, useState } from "react";
import { testsApi } from "../../../../services/testsApi";

// Constants
const BADGE_COLORS = {
    "ویژه والدین و فرزندان": "#FDC730",
    "ویژه والدین": "#629BF7",
    "ویژه فرزندان": "#34A853",
    "ویژه خانواده": "#FF6B6B"
};

const DEFAULT_VALUES = {
    title: 'بدون عنوان',
    image: '/default-test.png',
    time: 0,
    questionsCount: 0,
    participants: 0,
    description: 'توضیحات در دسترس نیست'
};

export default function TestCard({ test }) {
    // Ensure test object exists and has required properties
    if (!test) return null;
    
    const badgeBgColor = BADGE_COLORS[test.target_audience] || "gray";
    
    // Extract values with fallbacks
    const {
        title = DEFAULT_VALUES.title,
        imagepath = DEFAULT_VALUES.image,
        time = DEFAULT_VALUES.time,
        participants = DEFAULT_VALUES.participants,
        description = DEFAULT_VALUES.description,
        target_audience = 'ویژه فرزندان',
        id = 'unknown'
    } = test;

    // Normalize question count from various possible API fields
    const normalizedQuestionsCount = (
        test.questionsCount !== undefined && test.questionsCount !== null
            ? test.questionsCount
            : (test.question_count !== undefined && test.question_count !== null
                ? test.question_count
                : DEFAULT_VALUES.questionsCount)
    );

    const [lazyQuestionsCount, setLazyQuestionsCount] = useState(null);

    useEffect(() => {
        let isMounted = true;
        // If count is unknown/zero, try to fetch test details to get question_count
        if (!normalizedQuestionsCount && id && id !== 'unknown') {
            (async () => {
                try {
                    const resp = await testsApi.getTestById(id);
                    const data = resp?.data || resp;
                    if (isMounted && data && (data.question_count !== undefined && data.question_count !== null)) {
                        setLazyQuestionsCount(data.question_count);
                    }
                } catch (e) {
                    // silently ignore
                }
            })();
        }
        return () => { isMounted = false; };
    }, [id, normalizedQuestionsCount]);

    return (
        <div className="group relative w-full bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-lightBlue/40 transform hover:-translate-y-1">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-lightBlue/3 via-transparent to-secondaryBlue/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Badge */}
            <div style={{ backgroundColor: badgeBgColor }}
                className="absolute top-4 right-4 rounded-xl text-xs py-1.5 px-3 font-semibold text-white shadow-md z-10 transform group-hover:scale-105 transition-transform duration-300">
                {target_audience}
            </div>

            {/* Image */}
            <div className="relative h-36 overflow-hidden">
                <img 
                    src={imagepath} 
                    alt={title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-lightBlue/10 via-transparent to-secondaryBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content */}
            <div className="p-5 relative z-10">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-1 group-hover:text-lightBlue transition-colors duration-300">
                    {title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {getShortenText(description)}
                </p>

                {/* Enhanced Stats Layout */}
                <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 group/stat">
                            <div className="w-9 h-9 bg-gradient-to-br from-lightBlue/15 to-lightBlue/5 rounded-xl flex items-center justify-center shadow-sm group-hover/stat:shadow-md transition-all duration-300 group-hover/stat:scale-105">
                                <HiClock className="text-lightBlue w-4 h-4" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">{time}</span>
                                <span className="text-gray-500 mr-1 text-xs">دقیقه</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group/stat">
                            <div className="w-9 h-9 bg-gradient-to-br from-lightYellow/15 to-lightYellow/5 rounded-xl flex items-center justify-center shadow-sm group-hover/stat:shadow-md transition-all duration-300 group-hover/stat:scale-105">
                                <HiOutlineListBullet className="text-lightYellow w-4 h-4" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">{lazyQuestionsCount ?? normalizedQuestionsCount}</span>
                                <span className="text-gray-500 mr-1 text-xs">سوال</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 group/stat">
                        <div className="w-9 h-9 bg-gradient-to-br from-secondaryBlue/15 to-secondaryBlue/5 rounded-xl flex items-center justify-center shadow-sm group-hover/stat:shadow-md transition-all duration-300 group-hover/stat:scale-105">
                            <HiOutlineHashtag className="text-secondaryBlue w-4 h-4" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-gray-900">+{participants}</span>
                            <span className="text-gray-500 mr-1 text-xs">شرکت کننده</span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Action Button */}
                <Link to={`/tests/${id}`}>
                    <button className="relative w-full bg-gradient-to-r from-lightBlue to-darkBlue text-white hover:from-darkBlue hover:to-lightBlue rounded-xl py-3 font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
                        <span className="relative z-10">{translate.startfree}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                </Link>
            </div>
        </div>
    );
}