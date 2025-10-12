import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import translate from "../../locale/translate";
import { fetchArticles } from "../../features/user/articles/articlesSlice";
import { articlesFilterConfig } from "../../components/filter/filterConfig";
import ArticlesList from "../../features/user/articles/pages/ArticlesList";
import FilterablePaginatedList from "../../components/filter/FilterablePaginatedList";

export default function Articles() {
  const dispatch = useDispatch()
  const { articles, loading, error } = useSelector((store) => store.articles)
  const listRef = useRef(null);

  return (
    <>
      <div ref={listRef}>
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
          scrollToTop={false}
          scrollToElement={listRef.current}
        />
      </div>
    </>
  )
}
