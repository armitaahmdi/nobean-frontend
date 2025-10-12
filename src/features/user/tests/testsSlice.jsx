import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testsApi } from "../../../services/testsApi";
import { processTestsData } from "./utils/testUtils";

const initialState = {
    loading: false,
    tests: [],
    error: ""
}

const fetchTests = createAsyncThunk("tests/fetchTests", async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth?.token || null;
        
        // استفاده از API جدید برای دریافت فقط آزمون‌های فعال
        const response = await testsApi.getActiveTests();
        
        // Debug logging to see what we're getting
        console.log('Active Tests API Response:', response);
        
        const tests = response.data || response;
        
        // Process tests data using utility function
        const processedTests = processTestsData(tests, {
            generateRating: true
        });
        
        console.log('Processed Active Tests:', processedTests);
        
        return processedTests;
    } catch (error) {
        console.error('Error fetching tests:', error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

const testsSlice = createSlice({
    name: "tests",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTests.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.loading = false
                state.tests = action.payload;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.loading = false,
                    state.tests = [],
                    state.error = action.error.message;
            });
    },
});

export default testsSlice.reducer;
export { fetchTests };
