import React, { useState } from 'react';
import FileUpload from '../ui/FileUpload';
import { FaVideo, FaTimes } from 'react-icons/fa';

const VideoUploadSection = ({ 
    onVideoSelect, 
    onVideoRemove, 
    currentVideo = null,
    label = "ویدیو",
    required = false 
}) => {
    const [uploadedVideo, setUploadedVideo] = useState(currentVideo);

    const handleVideoSelect = (fileData) => {
        setUploadedVideo(fileData);
        onVideoSelect(fileData.url); // فقط URL را به والد ارسال می‌کنیم
    };

    const handleVideoRemove = () => {
        setUploadedVideo(null);
        onVideoRemove();
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            {uploadedVideo ? (
                <div className="space-y-4">
                    {/* نمایش ویدیو آپلود شده */}
                    <div className="relative">
                        <video 
                            src={uploadedVideo.url} 
                            controls
                            className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={handleVideoRemove}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaVideo />
                        <span>{uploadedVideo.filename}</span>
                    </div>
                </div>
            ) : (
                <FileUpload
                    onFileSelect={handleVideoSelect}
                    onFileRemove={handleVideoRemove}
                    currentFile={uploadedVideo}
                    accept="video/*"
                    maxSize={100 * 1024 * 1024} // 100MB
                    type="video"
                />
            )}
        </div>
    );
};

export default VideoUploadSection;
