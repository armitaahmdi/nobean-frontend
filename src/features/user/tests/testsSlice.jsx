import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { examsData } from "../../../constants/examData"; // یا از API بیار

const initialState = {
    loading: false,
    tests: [],
    error: ""
}

const fetchTests = createAsyncThunk("tests/fetchTests", async () => {
    // const response = await fetch("/api/tests");
    // return await response.json();
    return examsData;
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
