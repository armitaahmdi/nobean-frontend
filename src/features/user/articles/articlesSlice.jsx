import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { articleData } from "../../../constants/articleData"; 

const initialState = {
    loading: false,
    articles: [],
    error: ""
}

const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
    return articleData;
});

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false,
                    state.articles = [],
                    state.error = action.error.message;
            });
    },
});

export default articlesSlice.reducer;
export { fetchArticles }