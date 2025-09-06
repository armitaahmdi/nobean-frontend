import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { consultantsData } from "../../../constants/consultantData";

const initialState = {
    loading: false,
    consultants: [],
    error: ""
}

const fetchConsultants = createAsyncThunk("consultants/fetchConsultants", async () => {
    return consultantsData;
});

const consultantsSlice = createSlice({
    name: "consultants",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchConsultants.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchConsultants.fulfilled, (state, action) => {
                state.loading = false
                state.consultants = action.payload;
            })
            .addCase(fetchConsultants.rejected, (state, action) => {
                state.loading = false,
                    state.consultants = [],
                    state.error = action.error.message;
            });
    },
});

export default consultantsSlice.reducer;
export { fetchConsultants }