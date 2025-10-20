import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticleCategories, setFilters, clearError } from "../../features/user/articles/articlesSlice";
import ArticlesList from "../../features/user/articles/pages/ArticlesList";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { FaSearch, FaFilter, FaSort, FaThLarge, FaList } from "react-icons/fa";

export default function Articles() {
  const dispatch = useDispatch();
  const { 
    articles, 
    loading, 
    error, 
    pagination, 
    filters, 
    categories 
  } = useSelector((store) => store.articles);
  
  const [viewMode, setViewMode] = useState('cards');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchArticles(filters));
    dispatch(fetchArticleCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles(filters));
  }, [dispatch, filters]);

  const handleSearch = (searchTerm) => {
    dispatch(setFilters({ searchTerm }));
  };

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handleSortChange = (sortBy, sortOrder) => {
    dispatch(setFilters({ sortBy, sortOrder }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchArticles({ ...filters, page }));
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            pagination.currentPage === i
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          قبلی
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          بعدی
        </button>
      </div>
    );
  };

  if (loading && articles.length === 0) return <LoadingState />;
  if (error && articles.length === 0) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen pb-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - simple & clean */}
        <header className="mt-10 mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">مقالات</h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">دنیای یادگیری و رشد فردی</p>
          <div className="mt-5 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </header>

        {/* Filters removed temporarily */}

        {/* Articles List */}
        <ArticlesList 
          articles={articles} 
          loading={loading}
          viewMode={viewMode}
        />

        {/* Pagination */}
        {renderPagination()}

        {/* Results Info */}
        {/* <div className="text-center mt-8 text-gray-600 text-sm">
          نمایش {articles.length} مقاله از {pagination.totalItems} مقاله
        </div> */}
      </div>
    </div>
  );
}
