import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";
import ArticlesDetailsTemp from "../../features/user/articles/pages/ArticlesDetailsTemp";
import ArticleInfo from "../../features/user/articles/components/ArticleInfo";
import ArticleImage from "../../components/shared/ArticleImage";
import { fetchArticleById, fetchArticles } from "../../features/user/articles/articlesSlice";
import RelatedArticlesColumn from "../../features/user/articles/components/RelatedArticlesColumn";
import ShareButton from "../../components/shared/Button";
import { useBreadcrumb } from "../../contexts/BreadcrumbContext";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";

export default function ArticleDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentArticle, articles, loading, error } = useSelector((state) => state.articles);
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    const currentUrl = window.location.href;

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (articles.length === 0) {
            dispatch(fetchArticles({ limit: 10 }));
        }
    }, [articles.length, dispatch]);

    // Set breadcrumb title when article is loaded
    useEffect(() => {
        if (currentArticle) {
            setPageTitle(currentArticle.title);
        }
        
        // Clean up when component unmounts
        return () => {
            clearPageTitle();
        };
    }, [currentArticle, setPageTitle, clearPageTitle]);

    const handleShareClick = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success("لینک کپی شد!");
            })
            .catch(() => {
                toast.error("کپی لینک انجام نشد");
            });
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (!currentArticle) return <ErrorState message="مقاله پیدا نشد." />;

    return (
        <div className="min-h-screen py-8" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* محتوای اصلی */}
                    <article className="flex-grow lg:max-w-4xl">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                            {/* Hero Image + Title */}
                            <div className="p-0">
                                <ArticleImage
                                    src={currentArticle.image}
                                    alt={currentArticle.title}
                                    className="w-full h-40 md:h-52 lg:h-64 rounded-xl overflow-hidden bg-gray-100"
                                    fit="contain"
                                />
                                <div className="px-6 py-5">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-snug">
                                        {currentArticle.title}
                                    </h1>
                                    <ArticleInfo
                                        author={currentArticle.author}
                                        date={currentArticle.date}
                                        category={currentArticle.category}
                                        readingTime={currentArticle.readingTime}
                                        tags={currentArticle.tags}
                                    />
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-8">
                                <ArticlesDetailsTemp 
                                    sections={currentArticle.contentSections} 
                                    articleFAQ={[]} 
                                    articleReviews={[]} 
                                />
                            </div>
                            
                            {/* Share Section */}
                            <div className="lg:hidden bg-gray-50 p-6 border-t">
                                <h3 className="font-bold text-center mb-4 text-gray-800">اشتراک گذاری</h3>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={handleShareClick}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <IoCopyOutline className="w-5 h-5" />
                                        <span>کپی لینک</span>
                                    </button>
                                    <ShareButton />
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* مقالات مرتبط */}
                    <aside className="lg:w-80">
                        <RelatedArticlesColumn articles={articles} currentArticleId={currentArticle.id} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
