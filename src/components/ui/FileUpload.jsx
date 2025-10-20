// import React, { useState, useRef } from 'react';
// import { FaUpload, FaImage, FaVideo, FaTimes, FaCheck } from 'react-icons/fa';

// const FileUpload = ({ 
//     onFileSelect, 
//     onFileRemove, 
//     currentFile = null, 
//     accept = "image/*,video/*", 
//     maxSize = 10 * 1024 * 1024, // 10MB
//     type = "both" // "image", "video", "both"
// }) => {
//     const [dragActive, setDragActive] = useState(false);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState('');
//     const fileInputRef = useRef(null);

//     const handleDrag = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true);
//         } else if (e.type === "dragleave") {
//             setDragActive(false);
//         }
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragActive(false);
        
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             handleFile(e.dataTransfer.files[0]);
//         }
//     };

//     const handleFileInput = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             handleFile(e.target.files[0]);
//         }
//     };

//     const handleFile = async (file) => {
//         setError('');
        
        // Validate file type
        // if (type === "image" && !file.type.startsWith('image/')) {
        //     setError('لطفاً فقط فایل تصویری انتخاب کنید');
        //     return;
        // }
        
        // if (type === "video" && !file.type.startsWith('video/')) {
        //     setError('لطفاً فقط فایل ویدیو انتخاب کنید');
        //     return;
        // }
        
        // if (type === "both" && !file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        //     setError('لطفاً فقط فایل تصویری یا ویدیو انتخاب کنید');
        //     return;
        // }

        // // Validate file size
        // if (file.size > maxSize) {
        //     setError(`حجم فایل نباید بیشتر از ${Math.round(maxSize / 1024 / 1024)} مگابایت باشد`);
        //     return;
        // }

//         setUploading(true);
        
//         try {
//             // Create FormData for file upload
//             const formData = new FormData();
//             formData.append('file', file);
            
//             // Upload file to server
//             const token = localStorage.getItem('authToken');
//             if (!token) {
//                 setError('لطفاً ابتدا وارد شوید');
//                 return;
//             }
            
//             const controller = new AbortController();
//             const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutes timeout
            
//             const response = await fetch('/api/v1/upload', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 signal: controller.signal,
//                 // Remove Content-Type header to let browser set it with boundary for multipart/form-data
//             });
            
//             clearTimeout(timeoutId);
            
//             if (!response.ok) {
//                 throw new Error('خطا در آپلود فایل');
//             }
            
//             const result = await response.json();
            
//             // Call the callback with the uploaded file info
//             // onFileSelect({
//             //     file,
//             //     url: result.url,
//             //     filename: result.filename,
//             //     type: file.type.startsWith('image/') ? 'image' : 'video'
//             // });
//             let fileType = '';
// if (file.type.startsWith('image/')) fileType = 'image';
// else if (file.type.startsWith('video/')) fileType = 'video';
// else fileType = 'other'; // یا می‌تونی خطا بندازی

