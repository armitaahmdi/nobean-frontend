import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/tests/testsSlice";
import coursesReducer from "../features/courses/coursesSlice"

const store = configureStore({
  reducer: {
    tests: testsReducer,
    courses: coursesReducer
  },
});

export default store;
