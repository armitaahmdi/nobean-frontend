import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";
import ArticlesDetailsTemp from "../../features/user/articles/pages/ArticlesDetailsTemp";
import ArticleInfo from "../../features/user/articles/components/ArticleInfo";
import { fetchArticles } from "../../features/user/articles/articlesSlice";
import RelatedArticlesColumn from "../../features/user/articles/components/RelatedArticlesColumn";
import ShareButton from "../../components/shared/Button";

export default function ArticleDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state) => state.articles);
    const currentUrl = window.location.href;

    useEffect(() => {
        if (articles.length === 0) {
            dispatch(fetchArticles());
        }
    }, [articles.length, dispatch]);

    const handleShareClick = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success("لینک کپی شد!");
            })
            .catch(() => {
                toast.error("کپی لینک انجام نشد");
            });
    };

    if (loading) return <div>در حال بارگذاری...</div>;
    if (error) return <div>خطا در بارگذاری داده: {error}</div>;

    const article = articles.find((c) => c.id === Number(id));
    if (!article) return <div>مقاله پیدا نشد.</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800" dir="rtl">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* محتوای اصلی */}
                <article className="flex-grow lg:max-w-3xl">
                    <h1 className="text-4xl font-extrabold mb-4">{article.title}</h1>
                    <ArticleInfo
                        author={article.author}
                        date={article.date}
                        category={article.category}
                        readingTime={article.readingTime}
                        tags={article.tags}
                    />
                    <ArticlesDetailsTemp sections={article.contentSections} articleFAQ={article.faqs} articleReviews={article.reviews} />
                    <div className="lg:hidden flex items-center mt-6 flex-col gap-3">
                        <h3 className="font-bold text-center">اشتراک گذاری</h3>
                        <div className="flex gap-4">
                            <button
                                onClick={handleShareClick}
                                className="
                            flex items-center gap-2 px-6 py-3
                            rounded-lg
                            bg-blue-600 text-white
                            font-semibold
                            shadow-md
                            hover:bg-blue-700
                            active:bg-blue-800
                            transition
                            duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-300
                            select-none
                        "
                            >
                                <IoCopyOutline className="w-6 h-6" />
                                <span>کپی لینک</span>
                            </button>
                            <ShareButton />
                        </div>
                    </div>
                </article>

                {/* مقالات مرتبط */}
                <aside className="">
                    <RelatedArticlesColumn articles={articles} currentArticleId={article.id} />
                </aside>
            </div>
        </div>

    );
}
