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
                // اگر کاربر لاگین نکرده، به صفحه لاگین هدایت کن
                const navigate = thunkAPI.extra?.navigate;
                if (navigate) {
                    navigate('/login');
                }
                throw new Error('برای شرکت در آزمون باید وارد شوید');
            }
            
            const response = await testsApi.getTestQuestions(testId, token);
            
            const questionsArray = response.questions || response.data?.questions || response.data || [];
            
            // Transform questions
            const transformedQuestions = questionsArray.map(q => ({
                id: q.id,
                title: q.title,
                description: q.description || "",  // توضیح کوتاه سوال
                items: q.Items?.flatMap(i => i.items) || [],
                correctIndex: q.Items?.[0]?.correctIndex || 0
            }));
            
            return { testId, questions: transformedQuestions };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const examDetailsSlice = createSlice({
    name: "examDetails",
    initialState,
    reducers: {
        clearExamDetails: (state, action) => {
            if (action.payload) delete state.byTestId[action.payload];
            else state.byTestId = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamDetails.pending, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = { questions: [], loading: true, error: null };
            })
            .addCase(fetchExamDetails.fulfilled, (state, action) => {
                const { testId, questions } = action.payload;
                state.byTestId[testId] = { questions, loading: false, error: null };
            })
            .addCase(fetchExamDetails.rejected, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = { questions: [], loading: false, error: action.payload || "خطا در دریافت سوالات" };
            });
    },
});

export const { clearExamDetails } = examDetailsSlice.actions;
export default examDetailsSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { testsApi } from "../../../services/testsApi";

// const initialState = {
//     byTestId: {},
//     loading: false,
//     questions: [],
//     error: ""
// }

// export const fetchExamDetails = createAsyncThunk(
//     "examDetails/fetchExamDetails",
//     async (testId, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const token = state.auth?.token;
            
//             if (!token) {
//                 throw new Error('برای دریافت سوالات آزمون باید وارد شوید');
//             }
            
//             const response = await testsApi.getTestQuestions(testId, token);
//             console.log('API Response:', response);
            
//             // Extract questions from response
//             const questions = response.questions || response.data?.questions || response.data || [];
//             console.log('Extracted questions:', questions);
            
//             return { testId, questions };
//         } catch (error) {
//             console.error('Error fetching exam details:', error);
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// const examDetailsSlice = createSlice({
//     name: "examDetails",
//     initialState: initialState,
//     reducers: {
//         clearExamDetails: (state, action) => {
//             if (action.payload) {
//                 delete state.byTestId[action.payload];
//             } else {
//                 state.byTestId = {};
//             }
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchExamDetails.pending, (state, action) => {
//                 const testId = action.meta.arg;
//                 state.byTestId[testId] = {
//                     questions: [],
//                     loading: true,
//                     error: null,
//                 };
//             })
//             .addCase(fetchExamDetails.fulfilled, (state, action) => {
//                 const { testId, questions } = action.payload;
                
//                 console.log('Fetched questions from API:', questions);
                
//                 // Ensure questions is an array
//                 const questionsArray = Array.isArray(questions) ? questions : [];
                
//                 // Transform questions to match frontend structure
//                 const transformedQuestions = questionsArray.map(q => ({
//                     id: q.id,
//                     title: q.title,
//                     items: q.Items?.[0]?.items || [],
//                     correctIndex: q.Items?.[0]?.correctIndex || 0
//                 }));
                
//                 console.log('Transformed questions:', transformedQuestions);
                
//                 state.byTestId[testId] = {
//                     questions: transformedQuestions,
//                     loading: false,
//                     error: null,
//                 };
//             })
//             .addCase(fetchExamDetails.rejected, (state, action) => {
//                 const testId = action.meta.arg;
//                 state.byTestId[testId] = {
//                     questions: [],
//                     loading: false,
//                     error: action.payload || "خطا در دریافت سوالات",
//                 };
//             });
//     },
// });

// export const { clearExamDetails } = examDetailsSlice.actions;
// export default examDetailsSlice.reducer;
