import React from 'react';
import MediaDisplay from './MediaDisplay';
import ArticleImage from './ArticleImage';
import { FaCalendarAlt, FaClock, FaUser, FaTag } from 'react-icons/fa';

const ArticleDisplay = ({ article }) => {
    const renderContentSection = (section, index) => {
        switch (section.type) {
            case 'heading':
                const HeadingTag = `h${section.level || 2}`;
                return (
                    <HeadingTag key={index} className="font-bold text-gray-900 mt-6 mb-3">
                        {section.text}
                    </HeadingTag>
                );
            
            case 'text':
                return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {section.text}
                    </p>
                );
            
            case 'image':
                return (
                    <div key={index} className="my-6">
                        <MediaDisplay
                            url={section.src}
                            type="image"
                            alt={section.alt || 'تصویر مقاله'}
                            caption={section.caption}
                            className="max-w-full"
                        />
                    </div>
                );
            
            case 'video':
                return (
                    <div key={index} className="my-6">
                        <MediaDisplay
                            url={section.src}
                            type="video"
                            caption={section.caption}
                            className="max-w-full"
                        />
                    </div>
                );
            
            case 'list':
                const ListTag = section.ordered ? 'ol' : 'ul';
                return (
                    <ListTag key={index} className="mb-4 space-y-2">
                        {section.items?.map((item, i) => (
                            <li key={i} className="text-gray-700">
                                {item}
                            </li>
                        ))}
                    </ListTag>
                );
            
            case 'blockquote':
                return (
                    <blockquote key={index} className="border-r-4 border-blue-500 pr-4 italic my-6 bg-gray-50 p-4 rounded">
                        <p className="text-gray-700 mb-2">"{section.text}"</p>
                        {section.author && (
                            <footer className="text-sm text-gray-600">
                                — {section.author}
                            </footer>
                        )}
                    </blockquote>
                );
            
            default:
                return null;
        }
    };

    if (!article) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">مقاله یافت نشد</p>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* تصویر شاخص */}
            <ArticleImage
                src={article.image}
                alt={article.title}
                className="w-full h-64"
                fallbackText="بدون تصویر شاخص"
            />
            
            {/* محتوای مقاله */}
            <div className="p-8">
                {/* عنوان و اطلاعات */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <FaUser />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>{new Date(article.date).toLocaleDateString('fa-IR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock />
                            <span>{article.readingTime} دقیقه مطالعه</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag />
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {article.category}
                            </span>
                        </div>
                    </div>
                    
                    {/* خلاصه */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {article.excerpt}
                    </p>
                </header>
                
                {/* محتوای اصلی */}
                <div className="prose prose-lg max-w-none">
                    {article.contentSections?.map((section, index) => 
                        renderContentSection(section, index)
                    )}
                </div>
                
                {/* برچسب‌ها */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">برچسب‌ها:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default ArticleDisplay;
