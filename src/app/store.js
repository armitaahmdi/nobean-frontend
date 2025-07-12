import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/tests/testsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import articlesReducer from "../features/articles/articlesSlice";
import podcastsReducer from "../features/podcasts/podcastsSlice";
import consultantsReducer from "../features/consultants/consultantsSlice";
import examDetailsReducer from "../features/quiz/examDetailsSlice";
// admin reducers 
import userStatsReducer from "../admin/store/slices/userStateSlice"
import examAttemptsReducer from "../admin/store/slices/examAttemptsSlice";

const store = configureStore({
  reducer: {
    tests: testsReducer,
    examDetails: examDetailsReducer,
    courses: coursesReducer,
    articles: articlesReducer,
    podcasts: podcastsReducer,
    consultants: consultantsReducer,

    // admin reducers
    userStats: userStatsReducer,
    examAttempts: examAttemptsReducer,
  },
});

export default store;
