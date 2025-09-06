import { useNavigate } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ShareButton from "../../../../components/shared/ShareButton";
import articleImage from "../../../../assets/images/icons/newspaper.png"

function getRandomItems(arr, count, excludeId) {
    const filtered = arr.filter(item => item.id !== excludeId);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default function RelatedArticlesColumn({ articles, currentArticleId }) {
    const navigate = useNavigate();
    const related = getRandomItems(articles, 3, currentArticleId);

    if (related.length === 0) return null;

    const currentUrl = window.location.href;

    const handleShareClick = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success("لینک کپی شد!");
            })
            .catch(() => {
                toast.error("کپی لینک انجام نشد");
            });
    };

    return (
        <aside className="mt-12 space-y-8 max-w-md mx-auto lg:max-w-full lg:mx-0" dir="rtl">
            <h3 className="flex items-center gap-2 text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
                <img src={articleImage} alt="مقالات مرتبط" className="w-7 h-7" />
                مقالات مرتبط
            </h3>
            <ul className="space-y-8">
                {related.map((article) => (
                    <li
                        key={article.id}
                        className="bg-white rounded-[20px] shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        onClick={() => navigate(`/articles/${article.id}`)}
                    >
                        {/* تصویر */}
                        <div className="p-3 pb-0">
                            <img
                                src={article.thumbnail || article.image || "https://via.placeholder.com/400x200?text=No+Image"}
                                alt={article.title}
                                className="w-full rounded-[20px] h-48 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">{article.title}</h4>
                            <div className="flex items-center justify-between gap-1">
                                <div className="flex gap-1">
                                    <span className="text-sm py-2 text-darkBlue">تاریخ انتشار :</span>
                                    <span className="text-sm py-2 text-darkBlue">{article.date}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="text-sm py-2 text-darkBlue">مدت مطالعه:</span>
                                    <span className="text-sm py-2 text-darkBlue">{article.readingTime} دقیقه</span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/articles/${article.id}`);
                                }}
                                className="self-center mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                مطالعه
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="hidden lg:flex flex-col gap-3">
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
        </aside>
    );
}
