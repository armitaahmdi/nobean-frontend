import { createSlice } from "@reduxjs/toolkit";
import { fakeUserSignupData } from "../../../config/userSignupData";

const initialState = {
    users: fakeUserSignupData, // فعلاً فیک
    loading: false,
    error: null,
};

const userStatsSlice = createSlice({
    name: "userStats",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUsers, setLoading, setError } = userStatsSlice.actions;
export default userStatsSlice.reducer;
