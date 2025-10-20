import { getExcerpt } from "../../../../helper/helperFunction";
import { getImageUrl } from "../../../../helper/imageUtils";
import translate from "../../../../locale/translate";
import { FaClock, FaEye, FaTag, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
    return (
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {article.image && (
                <div className="relative overflow-hidden bg-gray-100">
                    <Link to={`/articles/${article.id}`}>
                        <div className="w-full h-36 md:h-40 lg:h-44 flex items-center justify-center">
                            <img 
                                className="max-w-full max-h-full object-contain" 
                                src={getImageUrl(article.image)} 
                                alt={article.title} 
                            />
                        </div>
                    </Link>
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
