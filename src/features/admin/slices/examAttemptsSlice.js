import { createSlice } from "@reduxjs/toolkit";
import { examAttemptsFake } from "../../../config/examAttempts"; 

const examAttemptsSlice = createSlice({
  name: "examAttempts",
  initialState: {
    list: examAttemptsFake,
  },
  reducers: {
    addExamAttempt: (state, action) => {
      state.list.push(action.payload);
    },
    setExamAttempts: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addExamAttempt, setExamAttempts } = examAttemptsSlice.actions;
export default examAttemptsSlice.reducer;
