import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseData } from "../../constants/courseData";

const initialState = {
    loading: false,
    courses: [],
    error: ""
}

const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
    return courseData;
});

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false,
                    state.courses = [],
                    state.error = action.error.message;
            });
    },
});

export default coursesSlice.reducer;
export { fetchCourses }