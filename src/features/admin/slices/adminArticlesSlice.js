import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

const initialState = {
    articles: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
    stats: {
        total: 0,
        published: 0,
        draft: 0,
        totalViews: 0
    }
};

// Fetch all articles
export const fetchAdminArticles = createAsyncThunk(
    "adminArticles/fetchAdminArticles",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/articles/admin/articles");
            return response; // already parsed JSON: { articles, total, ... }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "خطا در بارگذاری مقالات");
        }
    }
);

// Create new article
export const createAdminArticle = createAsyncThunk(
    "adminArticles/createAdminArticle",
    async (articleData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/articles/admin/articles", articleData);
            // backend shape: { message, article }
            return response?.article || response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "خطا در ایجاد مقاله");
        }
    }
);

// Update article
export const updateAdminArticle = createAsyncThunk(
    "adminArticles/updateAdminArticle",
    async ({ id, articleData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/articles/admin/articles/${id}`, articleData);
            // backend shape: { message, article }
            return response?.article || response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "خطا در ویرایش مقاله");
        }
    }
);

// Delete article
export const deleteAdminArticle = createAsyncThunk(
    "adminArticles/deleteAdminArticle",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/articles/admin/articles/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "خطا در حذف مقاله");
        }
    }
);

// Get article by ID
export const fetchAdminArticleById = createAsyncThunk(
    "adminArticles/fetchAdminArticleById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/articles/admin/articles/${id}`);
            return response; // article object
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "خطا در بارگذاری مقاله");
        }
    }
);

const adminArticlesSlice = createSlice({
    name: "adminArticles",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.createError = null;
            state.updateError = null;
            state.deleteError = null;
        },
        clearCreateError: (state) => {
            state.createError = null;
        },
        clearUpdateError: (state) => {
            state.updateError = null;
        },
        clearDeleteError: (state) => {
            state.deleteError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch articles
            .addCase(fetchAdminArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminArticles.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.articles = action.payload.articles || action.payload;
                    state.stats = action.payload.stats || state.stats;
                }
            })
            .addCase(fetchAdminArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create article
            .addCase(createAdminArticle.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createAdminArticle.fulfilled, (state, action) => {
                state.createLoading = false;
                if (action.payload) {
                    state.articles.unshift(action.payload);
                    state.stats.total += 1;
                }
            })
            .addCase(createAdminArticle.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload;
            })
            
            // Update article
            .addCase(updateAdminArticle.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateAdminArticle.fulfilled, (state, action) => {
                state.updateLoading = false;
                if (action.payload) {
                    const index = state.articles.findIndex(article => article.id === action.payload.id);
                    if (index !== -1) {
                        state.articles[index] = action.payload;
                    }
                }
            })
            .addCase(updateAdminArticle.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            })
            
            // Delete article
            .addCase(deleteAdminArticle.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteAdminArticle.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.articles = state.articles.filter(article => article.id !== action.payload);
                state.stats.total -= 1;
            })
            .addCase(deleteAdminArticle.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload;
            })
            
            // Fetch article by ID
            .addCase(fetchAdminArticleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminArticleById.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const index = state.articles.findIndex(article => article.id === action.payload.id);
                    if (index !== -1) {
                        state.articles[index] = action.payload;
                    } else {
                        state.articles.push(action.payload);
                    }
                }
            })
            .addCase(fetchAdminArticleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, clearCreateError, clearUpdateError, clearDeleteError } = adminArticlesSlice.actions;
export default adminArticlesSlice.reducer;
