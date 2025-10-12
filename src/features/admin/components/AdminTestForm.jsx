import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminTest, updateAdminTest, clearError } from '../slices/adminTestsSlice';
import FileUpload from '../../../components/ui/FileUpload';
import { 
    FaTimes, 
    FaSave, 
    FaImage, 
    FaClock, 
    FaTag, 
    FaUsers, 
    FaDollarSign,
    FaFileAlt,
    FaExclamationCircle,
    FaCheckCircle,
    FaVideo
} from 'react-icons/fa';

export default function AdminTestForm({ test, onClose, onSave }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.adminTests);
    
    const [formData, setFormData] = useState({
        title: '',
        time: 90,
        mainDescription: '',
        ShortDescription: '',
        target_audience: '',
        price: 15000,
        category: '',
        imagepath: '',
        suitableFor: [],
        tags: [],
        descriptionVideo: "",
        minAge: '',
        maxAge: '',
        components: []
    });

    const [uploadedFiles, setUploadedFiles] = useState({
        coverImage: null,
        descriptionVideo: null
    });

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // (حذف مراحل اضافی حیطه/مولفه در این مدال)
    const [createdTestId, setCreatedTestId] = useState(null);

    useEffect(() => {
        if (test) {
            setFormData({
                title: test.title || '',
                time: test.time || 90,
                mainDescription: test.mainDescription || '',
                ShortDescription: test.ShortDescription || '',
                target_audience: test.target_audience || '',
                price: test.price || 15000,
                category: test.category || '',
                imagepath: test.imagepath || '',
                suitableFor: Array.isArray(test.suitableFor) ? test.suitableFor : [],
                tags: Array.isArray(test.tags) ? test.tags : [],
                descriptionVideo: test.descriptionVideo || '',
                minAge: test.minAge ?? '',
                maxAge: test.maxAge ?? '',
                components: Array.isArray(test.components) ? test.components : []
            });
        }
    }, [test]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'عنوان باید حداقل 3 کاراکتر باشد';
        }

        if (!formData.time || formData.time <= 0) {
            newErrors.time = 'زمان باید بیشتر از 0 باشد';
        }

        if (!formData.price || formData.price < 0) {
            newErrors.price = 'قیمت نمی‌تواند منفی باشد';
        }

        if (!formData.category) {
            newErrors.category = 'دسته‌بندی الزامی است';
        }

        if (!formData.target_audience) {
            newErrors.target_audience = 'گروه هدف الزامی است';
        }

        // Validate ages if provided
        const minAgeNum = formData.minAge === '' ? null : parseInt(formData.minAge, 10);
        const maxAgeNum = formData.maxAge === '' ? null : parseInt(formData.maxAge, 10);
        if (minAgeNum !== null && (isNaN(minAgeNum) || minAgeNum < 0 || minAgeNum > 120)) {
            newErrors.minAge = 'حداقل سن باید بین 0 تا 120 باشد';
        }
        if (maxAgeNum !== null && (isNaN(maxAgeNum) || maxAgeNum < 0 || maxAgeNum > 120)) {
            newErrors.maxAge = 'حداکثر سن باید بین 0 تا 120 باشد';
        }
        if (minAgeNum !== null && maxAgeNum !== null && minAgeNum > maxAgeNum) {
            newErrors.maxAge = 'حداکثر سن باید بزرگتر یا مساوی حداقل سن باشد';
        }

        if (!formData.ShortDescription || formData.ShortDescription.length < 10) {
            newErrors.ShortDescription = 'توضیحات کوتاه باید حداقل 10 کاراکتر باشد';
        }

        if (!formData.mainDescription || formData.mainDescription.length < 20) {
            newErrors.mainDescription = 'توضیحات کامل باید حداقل 20 کاراکتر باشد';
        }

        // حذف اعتبارسنجی مولفه‌ها از مرحله 2 (به مرحله‌های 4 و 5 منتقل شد)

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const testData = {
                title: formData.title.trim(),
                time: parseInt(formData.time),
                date: new Date().toISOString().split('T')[0],
                mainDescription: formData.mainDescription.trim(),
                ShortDescription: formData.ShortDescription.trim(),
                target_audience: formData.target_audience.trim(),
                price: parseInt(formData.price),
                category: formData.category,
                imagePath: formData.imagepath.trim(),
                suitableFor: formData.suitableFor,
                tags: formData.tags,
                descriptionVideo: formData.descriptionVideo || null,
                minAge: formData.minAge === '' ? null : parseInt(formData.minAge, 10),
                maxAge: formData.maxAge === '' ? null : parseInt(formData.maxAge, 10),
                components: Array.isArray(formData.components) ? formData.components : []
            };

            if (test) {
                await dispatch(updateAdminTest({ id: test.id, testData }));
                onSave();
            } else {
                const res = await dispatch(createAdminTest(testData)).unwrap();
                const newId = res?.id || res?.test?.id || res?.data?.id;
                if (newId) setCreatedTestId(newId);
                onSave();
            }
        } catch (error) {
            console.error('Error saving test:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            const currentValues = formData[name] || [];
            if (checked) {
                setFormData(prev => ({
                    ...prev,
                    [name]: [...currentValues, value]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: currentValues.filter(item => item !== value)
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileUpload = (fileType, fileInfo) => {
        setUploadedFiles(prev => ({
            ...prev,
            [fileType]: fileInfo
        }));
        
        // Update formData with the file path
        if (fileType === 'coverImage') {
            setFormData(prev => ({
                ...prev,
                imagepath: fileInfo.url
            }));
        } else if (fileType === 'descriptionVideo') {
            setFormData(prev => ({
                ...prev,
                descriptionVideo: fileInfo.url
            }));
        }
    };

    const handleFileRemove = (fileType) => {
        setUploadedFiles(prev => ({
            ...prev,
            [fileType]: null
        }));
        
        // Clear formData file path
        if (fileType === 'coverImage') {
            setFormData(prev => ({
                ...prev,
                imagepath: ''
            }));
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const targetAudienceOptions = [
        { value: 'ویژه فرزندان', label: 'ویژه فرزندان' },
        { value: 'ویژه والدین', label: 'ویژه والدین' },
        { value: 'ویژه والدین و فرزندان', label: 'ویژه والدین و فرزندان' },
    ];

    const categoryOptions = [
        { value: 'learning_disability', label: 'اختلال یادگیری' },
        { value: 'reading_disorder', label: 'اختلال خواندن' },
        { value: 'writing_disorder', label: 'اختلال نوشتن' },
        { value: 'math_disorder', label: 'اختلال ریاضی' },
        { value: 'attention_disorder', label: 'اختلال توجه' },
        { value: 'learning_style', label: 'سبک یادگیری' },
    ];

    const suitableForOptions = [
        'والدین',
        'فرزندان',
        'معلمان',
        'مشاوران',
        'روانشناسان'
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {test ? 'ویرایش آزمون' : 'افزودن آزمون جدید'}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                مرحله {currentStep} از {totalSteps}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex items-center">
                            {[...Array(totalSteps)].map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        index + 1 <= currentStep 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 text-gray-600'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    {index < totalSteps - 1 && (
                                        <div className={`w-16 h-1 mx-2 ${
                                            index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <FaExclamationCircle className="text-red-500 ml-2" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات پایه</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaFileAlt className="inline ml-2" />
                                        عنوان آزمون *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.title ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="عنوان آزمون را وارد کنید"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaClock className="inline ml-2" />
                                        زمان آزمون (دقیقه) *
                                    </label>
                                    <input
                                        type="number"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.time ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="زمان آزمون به دقیقه"
                                        min="1"
                                        max="300"
                                    />
                                    {errors.time && (
                                        <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaDollarSign className="inline ml-2" />
                                        قیمت (تومان) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.price ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="قیمت آزمون"
                                        min="0"
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Step 2: Categories and Target Audience */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">دسته‌بندی و گروه هدف</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaTag className="inline ml-2" />
                                        دسته‌بندی *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.category ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">انتخاب دسته‌بندی</option>
                                        {categoryOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaUsers className="inline ml-2" />
                                        گروه هدف *
                                    </label>
                                    <select
                                        name="target_audience"
                                        value={formData.target_audience}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.target_audience ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">انتخاب گروه هدف</option>
                                        {targetAudienceOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.target_audience && (
                                        <p className="text-red-500 text-sm mt-1">{errors.target_audience}</p>
                                    )}
                                </div>
                            </div>

                            {/* Age Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        حداقل سن (اختیاری)
                                    </label>
                                    <input
                                        type="number"
                                        name="minAge"
                                        value={formData.minAge}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.minAge ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="مثلاً 7"
                                        min="0"
                                        max="120"
                                    />
                                    {errors.minAge && (
                                        <p className="text-red-500 text-sm mt-1">{errors.minAge}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        حداکثر سن (اختیاری)
                                    </label>
                                    <input
                                        type="number"
                                        name="maxAge"
                                        value={formData.maxAge}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.maxAge ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="مثلاً 18"
                                        min="0"
                                        max="120"
                                    />
                                    {errors.maxAge && (
                                        <p className="text-red-500 text-sm mt-1">{errors.maxAge}</p>
                                    )}
                                </div>
                            </div>

                    {/* حذف تعریف مولفه‌ها از این مرحله */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    مناسب برای (چند انتخابی)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {suitableForOptions.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="suitableFor"
                                                value={option}
                                                checked={formData.suitableFor.includes(option)}
                                                onChange={handleInputChange}
                                                className="ml-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaImage className="inline ml-2" />
                                    عکس کاور آزمون
                                </label>
                                <FileUpload
                                    onFileSelect={(fileInfo) => handleFileUpload('coverImage', fileInfo)}
                                    onFileRemove={() => handleFileRemove('coverImage')}
                                    currentFile={uploadedFiles.coverImage}
                                    type="image"
                                    maxSize={5 * 1024 * 1024} // 5MB
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Descriptions */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">توضیحات</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    توضیحات کوتاه *
                                </label>
                                <textarea
                                    name="ShortDescription"
                                    value={formData.ShortDescription}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.ShortDescription ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="توضیحات کوتاه آزمون (حداقل 10 کاراکتر)"
                                />
                                {errors.ShortDescription && (
                                    <p className="text-red-500 text-sm mt-1">{errors.ShortDescription}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    توضیحات کامل *
                                </label>
                                <textarea
                                    name="mainDescription"
                                    value={formData.mainDescription}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.mainDescription ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="توضیحات کامل آزمون (حداقل 20 کاراکتر)"
                                />
                                {errors.mainDescription && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mainDescription}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaVideo className="inline ml-2" />
                                    ویدیو توضیحی (اختیاری)
                                </label>
                                <FileUpload
                                    onFileSelect={(fileInfo) => handleFileUpload('descriptionVideo', fileInfo)}
                                    onFileRemove={() => handleFileRemove('descriptionVideo')}
                                    currentFile={uploadedFiles.descriptionVideo}
                                    type="video"
                                    maxSize={100 * 1024 * 1024} // 100MB
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    ویدیو توضیحی برای آزمون (حداکثر 100 مگابایت)
                                </p>
                            </div>
                </div>
            )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    مرحله قبل
                                </button>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                انصراف
                            </button>
                            
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    مرحله بعد
                                    <FaCheckCircle />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            در حال ذخیره...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            {test ? 'به‌روزرسانی' : 'ایجاد آزمون'}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}