// onFileSelect({
//     file,
//     url: result.url,
//     filename: result.filename,
//     type: fileType
// });

            
//         } catch (error) {
//             console.error('Upload error:', error);
//             if (error.name === 'AbortError') {
//                 setError('آپلود فایل لغو شد - احتمالاً فایل خیلی بزرگ است');
//             } else if (error.message.includes('500')) {
//                 setError('خطای سرور - لطفاً دوباره تلاش کنید');
//             } else {
//                 setError(error.message || 'خطا در آپلود فایل');
//             }
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleRemove = () => {
//         onFileRemove();
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const getFileIcon = () => {
//         if (currentFile?.type === 'image') return <FaImage className="text-blue-500" />;
//         if (currentFile?.type === 'video') return <FaVideo className="text-purple-500" />;
//         return <FaUpload className="text-gray-400" />;
//     };

//     const getFileTypeText = () => {
//         if (type === "image") return "تصویر";
//         if (type === "video") return "ویدیو";
//         return "تصویر یا ویدیو";
//     };

//     return (
//         <div className="w-full">
//             <div
//                 className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                     dragActive 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : currentFile 
//                             ? 'border-green-500 bg-green-50' 
//                             : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//             >
//                 <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept={accept}
//                     onChange={handleFileInput}
//                     className="hidden"
//                 />
                
//                 {currentFile ? (
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-center space-x-2">
//                             {getFileIcon()}
//                             <span className="text-sm font-medium text-gray-700">
//                                 {currentFile.filename}
//                             </span>
//                             <button
//                                 onClick={handleRemove}
//                                 className="text-red-500 hover:text-red-700 p-1"
//                             >
//                                 <FaTimes />
//                             </button>
//                         </div>
                        
//                         {currentFile.type === 'image' && (
//                             <img
//                                 src={currentFile.url}
//                                 alt="Preview"
//                                 className="max-h-32 mx-auto rounded-lg"
//                             />
//                         )}
                        
//                         {currentFile.type === 'video' && (
//                             <video
//                                 src={currentFile.url}
//                                 controls
//                                 className="max-h-32 mx-auto rounded-lg"
//                             />
//                         )}
                        
//                         <div className="flex items-center justify-center space-x-1 text-green-600">
//                             <FaCheck />
//                             <span className="text-sm">آپلود موفق</span>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         <div className="flex justify-center">
//                             {uploading ? (
//                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                             ) : (
//                                 <FaUpload className="h-8 w-8 text-gray-400" />
//                             )}
//                         </div>
                        
//                         <div>
//                             <p className="text-sm text-gray-600">
//                                 {uploading ? 'در حال آپلود...' : `فایل ${getFileTypeText()} را اینجا بکشید یا کلیک کنید`}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                                 حداکثر حجم: {Math.round(maxSize / 1024 / 1024)} مگابایت
//                             </p>
//                         </div>
                        
//                         <button
//                             type="button"
//                             onClick={() => fileInputRef.current?.click()}
//                             disabled={uploading}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             انتخاب فایل
//                         </button>
//                     </div>
//                 )}
//             </div>
            
//             {error && (
//                 <p className="text-red-500 text-sm mt-2">{error}</p>
//             )}
//         </div>
//     );
// };

// export default FileUpload;


import React, { useState, useRef } from 'react';
import { FaUpload, FaImage, FaVideo, FaTimes, FaCheck } from 'react-icons/fa';

const FileUpload = ({
    onFileSelect,
    onFileRemove,
    currentFile = null,
    accept = "image/*,video/*",
    maxSize = 100 * 1024 * 1024, // 100MB
    type = "both"
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    };

    const handleFile = async (file) => {
        setError('');

        // Validate file type
        if (type === "image" && !file.type.startsWith('image/')) {
            setError('لطفاً فقط فایل تصویری انتخاب کنید');
            return;
        }
        if (type === "video" && !file.type.startsWith('video/')) {
            setError('لطفاً فقط فایل ویدیو انتخاب کنید');
            return;
        }
        if (type === "both" && !file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            setError('لطفاً فقط فایل تصویری یا ویدیو انتخاب کنید');
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`حجم فایل نباید بیشتر از ${Math.round(maxSize / 1024 / 1024)} مگابایت باشد`);
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('لطفاً ابتدا وارد شوید');
                setUploading(false);
                return;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10 * 60 * 1000); // 10 دقیقه

            // Always use production server since backend is running on server
            const uploadUrl = 'https://www.nobean.ir/api/v1/upload';
            
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            setUploading(false);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'خطا در آپلود فایل');
            }

            const result = await response.json();
            onFileSelect({
                file,
                url: result.url,
                filename: result.filename,
                type: file.type.startsWith('image/') ? 'image' : 'video'
            });

        } catch (err) {
            console.error('Upload error:', err);
            setUploading(false);
            if (err.name === 'AbortError') setError('آپلود فایل لغو شد - احتمالاً فایل خیلی بزرگ است');
            else setError(err.message || 'خطا در آپلود فایل');
        }
    };

    const handleRemove = () => {
        onFileRemove();
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getFileIcon = () => {
        if (currentFile?.type === 'image') return <FaImage className="text-blue-500" />;
        if (currentFile?.type === 'video') return <FaVideo className="text-purple-500" />;
        return <FaUpload className="text-gray-400" />;
    };

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : currentFile 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                />

                {currentFile ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            {getFileIcon()}
                            <span className="text-sm font-medium text-gray-700">{currentFile.filename}</span>
                            <button onClick={handleRemove} className="text-red-500 hover:text-red-700 p-1">
                                <FaTimes />
                            </button>
                        </div>

                        {currentFile.type === 'image' && (
                            <img src={currentFile.url} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                        )}
                        {currentFile.type === 'video' && (
                            <video src={currentFile.url} controls className="max-h-48 mx-auto rounded-lg" />
                        )}

                        <div className="flex items-center justify-center space-x-1 text-green-600">
                            <FaCheck />
                            <span className="text-sm">آپلود موفق</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            {uploading ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            ) : (
                                <FaUpload className="h-8 w-8 text-gray-400" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{uploading ? 'در حال آپلود...' : 'فایل را بکشید یا کلیک کنید'}</p>
                        <p className="text-xs text-gray-500 mt-1">حداکثر حجم: {Math.round(maxSize / 1024 / 1024)} مگابایت</p>
                        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            انتخاب فایل
                        </button>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default FileUpload;
