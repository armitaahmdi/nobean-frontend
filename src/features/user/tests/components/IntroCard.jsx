import { FaTag, FaClock, FaUsers, FaStar, FaImage } from "react-icons/fa";
import translate from "../../../../locale/translate";
import { generateRandomRating } from "../utils/testUtils";
import { getImageUrl, isValidImagePath } from "../../../../helper/imageUtils";

// Default values
const DEFAULT_VALUES = {
    title: 'بدون عنوان',
    description: 'توضیحات در دسترس نیست',
    shortDescription: 'توضیحات کوتاه در دسترس نیست',
    image: '/default-test.png',
    category: 'عمومی',
    tags: [],
    time: 0,
    participants: 0,
    target_audience: 'ویژه فرزندان',
    suitableFor: [],
    rating: null
};

export default function IntroCard({ 
    title = DEFAULT_VALUES.title,
    description = DEFAULT_VALUES.description,
    shortDescription = DEFAULT_VALUES.shortDescription,
    imagepath = DEFAULT_VALUES.image,
    category = DEFAULT_VALUES.category,
    tags = DEFAULT_VALUES.tags,
    time = DEFAULT_VALUES.time,
    participants = DEFAULT_VALUES.participants,
    target_audience = DEFAULT_VALUES.target_audience,
    suitableFor = DEFAULT_VALUES.suitableFor,
    rating = DEFAULT_VALUES.rating
}) {
    // Use generated rating if not provided
    const displayRating = rating || generateRandomRating();
    
    // Ensure arrays are properly handled
    const displayTags = Array.isArray(tags) ? tags : [];
    const displaySuitableFor = Array.isArray(suitableFor) ? suitableFor : [];
    
    // Get proper image URL
    const imageUrl = getImageUrl(imagepath);
    const hasValidImage = isValidImagePath(imagepath);
    
    // Debug logging
    console.log('IntroCard Debug:', {
        title,
        description,
        shortDescription,
        time,
        participants,
        target_audience,
        suitableFor: displaySuitableFor,
        tags: displayTags,
        rating: displayRating
    });
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
          
            <div className="p-6 relative z-10">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-lightBlue/10 via-transparent to-secondaryBlue/10"></div>
                
                <div className="relative z-10">
                {/* Header with icon and title */}
                <div className="flex items-start gap-4 mb-4">
                <div className="w-28 h-28 bg-gradient-to-r from-lightBlue to-darkBlue rounded-xl flex items-center justify-center shadow-md overflow-hidden">
                    {hasValidImage ? (
                        <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-xl" />
                    ) : (
                        <FaImage className="w-8 h-8 text-white" />
                    )}
                </div>

                    
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                            {title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-lightBlue/10 text-lightBlue rounded-full text-sm font-semibold">
                                {category}
                            </span>
                            <div className="flex items-center text-lightYellow">
                                <FaStar className="text-sm" />
                                <span className="text-sm font-semibold mr-1">{displayRating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {shortDescription || description}
                    </p>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-6 mb-4">
                    {time && time > 0 && (
                        <div className="flex items-center text-gray-600">
                            <FaClock className="text-lightBlue ml-2" />
                            <span className="text-sm">{time} دقیقه</span>
                        </div>
                    )}
                    {participants !== undefined && (
                        <div className="flex items-center text-gray-600">
                            <FaUsers className="text-secondaryBlue ml-2" />
                            <span className="text-sm">+{participants} شرکت کننده</span>
                        </div>
                    )}
                    {displayRating && (
                        <div className="flex items-center text-lightYellow">
                            <FaStar className="text-sm" />
                            <span className="text-sm font-semibold mr-1">{displayRating}</span>
                        </div>
                    )}
                </div>

                {/* Target Audience and Suitable For */}
                {(target_audience || suitableFor) && (
                    <div className="mb-4 space-y-2">
                        {target_audience && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-700">گروه هدف:</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    {target_audience}
                                </span>
                            </div>
                        )}
                        {displaySuitableFor && displaySuitableFor.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-700">مناسب برای:</span>
                                <div className="flex flex-wrap gap-1">
                                    {displaySuitableFor.map((item, index) => (
                                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tags */}
                {displayTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {displayTags.map((tag, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <FaTag size={8} className="text-lightBlue" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
