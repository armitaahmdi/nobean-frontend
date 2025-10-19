import { apiRequest } from './api';

const ARTICLES_API = {
  BASE_URL: '/api/v1/articles',
};

// Get all articles with pagination and filters
export const getArticles = async (params = {}) => {
  const {
    page = 1,
    limit = 10,
    searchTerm = '',
    category = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
    sortBy,
    sortOrder
  });

  const url = `${ARTICLES_API.BASE_URL}?${queryParams}`;
  return await apiRequest(url);
};

// Get single article by ID
export const getArticleById = async (id) => {
  const url = `${ARTICLES_API.BASE_URL}/${id}`;
  return await apiRequest(url);
};

// Get article categories
export const getArticleCategories = async () => {
  // This would typically come from a separate endpoint
  // For now, return static categories
  return Promise.resolve([
    'روانشناسی',
    'تربیت', 
    'مهارت',
    'هوش',
    'تحصیل'
  ]);
};

// Get popular articles
export const getPopularArticles = async (limit = 5) => {
  const params = {
    sortBy: 'views',
    sortOrder: 'desc',
    limit
  };
  return await getArticles(params);
};

// Get recent articles
export const getRecentArticles = async (limit = 5) => {
  const params = {
    sortBy: 'createdAt',
    sortOrder: 'desc',
    limit
  };
  return await getArticles(params);
};

// Search articles
export const searchArticles = async (searchTerm, params = {}) => {
  return await getArticles({
    ...params,
    searchTerm
  });
};

export default {
  getArticles,
  getArticleById,
  getArticleCategories,
  getPopularArticles,
  getRecentArticles,
  searchArticles
};
