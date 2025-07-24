import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";
import translate from "../../../locale/translate";

export default function SuggestedArticlesSection() {
    const { articles, loading, error } = useSelector((state) => state.articles);

    if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;
    if (error) return <p className="text-center text-red-500 py-10">خطا در دریافت مقالات</p>;

    const limitedArticles = articles.slice(0, 3);

    return (
        <section>
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="flex items-center justify-center gap-3 relative text-xl font-bold text-gray-800 mb-10">
                    <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                    <span>{translate.recommendedArticles}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
                    {limitedArticles.map((article) => (
                        <Link
                            to={`/articles/${article.id}`}
                            key={article.id}
                            className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-sky-100"
                        >
                            <div className="relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {article.category && (
                                    <span className="absolute top-4 left-4 bg-[#106089] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                        {article.category}
                                    </span>
                                )}
                            </div>

                            <div className="p-5 space-y-3">
                                <div className="flex items-center text-gray-500 text-sm gap-4">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-[#106089]" />
                                        {new Date(`${article.date}T00:00:00`).toLocaleDateString("fa-IR")}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaUserAlt className="text-[#106089]" />
                                        {article.author || "ناشناس"}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#106089] transition-colors duration-300">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>

                                <div className="pt-3">
                                    <span className="inline-flex items-center gap-1 text-[#106089] text-sm font-semibold group-hover:underline transition-all duration-300 cursor-pointer">
                                        {translate.continue}
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/articles"
                        className="inline-block px-7 py-3 bg-[#106089] hover:bg-[#144e6a] text-white font-medium rounded-full transition duration-300"
                    >
                        {translate.seeAllArticles}
                    </Link>
                </div>
            </div>
        </section>
    );
}
