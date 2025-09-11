import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";
import { validateTestData, formatTestDataForAPI, getApiErrorMessage, generateTestStats } from "../utils/adminUtils";

const initialState = {
    tests: [],
    loading: false,
    error: null,
    stats: {
        total: 0,
        active: 0,
        draft: 0,
        totalQuestions: 0,
        totalParticipants: 0
    }
};

// Fetch all tests for admin
export const fetchAdminTests = createAsyncThunk(
    "adminTests/fetchAdminTests",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            const response = await testsApi.getAllTests(token);
            const tests = response.data || response;
            
            // Generate stats
            const stats = generateTestStats(tests);
            
            return { tests, stats };
        } catch (error) {
            console.error('Fetch Admin Tests Error:', error);
            return thunkAPI.rejectWithValue(getApiErrorMessage(error));
        }
    }
);

// Create new test
export const createAdminTest = createAsyncThunk(
    "adminTests/createAdminTest",
    async (testData, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Validate test data
            const validation = validateTestData(testData);
            if (!validation.isValid) {
                throw new Error(`Validation failed: ${Object.values(validation.errors).join(', ')}`);
            }
            
            // Format data for API
            const formattedData = formatTestDataForAPI(testData);
            
            // Debug logging
            console.log('Creating Admin Test:', {
                hasToken: !!token,
                tokenLength: token.length,
                tokenPreview: token.substring(0, 20) + '...',
                user: state.auth?.user,
                isAuthenticated: state.auth?.isAuthenticated,
                formattedData
            });
            
            const response = await testsApi.createTest(formattedData, token);
            return response.data || response;
        } catch (error) {
            console.error('Create Admin Test Error:', error);
            return thunkAPI.rejectWithValue(getApiErrorMessage(error));
        }
    }
);

// Update existing test
export const updateAdminTest = createAsyncThunk(
    "adminTests/updateAdminTest",
    async ({ testId, testData }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Validate test data
            const validation = validateTestData(testData);
            if (!validation.isValid) {
                throw new Error(`Validation failed: ${Object.values(validation.errors).join(', ')}`);
            }
            
            // Format data for API
            const formattedData = formatTestDataForAPI(testData);
            
            const response = await testsApi.updateTest(testId, formattedData, token);
            return { testId, testData: response.data || response };
        } catch (error) {
            console.error('Update Admin Test Error:', error);
            return thunkAPI.rejectWithValue(getApiErrorMessage(error));
        }
    }
);

// Delete test
export const deleteAdminTest = createAsyncThunk(
    "adminTests/deleteAdminTest",
    async (testId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            await testsApi.deleteTest(testId, token);
            return testId;
        } catch (error) {
            console.error('Delete Admin Test Error:', error);
            return thunkAPI.rejectWithValue(getApiErrorMessage(error));
        }
    }
);

// Fetch test details for admin
export const fetchAdminTestDetails = createAsyncThunk(
    "adminTests/fetchAdminTestDetails",
    async (testId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token;
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            const response = await testsApi.getTestById(testId, token);
            return { testId, testDetails: response.data || response };
        } catch (error) {
            console.error('Fetch Admin Test Details Error:', error);
            return thunkAPI.rejectWithValue(getApiErrorMessage(error));
        }
    }
);

const adminTestsSlice = createSlice({
    name: "adminTests",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearTests: (state) => {
            state.tests = [];
            state.stats = {
                total: 0,
                active: 0,
                draft: 0,
                totalQuestions: 0,
                totalParticipants: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch tests
            .addCase(fetchAdminTests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminTests.fulfilled, (state, action) => {
                state.loading = false;
                state.tests = action.payload.tests;
                state.stats = action.payload.stats;
            })
            .addCase(fetchAdminTests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create test
            .addCase(createAdminTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAdminTest.fulfilled, (state, action) => {
                state.loading = false;
                // Don't add to tests array here, let fetchAdminTests handle it
                // This ensures we get the complete test data from the server
            })
            .addCase(createAdminTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update test
            .addCase(updateAdminTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdminTest.fulfilled, (state, action) => {
                state.loading = false;
                // Don't update tests array here, let fetchAdminTests handle it
                // This ensures we get the complete test data from the server
            })
            .addCase(updateAdminTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete test
            .addCase(deleteAdminTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdminTest.fulfilled, (state, action) => {
                state.loading = false;
                // Don't remove from tests array here, let fetchAdminTests handle it
                // This ensures we get the complete test data from the server
            })
            .addCase(deleteAdminTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch test details
            .addCase(fetchAdminTestDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminTestDetails.fulfilled, (state, action) => {
                state.loading = false;
                // Store test details in a separate state if needed
            })
            .addCase(fetchAdminTestDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearTests } = adminTestsSlice.actions;
export default adminTestsSlice.reducer;