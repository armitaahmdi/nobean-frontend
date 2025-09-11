import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";
import { processTestData, generateRandomRating } from "./utils/testUtils";

const initialState = {
    byTestId: {},
    loading: false,
    error: ""
}

// Fetch individual test details
export const fetchTestDetails = createAsyncThunk(
    "testDetails/fetchTestDetails",
    async (testId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth?.token || null;
            const response = await testsApi.getTestById(testId, token);
            
            // Debug logging to see what we're getting
            console.log('Test Details API Response:', response);
            console.log('Raw testDetails from API:', response.data || response);
            
            // Process the response data to ensure all fields are available
            const testDetails = response.data || response;
            
            // Generate consistent rating for this test
            const consistentRating = generateRandomRating();
            
            // Process test data using utility function
            const processedTestDetails = processTestData(testDetails, {
                generateRating: true,
                fallbackRating: consistentRating
            });
            
            console.log('Processed Test Details:', processedTestDetails);
            
            return { testId, testDetails: processedTestDetails };
        } catch (error) {
            console.error('Error fetching test details:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const testDetailsSlice = createSlice({
    name: "testDetails",
    initialState,
    reducers: {
        clearTestDetails: (state, action) => {
            if (action.payload) {
                delete state.byTestId[action.payload];
            } else {
                state.byTestId = {};
            }
        },
        clearAllTestDetails: (state) => {
            state.byTestId = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestDetails.pending, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = {
                    testDetails: null,
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchTestDetails.fulfilled, (state, action) => {
                const { testId, testDetails } = action.payload;
                state.byTestId[testId] = {
                    testDetails,
                    loading: false,
                    error: null,
                };
            })
            .addCase(fetchTestDetails.rejected, (state, action) => {
                const testId = action.meta.arg;
                state.byTestId[testId] = {
                    testDetails: null,
                    loading: false,
                    error: action.payload || "خطا در دریافت جزئیات آزمون",
                };
            });
    },
});

export const { clearTestDetails, clearAllTestDetails } = testDetailsSlice.actions;
export default testDetailsSlice.reducer;
