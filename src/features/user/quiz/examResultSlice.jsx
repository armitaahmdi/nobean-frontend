import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";

const initialState = {
    byTestId: {},
    loading: false,
    error: null,
    submitLoading: false,
    submitError: null
};

export const submitExam = createAsyncThunk(
    "examResult/submitExam",
    async ({ testId, examData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            if (!token) throw new Error('برای ارسال آزمون باید وارد شوید');
            
            const response = await testsApi.submitExam(testId, examData, token);
            return { testId, result: response.result };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getExamResult = createAsyncThunk(
    "examResult/getExamResult",
    async (testId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            if (!token) throw new Error('برای دریافت نتیجه آزمون باید وارد شوید');
            
            const response = await testsApi.getExamResult(testId, token);
            return { testId, result: response.result, user: response.user }; // اطلاعات کاربر
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const examResultSlice = createSlice({
    name: "examResult",
    initialState,
    reducers: {
        clearExamResult: (state, action) => {
            if (action.payload) delete state.byTestId[action.payload];
            else state.byTestId = {};
        },
        clearSubmitError: (state) => { state.submitError = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitExam.pending, (state) => { state.submitLoading = true; state.submitError = null; })
            .addCase(submitExam.fulfilled, (state, action) => {
                state.submitLoading = false;
                const { testId, result } = action.payload;
                state.byTestId[testId] = { ...result, completed: true };
            })
            .addCase(submitExam.rejected, (state, action) => { state.submitLoading = false; state.submitError = action.payload; })
            
            .addCase(getExamResult.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getExamResult.fulfilled, (state, action) => {
                state.loading = false;
                const { testId, result, user } = action.payload;
                state.byTestId[testId] = { ...result, user, completed: true }; // اطلاعات کاربر اضافه شد
            })
            .addCase(getExamResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload?.includes('404') || action.payload?.includes('یافت نشد')) state.error = null;
            });
    }
});

export const { clearExamResult, clearSubmitError } = examResultSlice.actions;
export default examResultSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { testsApi } from "../../../services/testsApi";

// const initialState = {
//     byTestId: {},
//     loading: false,
//     error: null,
//     submitLoading: false,
//     submitError: null
// };

// export const submitExam = createAsyncThunk(
//     "examResult/submitExam",
//     async ({ testId, examData }, { rejectWithValue, getState }) => {
//         try {
//             const token = getState().auth?.token;
            
//             if (!token) {
//                 throw new Error('برای ارسال آزمون باید وارد شوید');
//             }
            
//             const response = await testsApi.submitExam(testId, examData, token);
//             return { testId, result: response.result };
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const getExamResult = createAsyncThunk(
//     "examResult/getExamResult",
//     async (testId, { rejectWithValue, getState }) => {
//         try {
//             const token = getState().auth?.token;
            
//             if (!token) {
//                 throw new Error('برای دریافت نتیجه آزمون باید وارد شوید');
//             }
            
//             const response = await testsApi.getExamResult(testId, token);
//             return { testId, result: response.result };
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const examResultSlice = createSlice({
//     name: "examResult",
//     initialState,
//     reducers: {
//         clearExamResult: (state, action) => {
//             if (action.payload) {
//                 delete state.byTestId[action.payload];
//             } else {
//                 state.byTestId = {};
//             }
//         },
//         clearSubmitError: (state) => {
//             state.submitError = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             // Submit Exam
//             .addCase(submitExam.pending, (state) => {
//                 state.submitLoading = true;
//                 state.submitError = null;
//             })
//             .addCase(submitExam.fulfilled, (state, action) => {
//                 state.submitLoading = false;
//                 const { testId, result } = action.payload;
//                 state.byTestId[testId] = {
//                     ...result,
//                     completed: true
//                 };
//             })
//             .addCase(submitExam.rejected, (state, action) => {
//                 state.submitLoading = false;
//                 state.submitError = action.payload;
//             })
            
//             // Get Exam Result
//             .addCase(getExamResult.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getExamResult.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const { testId, result } = action.payload;
//                 state.byTestId[testId] = {
//                     ...result,
//                     completed: true
//                 };
//             })
//             .addCase(getExamResult.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//                 // اگر خطا 404 باشد (نتیجه آزمون یافت نشد)، آن را به عنوان خطا در نظر نگیر
//                 if (action.payload?.includes('404') || action.payload?.includes('یافت نشد')) {
//                     state.error = null;
//                 }
//             });
//     }
// });

// export const { clearExamResult, clearSubmitError } = examResultSlice.actions;
// export default examResultSlice.reducer;
