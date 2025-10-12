import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";

const initialState = {
    byTestId: {},
    allAttempts: { attempts: [], pagination: {} },
    loading: false,
    error: null,
    statistics: {},
    statisticsLoading: false,
    statisticsError: null
};

export const getExamResults = createAsyncThunk(
    "adminExamResults/getExamResults",
    async ({ testId, params = {} }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            
            if (!token) {
                throw new Error('برای دریافت نتایج آزمون باید وارد شوید');
            }
            
            const response = await testsApi.getExamResults(testId, token, params);
            return { testId, data: response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getExamStatistics = createAsyncThunk(
    "adminExamResults/getExamStatistics",
    async (testId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            
            if (!token) {
                throw new Error('برای دریافت آمار آزمون باید وارد شوید');
            }
            
            const response = await testsApi.getExamStatistics(testId, token);
            return { testId, statistics: response.statistics };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllExamAttempts = createAsyncThunk(
    "adminExamResults/getAllExamAttempts",
    async (params, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            if (!token) throw new Error('برای دریافت لیست تلاش‌ها باید وارد شوید');
            const response = await testsApi.getAllExamAttempts(token, params || {});
            return { data: response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const adminExamResultsSlice = createSlice({
    name: "adminExamResults",
    initialState,
    reducers: {
        clearExamResults: (state, action) => {
            if (action.payload) {
                delete state.byTestId[action.payload];
            } else {
                state.byTestId = {};
            }
        },
        clearError: (state) => {
            state.error = null;
        },
        clearStatisticsError: (state) => {
            state.statisticsError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Exam Results
            .addCase(getExamResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExamResults.fulfilled, (state, action) => {
                state.loading = false;
                const { testId, data } = action.payload;
                state.byTestId[testId] = {
                    results: data.results || [],
                    pagination: data.pagination || {}
                };
            })
            .addCase(getExamResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Get Exam Statistics
            .addCase(getExamStatistics.pending, (state) => {
                state.statisticsLoading = true;
                state.statisticsError = null;
            })
            .addCase(getExamStatistics.fulfilled, (state, action) => {
                state.statisticsLoading = false;
                const { testId, statistics } = action.payload;
                state.statistics[testId] = statistics;
            })
            .addCase(getExamStatistics.rejected, (state, action) => {
                state.statisticsLoading = false;
                state.statisticsError = action.payload;
            })
            // Get all attempts (admin)
            .addCase(getAllExamAttempts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllExamAttempts.fulfilled, (state, action) => {
                state.loading = false;
                const { data } = action.payload;
                state.allAttempts = {
                    attempts: data.attempts || [],
                    pagination: data.pagination || {}
                };
            })
            .addCase(getAllExamAttempts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearExamResults, clearError, clearStatisticsError } = adminExamResultsSlice.actions;
export default adminExamResultsSlice.reducer;
