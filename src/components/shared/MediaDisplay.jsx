import React from 'react';
import { getImageUrl, getVideoUrl } from '../../helper/imageUtils';
import { FaImage, FaVideo, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const MediaDisplay = ({ 
    url, 
    type = 'image', // 'image' یا 'video'
    alt = '',
    caption = '',
    className = '',
    showDownload = true,
    showCaption = true
}) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = () => {
        window.open(url, '_blank');
    };

    return (
        <div className={`relative group ${className}`}>
            {/* نمایش رسانه */}
            <div className="relative overflow-hidden rounded-lg border">
                {type === 'image' ? (
                    <img 
                        src={getImageUrl(url)} 
                        alt={alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        onError={(e) => {
                            console.error('Image load error:', url);
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <video 
                        src={getVideoUrl(url)} 
                        controls
                        className="w-full h-auto"
                        preload="metadata"
                        onError={(e) => {
                            console.error('Video load error:', url);
                            e.target.style.display = 'none';
                        }}
                    />
                )}
                
                {/* دکمه‌های اکشن */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                        {showDownload && (
                            <button
                                onClick={handleDownload}
                                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                title="دانلود"
                            >
                                <FaDownload size={12} />
                            </button>
                        )}
                        <button
                            onClick={handleOpenInNewTab}
                            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            title="باز کردن در تب جدید"
                        >
                            <FaExternalLinkAlt size={12} />
                        </button>
                    </div>
                </div>
                
                {/* آیکون نوع فایل */}
                <div className="absolute bottom-2 left-2">
                    <div className="p-2 bg-black/50 text-white rounded-full">
                        {type === 'image' ? <FaImage size={12} /> : <FaVideo size={12} />}
                    </div>
                </div>
            </div>
            
            {/* نمایش کپشن */}
            {showCaption && caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {caption}
                </p>
            )}
        </div>
    );
};

export default MediaDisplay;
