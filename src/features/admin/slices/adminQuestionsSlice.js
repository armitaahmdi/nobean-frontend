import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testsApi } from '../../../services/testsApi';

// Async thunks for question management
export const createQuestion = createAsyncThunk(
    'adminQuestions/createQuestion',
    async ({ testId, questionData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            const response = await testsApi.addQuestionToTest(testId, questionData, token);
            return { testId, ...response };
        } catch (error) {
            return rejectWithValue(
                error.message || 'خطا در ایجاد سوال'
            );
        }
    }
);

export const fetchTestQuestions = createAsyncThunk(
    'adminQuestions/fetchTestQuestions',
    async (testId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            const response = await testsApi.getTestQuestions(testId, token);
            return { testId, questions: response.questions };
        } catch (error) {
            return rejectWithValue(
                error.message || 'خطا در دریافت سوالات'
            );
        }
    }
);

export const updateQuestion = createAsyncThunk(
    'adminQuestions/updateQuestion',
    async ({ testId, questionId, questionData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            const response = await testsApi.updateQuestion(testId, questionId, questionData, token);
            return { testId, questionId, ...response };
        } catch (error) {
            return rejectWithValue(
                error.message || 'خطا در به‌روزرسانی سوال'
            );
        }
    }
);

export const deleteQuestion = createAsyncThunk(
    'adminQuestions/deleteQuestion',
    async ({ testId, questionId }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            await testsApi.deleteQuestion(testId, questionId, token);
            return { testId, questionId };
        } catch (error) {
            return rejectWithValue(
                error.message || 'خطا در حذف سوال'
            );
        }
    }
);

const initialState = {
    questions: {},
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null
};

const adminQuestionsSlice = createSlice({
    name: 'adminQuestions',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.createError = null;
            state.updateError = null;
            state.deleteError = null;
        },
        clearQuestions: (state) => {
            state.questions = {};
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Question
            .addCase(createQuestion.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.createLoading = false;
                const { testId, question, options } = action.payload;
                
                if (!state.questions[testId]) {
                    state.questions[testId] = [];
                }
                
                // Transform the question data to match frontend structure
                const transformedQuestion = {
                    id: question.id,
                    title: question.title,
                    items: options?.items || [],
                    weights: options?.weights || (options?.items || []).map(() => 1),
                    componentId: question.componentId ?? null,
                    domainId: null,
                    questionNumber: question.questionNumber ?? null,
                    description: question.description ?? null
                };
                
                state.questions[testId].push(transformedQuestion);
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload;
            })
            
            // Fetch Test Questions
            .addCase(fetchTestQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestQuestions.fulfilled, (state, action) => {
                state.loading = false;
                const { questions } = action.payload;
                const testId = action.meta.arg;
                
                console.log('Fetched questions from API:', questions);
                
                // Transform questions to match frontend structure
                const transformedQuestions = questions.map(q => {
                    console.log('Processing question:', q);
                    console.log('Question Items:', q.Items);
                    
                    return {
                        id: q.id,
                        title: q.title,
                        items: q.Items?.[0]?.items || [],
                        weights: q.Items?.[0]?.weights || (q.Items?.[0]?.items || []).map(() => 1),
                        componentId: q.componentId ?? q.Component?.id ?? null,
                        domainId: q.Component?.domainId ?? q.Component?.Domain?.id ?? null,
                        questionNumber: q.questionNumber ?? null,
                        description: q.description ?? null
                    };
                });
                
                console.log('Transformed questions:', transformedQuestions);
                state.questions[testId] = transformedQuestions;
            })
            .addCase(fetchTestQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update Question
            .addCase(updateQuestion.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.updateLoading = false;
                const { testId, questionId, question } = action.payload;
                
                if (state.questions[testId]) {
                    const index = state.questions[testId].findIndex(q => q.id === questionId);
                    if (index !== -1) {
                        // Transform the question data to match frontend structure
                        const transformedQuestion = {
                            id: question.id,
                            title: question.title,
                            items: question.Items?.[0]?.items || [],
                            weights: question.Items?.[0]?.weights || (question.Items?.[0]?.items || []).map(() => 1),
                            componentId: question.componentId ?? null,
                            domainId: question.Component?.domainId ?? state.questions[testId][index]?.domainId ?? null,
                            questionNumber: question.questionNumber ?? null,
                            description: question.description ?? null
                        };
                        state.questions[testId][index] = transformedQuestion;
                    }
                }
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            })
            
            // Delete Question
            .addCase(deleteQuestion.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.deleteLoading = false;
                const { testId, questionId } = action.payload;
                
                if (state.questions[testId]) {
                    state.questions[testId] = state.questions[testId].filter(
                        q => q.id !== questionId
                    );
                }
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload;
            });
    }
});

export const { clearError, clearQuestions } = adminQuestionsSlice.actions;
export default adminQuestionsSlice.reducer;
