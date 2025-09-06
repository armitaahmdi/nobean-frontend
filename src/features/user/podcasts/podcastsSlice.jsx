import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { podcastData } from "../../../constants/podcastsData";

const initialState = {
    loading: false,
    podcasts: [],
    error: ""
}

const fetchPodcasts = createAsyncThunk("podcasts/fetchPodcasts", async () => {
    return podcastData;
});

const podcastsSlice = createSlice({
    name: "podcasts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPodcasts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPodcasts.fulfilled, (state, action) => {
                state.loading = false
                state.podcasts = action.payload;
            })
            .addCase(fetchPodcasts.rejected, (state, action) => {
                state.loading = false,
                    state.podcasts = [],
                    state.error = action.error.message;
            });
    },
});

export default podcastsSlice.reducer;
export { fetchPodcasts }