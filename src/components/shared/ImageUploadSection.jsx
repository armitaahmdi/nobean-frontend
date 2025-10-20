import React, { useState } from 'react';
import FileUpload from '../ui/FileUpload';
import { FaImage, FaTimes } from 'react-icons/fa';

const ImageUploadSection = ({ 
    onImageSelect, 
    onImageRemove, 
    currentImage = null,
    label = "تصویر شاخص",
    required = false 
}) => {
    const [uploadedImage, setUploadedImage] = useState(currentImage);

    const handleImageSelect = (fileData) => {
        setUploadedImage(fileData);
        onImageSelect(fileData.url); // فقط URL را به والد ارسال می‌کنیم
    };

    const handleImageRemove = () => {
        setUploadedImage(null);
        onImageRemove();
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            {uploadedImage ? (
                <div className="space-y-4">
                    {/* نمایش تصویر آپلود شده */}
                    <div className="relative">
                        <img 
                            src={uploadedImage.url} 
                            alt="تصویر آپلود شده"
                            className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={handleImageRemove}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaImage />
                        <span>{uploadedImage.filename}</span>
                    </div>
                </div>
            ) : (
                <FileUpload
                    onFileSelect={handleImageSelect}
                    onFileRemove={handleImageRemove}
                    currentFile={uploadedImage}
                    accept="image/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    type="image"
                />
            )}
        </div>
    );
};

export default ImageUploadSection;
