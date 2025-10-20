import React from 'react';
import { getImageUrl } from '../../helper/imageUtils';

const ArticleImage = ({ src, alt, className = '', fallbackText = 'تصویر' }) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const resolvedSrc = src ? getImageUrl(src) : null;

    if (!resolvedSrc || imageError) {
        return (
            <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-gray-500 text-sm font-medium">{fallbackText}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            )}
            <img 
                src={resolvedSrc} 
                alt={alt}
                className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    console.error('Image load error:', resolvedSrc);
                    setImageError(true);
                }}
            />
        </div>
    );
};

export default ArticleImage;
