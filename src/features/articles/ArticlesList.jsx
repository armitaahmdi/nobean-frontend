import ArticleCard from "./ArticleCard";

export default function ArticlesList({ articles }) {
    return (
        <div className="rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    )
}
