import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/tests/testsSlice";

const store = configureStore({
  reducer: {
    tests: testsReducer,
  },
});

export default store;
