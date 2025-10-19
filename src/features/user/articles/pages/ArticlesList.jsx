import ArticleCard from "../components/ArticleCard";
import { FaFileAlt, FaEye, FaClock, FaTag, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArticlesList({ articles, loading, viewMode = 'cards' }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaFileAlt className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">مقاله‌ای یافت نشد</h3>
                <p className="text-gray-600 text-lg">در حال حاضر هیچ مقاله‌ای برای نمایش وجود ندارد.</p>
            </div>
        );
    }

    if (viewMode === 'cards') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        );
    }

    // Table view
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {articles.map((article) => (
                <div key={article.id} className="group border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 last:border-b-0">
                    <div className="px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-4">
                                    {article.image && (
                                        <div className="relative overflow-hidden rounded-xl">
                                            <img 
                                                src={article.image} 
                                                alt={article.title}
                                                className="w-16 h-16 object-cover"
                                            />
                                            <div className="absolute top-1 right-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    article.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {article.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <Link to={`/articles/${article.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                                                <FaTag className="w-3 h-3 text-blue-600" />
                                                <span className="text-blue-700 text-sm font-medium">{article.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                                <FaClock className="w-3 h-3 text-green-600" />
                                                <span className="text-green-700 text-sm font-medium">{article.readingTime} دقیقه</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full">
                                                <FaEye className="w-3 h-3 text-purple-600" />
                                                <span className="text-purple-700 text-sm font-medium">{article.views || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                                                <FaCalendarAlt className="w-3 h-3 text-gray-600" />
                                                <span className="text-gray-700 text-sm font-medium">{new Date(article.date).toLocaleDateString('fa-IR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Link 
                                    to={`/articles/${article.id}`}
                                    className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                >
                                    <FaEye />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
