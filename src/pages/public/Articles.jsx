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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            مقالات
          </h1>
          <p className="text-gray-600 text-lg">مجموعه‌ای از بهترین مقالات آموزشی و روانشناسی</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  value={filters.searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">همه دسته‌ها</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-64">
              <div className="flex gap-2">
                <select
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleSortChange(sortBy, sortOrder);
                  }}
                >
                  <option value="createdAt-desc">جدیدترین</option>
                  <option value="createdAt-asc">قدیمی‌ترین</option>
                  <option value="title-asc">عنوان (الف-ی)</option>
                  <option value="title-desc">عنوان (ی-الف)</option>
                  <option value="views-desc">بیشترین بازدید</option>
                  <option value="views-asc">کمترین بازدید</option>
                  <option value="readingTime-asc">کمترین زمان مطالعه</option>
                  <option value="readingTime-desc">بیشترین زمان مطالعه</option>
                </select>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'cards' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-white hover:shadow-md'
                }`}
              >
                <FaThLarge className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-white hover:shadow-md'
                }`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <ArticlesList 
          articles={articles} 
          loading={loading}
          viewMode={viewMode}
        />

        {/* Pagination */}
        {renderPagination()}

        {/* Results Info */}
        <div className="text-center mt-6 text-gray-600">
          نمایش {articles.length} مقاله از {pagination.totalItems} مقاله
        </div>
      </div>
    </div>
  );
}
