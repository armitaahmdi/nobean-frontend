import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { articlesApi } from "../../../services/articlesApi";

const initialState = {
    articles: [],
    currentArticle: null,
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10,
    },
    filters: {
        searchTerm: '',
        category: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    },
    categories: [],
    popularArticles: [],
    recentArticles: []
};

// Async Thunks
export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getArticles(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchArticleById = createAsyncThunk(
    "articles/fetchArticleById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getArticleById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchArticleCategories = createAsyncThunk(
    "articles/fetchArticleCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getArticleCategories();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPopularArticles = createAsyncThunk(
    "articles/fetchPopularArticles",
    async (limit = 5, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getPopularArticles(limit);
            return response.articles || [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRecentArticles = createAsyncThunk(
    "articles/fetchRecentArticles",
    async (limit = 5, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getRecentArticles(limit);
            return response.articles || [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchArticles = createAsyncThunk(
    "articles/searchArticles",
    async ({ searchTerm, ...params }, { rejectWithValue }) => {
        try {
            const response = await articlesApi.searchArticles(searchTerm, params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentArticle: (state) => {
            state.currentArticle = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                searchTerm: '',
                category: '',
                sortBy: 'createdAt',
                sortOrder: 'desc'
            };
        },
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Articles
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.articles || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Article By Id
            .addCase(fetchArticleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentArticle = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Categories
            .addCase(fetchArticleCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticleCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchArticleCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Popular Articles
            .addCase(fetchPopularArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.popularArticles = action.payload;
            })
            .addCase(fetchPopularArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Recent Articles
            .addCase(fetchRecentArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecentArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.recentArticles = action.payload;
            })
            .addCase(fetchRecentArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Search Articles
            .addCase(searchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.articles || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(searchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { 
    clearError, 
    clearCurrentArticle, 
    setFilters, 
    clearFilters, 
    setPage 
} = articlesSlice.actions;

export default articlesSlice.reducer;
