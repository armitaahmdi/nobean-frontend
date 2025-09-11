import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";

const initialState = {
    byTestId: {},
    loading: false,
    questions: [],
    error: ""
}

export const fetchExamDetails = createAsyncThunk(
    "examDetails/fetchExamDetails",
    async (testId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('برای دریافت سوالات آزمون باید وارد شوید');
            }
            
            const response = await testsApi.getTestQuestions(testId, token);
            return { testId, questions: response.data || response };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const examDetailsSlice = createSlice({
    name: "examDetails",
    initialState: initialState,
    reducers: {
        clearExamDetails: (state, action) => {
            if (action.payload) {
                delete state.byTestId[action.payload];
            } else {
                state.byTestId = {};
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamDetails.pending, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = {
                    questions: [],
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchExamDetails.fulfilled, (state, action) => {
                const { testId, questions } = action.payload;
                state.byTestId[testId] = {
                    questions,
                    loading: false,
                    error: null,
                };
            })
            .addCase(fetchExamDetails.rejected, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = {
                    questions: [],
                    loading: false,
                    error: action.payload || "خطا در دریافت سوالات",
                };
            });
    },
});

export const { clearExamDetails } = examDetailsSlice.actions;
export default examDetailsSlice.reducer;
