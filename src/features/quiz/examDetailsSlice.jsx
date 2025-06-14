import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { examDetails } from "../../constants/examDetails";

const initialState = {
    byTestId: {},
    loading: false,
    questions: [],
    error: ""
}

const fetchExamQuestionsAPI = async (testId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const id = Number(testId);
            if (examDetails[id]) resolve(examDetails[id]);
            else reject("سوالات این آزمون یافت نشد.");
        }, 1000);
    });
};

export const fetchExamDetails = createAsyncThunk(
    "examDetails/fetchExamDetails",
    async (testId, thunkAPI) => {
        try {
            const response = await fetchExamQuestionsAPI(testId); // returns { questions: [...] }
            return { testId, questions: response.questions };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
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
