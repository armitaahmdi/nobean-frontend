import translate from "../../../locale/translate";
import { FaPlay, FaFileAlt, FaVideo, FaInfoCircle, FaGraduationCap } from "react-icons/fa";
import { getImageUrl, isValidImagePath, getVideoUrl, isValidVideoPath } from "../../../helper/imageUtils";

export default function DescriptionTab({ description, video, imagePath }) {
    // Get proper image URL
    const imageUrl = getImageUrl(imagePath);
    const hasValidImage = isValidImagePath(imagePath);
    
    // Get proper video URL
    const videoUrl = getVideoUrl(video);
    const hasValidVideo = isValidVideoPath(video);
    
    if (!description && !video) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaFileAlt className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-400 italic text-lg">داده‌ای موجود نیست.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Description & Video Row */}
            <div className="bg-gradient-to-br from-lightBlue/5 via-white to-secondaryBlue/5 rounded-2xl p-6 border border-lightBlue/20 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-lightBlue/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-secondaryBlue/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-lightBlue to-darkBlue rounded-xl flex items-center justify-center shadow-lg">
                            <FaInfoCircle className="text-white text-lg" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{translate.testexplnation}</h3>
                            <p className="text-sm text-gray-600">توضیحات کامل آزمون</p>
                        </div>
                    </div>
                    
                    {/* Content Row - Description Left, Video Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Description Content - Left */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed text-base text-justify">
                                {description}
                            </p>
                            
                            
                        </div>

                        {/* Video Player - Right */}
                        {hasValidVideo && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-lightYellow to-darkYellow rounded-lg flex items-center justify-center">
                                        <FaVideo className="text-white text-sm" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">ویدیو آموزشی</span>
                                </div>
                                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
                                    <video 
                                        controls 
                                        className="w-full h-auto" 
                                        src={videoUrl}
                                        preload="metadata"
                                        playsInline
                                        crossOrigin="anonymous"
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        <source src={videoUrl} type="video/webm" />
                                        <source src={videoUrl} type="video/ogg" />
                                        {translate.unsupportedvideo}
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-secondaryBlue/5 to-lightBlue/5 rounded-2xl p-6 border border-secondaryBlue/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondaryBlue to-lightBlue rounded-xl flex items-center justify-center shadow-lg">
                        <FaGraduationCap className="text-white text-lg" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">نکات مهم</h3>
                        <p className="text-sm text-gray-600">راهنمای شرکت در آزمون</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-lightBlue/10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-lightBlue rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">زمان آزمون</span>
                        </div>
                        <p className="text-xs text-gray-600">حدود 30 دقیقه زمان نیاز دارید</p>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-lightBlue/10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-secondaryBlue rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">نتیجه‌گیری</span>
                        </div>
                        <p className="text-xs text-gray-600">نتایج فوری پس از اتمام آزمون</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

