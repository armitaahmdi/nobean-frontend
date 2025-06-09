import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/tests/testsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import articlesReducer from "../features/articles/articlesSlice";
import podcastsReducer from "../features/podcasts/podcastsSlice";
import consultantsReducer from "../features/consultants/consultantsSlice"

const store = configureStore({
  reducer: {
    tests: testsReducer,
    courses: coursesReducer,
    articles: articlesReducer,
    podcasts: podcastsReducer,
    consultants: consultantsReducer,
  },
});

export default store;
