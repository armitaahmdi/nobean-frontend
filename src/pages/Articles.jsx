import { useDispatch, useSelector } from "react-redux";
import translate from "../locale/translate";
import { fetchArticles } from "../features/articles/articlesSlice";
import { articlesFilterConfig } from "../components/filter/filterConfig";
import ArticlesList from "../features/articles/ArticlesList";
import FilterablePaginatedList from "../components/FilterablePaginatedList";

export default function Articles() {
  const dispatch = useDispatch()
  const { articles, loading, error } = useSelector((store) => store.articles)

  return (
    <>
      <FilterablePaginatedList
        fetchAction={fetchArticles}
        items={articles}
        loading={loading}
        error={error}
        config={articlesFilterConfig}
        ListComponent={({ data, selectedFilters }) => (
          <ArticlesList
            articles={data}
            selectedSort={selectedFilters.sortOptions}
            selectedCategory={selectedFilters.categories}
          />
        )}
        seo={translate.articles}
        filtersProps={{ dispatch }}
      />
    </>
  )
}
