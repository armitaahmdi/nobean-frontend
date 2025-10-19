import { getExcerpt } from "../../../../helper/helperFunction";
import translate from "../../../../locale/translate";
import { FaClock, FaEye, FaTag, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
    return (
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {article.image && (
                <div className="relative overflow-hidden">
                    <Link to={`/articles/${article.id}`}>
                        <img 
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                            src={article.image} 
                            alt={article.title} 
                        />
                    </Link>
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                        }`}>
                            {article.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                        </span>
                    </div>
                </div>
            )}
            
            <div className="p-6">
                <div className="mb-4">
                    <Link to={`/articles/${article.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                            {article.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {article.excerpt || getExcerpt(article.description)}
                    </p>
                </div>
                
                <div className="flex items-center gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                        <FaTag className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-700 font-medium">{article.category}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                        <FaClock className="w-3 h-3 text-green-600" />
                        <span className="text-green-700 font-medium">{article.readingTime} دقیقه</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full">
                        <FaEye className="w-3 h-3 text-purple-600" />
                        <span className="text-purple-700 font-medium">{article.views || 0}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                        {new Date(article.date).toLocaleDateString('fa-IR')}
                    </div>
                </div>
            </div>
        </div>
    );
}
