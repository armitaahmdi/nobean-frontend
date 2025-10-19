import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAdminArticle, updateAdminArticle, clearCreateError, clearUpdateError } from '../slices/adminArticlesSlice';
import { 
    FaTimes, 
    FaSave, 
    FaPlus,
    FaEye,
    FaFileAlt,
    FaImage,
    FaList,
    FaQuoteLeft,
    FaVideo,
    FaHeading
} from 'react-icons/fa';
import {
    HeadingSection,
    TextSection,
    ImageSection,
    ListSection,
    BlockquoteSection,
    VideoSection
} from './ArticleContentSections';

const CONTENT_TYPES = [
    { type: 'heading', label: 'تیتر', icon: FaHeading, color: 'blue' },
    { type: 'text', label: 'متن', icon: FaFileAlt, color: 'green' },
    { type: 'image', label: 'تصویر', icon: FaImage, color: 'purple' },
    { type: 'list', label: 'لیست', icon: FaList, color: 'orange' },
    { type: 'blockquote', label: 'نقل‌قول', icon: FaQuoteLeft, color: 'yellow' },
    { type: 'video', label: 'ویدیو', icon: FaVideo, color: 'red' }
];

export default function AdminArticleForm({ article, onClose, onSave }) {
    const dispatch = useDispatch();
    const { createLoading, createError, updateLoading, updateError } = useSelector((state) => state.adminArticles);
    
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        description: '',
        author: 'نوین کد',
        date: new Date().toISOString().split('T')[0],
        image: '',
        readingTime: 5,
        category: 'روانشناسی',
        tags: [],
        contentSections: [],
        faqs: [],
        reviews: []
    });

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (article) {
            setFormData({
                ...article,
                contentSections: article.contentSections || []
            });
        }
    }, [article]);

    useEffect(() => {
        if (createError) {
            toast.error(createError);
            dispatch(clearCreateError());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearUpdateError());
        }
    }, [createError, updateError, dispatch]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'عنوان مقاله الزامی است';
        }
        
        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'خلاصه مقاله الزامی است';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'توضیحات مقاله الزامی است';
        }
        
        if (!formData.category.trim()) {
            newErrors.category = 'دسته‌بندی الزامی است';
        }
        
        if (formData.contentSections.length === 0) {
            newErrors.contentSections = 'حداقل یک بخش محتوا الزامی است';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('لطفاً خطاهای فرم را برطرف کنید');
            return;
        }

        try {
            if (article) {
                await dispatch(updateAdminArticle({ id: article.id, articleData: formData })).unwrap();
                toast.success('مقاله با موفقیت ویرایش شد');
            } else {
                await dispatch(createAdminArticle(formData)).unwrap();
                toast.success('مقاله با موفقیت ایجاد شد');
            }
            onSave();
        } catch (error) {
            toast.error(error || 'خطا در ذخیره مقاله');
        }
    };

    const addContentSection = (type) => {
        const newSection = {
            type,
            ...(type === 'heading' && { level: 2, text: '' }),
            ...(type === 'text' && { text: '' }),
            ...(type === 'image' && { src: '', alt: '', caption: '' }),
            ...(type === 'list' && { ordered: false, items: [''] }),
            ...(type === 'blockquote' && { text: '', author: '' }),
            ...(type === 'video' && { src: '', caption: '' })
        };

        setFormData(prev => ({
            ...prev,
            contentSections: [...prev.contentSections, newSection]
        }));
    };

    const updateContentSection = (index, updatedSection) => {
        setFormData(prev => ({
            ...prev,
            contentSections: prev.contentSections.map((section, i) => 
                i === index ? updatedSection : section
            )
        }));
    };

    const deleteContentSection = (index) => {
        setFormData(prev => ({
            ...prev,
            contentSections: prev.contentSections.filter((_, i) => i !== index)
        }));
    };

    const moveContentSection = (index, direction) => {
        const newSections = [...formData.contentSections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (targetIndex >= 0 && targetIndex < newSections.length) {
            [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
            setFormData(prev => ({
                ...prev,
                contentSections: newSections
            }));
        }
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const renderContentSection = (section, index) => {
        const canMoveUp = index > 0;
        const canMoveDown = index < formData.contentSections.length - 1;

        const commonProps = {
            section,
            onUpdate: (updatedSection) => updateContentSection(index, updatedSection),
            onDelete: () => deleteContentSection(index),
            onMoveUp: () => moveContentSection(index, 'up'),
            onMoveDown: () => moveContentSection(index, 'down'),
            canMoveUp,
            canMoveDown
        };

        switch (section.type) {
            case 'heading':
                return <HeadingSection key={index} {...commonProps} />;
            case 'text':
                return <TextSection key={index} {...commonProps} />;
            case 'image':
                return <ImageSection key={index} {...commonProps} />;
            case 'list':
                return <ListSection key={index} {...commonProps} />;
            case 'blockquote':
                return <BlockquoteSection key={index} {...commonProps} />;
            case 'video':
                return <VideoSection key={index} {...commonProps} />;
            default:
                return null;
        }
    };

    const renderPreview = () => {
        return (
            <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">پیش‌نمایش مقاله</h2>
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{formData.title}</h1>
                    <p className="text-gray-600">{formData.excerpt}</p>
                    <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{formData.category}</span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{formData.readingTime} دقیقه</span>
                    </div>
                    <div className="border-t pt-4">
                        {formData.contentSections.map((section, index) => {
                            switch (section.type) {
                                case 'heading':
                                    const HeadingTag = `h${section.level || 2}`;
                                    return <HeadingTag key={index} className="font-bold mt-4 mb-2">{section.text}</HeadingTag>;
                                case 'text':
                                    return <p key={index} className="mb-4">{section.text}</p>;
                                case 'image':
                                    return section.src ? (
                                        <div key={index} className="my-4">
                                            <img src={section.src} alt={section.alt} className="max-w-full rounded" />
                                            {section.caption && <p className="text-sm text-gray-600 mt-2">{section.caption}</p>}
                                        </div>
                                    ) : null;
                                case 'list':
                                    const ListTag = section.ordered ? 'ol' : 'ul';
                                    return (
                                        <ListTag key={index} className="mb-4">
                                            {section.items?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ListTag>
                                    );
                                case 'blockquote':
                                    return (
                                        <blockquote key={index} className="border-r-4 border-gray-300 pr-4 italic my-4">
                                            "{section.text}"
                                            {section.author && <div className="text-sm text-gray-600 mt-2">— {section.author}</div>}
                                        </blockquote>
                                    );
                                case 'video':
                                    return section.src ? (
                                        <div key={index} className="my-4">
                                            <video src={section.src} controls className="max-w-full rounded" />
                                            {section.caption && <p className="text-sm text-gray-600 mt-2">{section.caption}</p>}
                                        </div>
                                    ) : null;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen" dir="rtl">
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold">{article ? 'ویرایش مقاله' : 'ایجاد مقاله جدید'}</h2>
                                <p className="text-blue-100 mt-2">مدیریت محتوای مقاله</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                                >
                                    <FaEye />
                                    {showPreview ? 'مخفی کردن پیش‌نمایش' : 'پیش‌نمایش'}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex min-h-[600px]">
                        {/* Main Form */}
                        <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-y-auto p-8`}>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Info */}
                                <div className="bg-white/50 rounded-xl p-6 border border-white/20">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">اطلاعات پایه</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                عنوان مقاله *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                                                placeholder="عنوان مقاله را وارد کنید..."
                                            />
                                            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                دسته‌بندی *
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 ${errors.category ? 'border-red-500' : 'border-gray-200'}`}
                                            >
                                                <option value="روانشناسی">روانشناسی</option>
                                                <option value="تربیت">تربیت</option>
                                                <option value="مهارت">مهارت</option>
                                                <option value="هوش">هوش</option>
                                                <option value="تحصیل">تحصیل</option>
                                            </select>
                                            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        خلاصه مقاله *
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        rows={3}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.excerpt ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="خلاصه کوتاه از مقاله..."
                                    />
                                    {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        توضیحات کامل *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="توضیحات کامل مقاله..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            نویسنده
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            تاریخ انتشار
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            زمان مطالعه (دقیقه)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.readingTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, readingTime: parseInt(e.target.value) || 1 }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        تصویر شاخص
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="آدرس تصویر شاخص..."
                                    />
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        برچسب‌ها
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="برچسب جدید..."
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            افزودن
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Sections */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            بخش‌های محتوا *
                                        </label>
                                        <div className="flex gap-2">
                                            {CONTENT_TYPES.map(({ type, label, icon: Icon, color }) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => addContentSection(type)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm bg-${color}-100 text-${color}-700 hover:bg-${color}-200`}
                                                >
                                                    <Icon size={14} />
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {errors.contentSections && (
                                        <p className="text-red-500 text-sm mb-4">{errors.contentSections}</p>
                                    )}

                                    <div className="space-y-4">
                                        {formData.contentSections.map((section, index) => renderContentSection(section, index))}
                                    </div>

                                    {formData.contentSections.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>هنوز بخشی اضافه نشده است</p>
                                            <p className="text-sm">از دکمه‌های بالا برای اضافه کردن محتوا استفاده کنید</p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-4 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        انصراف
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createLoading || updateLoading}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <FaSave />
                                        {createLoading || updateLoading ? 'در حال ذخیره...' : 'ذخیره'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Preview */}
                        {showPreview && (
                            <div className="w-1/2 border-r overflow-y-auto p-6">
                                {renderPreview()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}