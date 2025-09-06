import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseData } from "../../../constants/courseDetails"; // دیتای فیک فعلی

const initialState = {
    loading: false,
    course: null,
    error: "",
};

// thunk برای گرفتن اطلاعات یک دوره بر اساس id
export const fetchCourseById = createAsyncThunk(
    "courseDetails/fetchCourseById",
    async (id) => {
        // پیدا کردن دوره از دیتاهای فیک
        const course = courseData.find((item) => item.id === Number(id));
        if (!course) throw new Error("Course not found");
        return course;
    }
);

const courseDetailsSlice = createSlice({
    name: "courseDetails",
    initialState,
    reducers: {
        clearCourseDetails: (state) => {
            state.course = null;
            state.error = "";
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.course = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.course = null;
            });
    },
});

export const { clearCourseDetails } = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;
