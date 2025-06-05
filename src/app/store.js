import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/tests/testsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import articlesReducer from "../features/articles/articlesSlice"

const store = configureStore({
  reducer: {
    tests: testsReducer,
    courses: coursesReducer,
    articles: articlesReducer
  },
});

export default store;
