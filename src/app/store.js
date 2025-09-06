import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/user/tests/testsSlice";
import coursesReducer from "../features/user/courses/coursesSlice";
import articlesReducer from "../features/user/articles/articlesSlice";
import podcastsReducer from "../features/user/podcasts/podcastsSlice";
import consultantsReducer from "../features/user/consultants/consultantsSlice";
import examDetailsReducer from "../features/user/quiz/examDetailsSlice";
import courseDetailsReducer from "../features/user/courses/coursesDetailsSlice";
import productsReducer from "../features/user/store/productsSlice";
// admin reducers 
import userStatsReducer from "../features/admin/slices/userStateSlice"
import examAttemptsReducer from "../features/admin/slices/examAttemptsSlice";

const store = configureStore({
  reducer: {
    tests: testsReducer,
    examDetails: examDetailsReducer,
    courses: coursesReducer,
    articles: articlesReducer,
    podcasts: podcastsReducer,
    consultants: consultantsReducer,
    courseDetails: courseDetailsReducer,
    products: productsReducer,

    // admin reducers
    userStats: userStatsReducer,
    examAttempts: examAttemptsReducer,
  },
});

export default store;
