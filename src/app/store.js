import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "../features/user/tests/testsSlice";
import testDetailsReducer from "../features/user/tests/testDetailsSlice";
import coursesReducer from "../features/user/courses/coursesSlice";
import articlesReducer from "../features/user/articles/articlesSlice";
import podcastsReducer from "../features/user/podcasts/podcastsSlice";
import consultantsReducer from "../features/user/consultants/consultantsSlice";
import examDetailsReducer from "../features/user/quiz/examDetailsSlice";
import courseDetailsReducer from "../features/user/courses/coursesDetailsSlice";
import productsReducer from "../features/user/store/productsSlice";
import cartReducer from "../features/user/store/slices/cartSlice";
// admin reducers 
import userStatsReducer from "../features/admin/slices/userStateSlice"
import examAttemptsReducer from "../features/admin/slices/examAttemptsSlice";
import { adminTestsReducer } from "../features/admin/slices";
// authentication reducers
import authReducer from "../features/authentication/slices/loginSlice";
import otpReducer from "../features/authentication/slices/otpSlice";
// profile reducer
import profileReducer from "../features/user/profile/profileSlice";

const store = configureStore({
  reducer: {
    tests: testsReducer,
    testDetails: testDetailsReducer,
    examDetails: examDetailsReducer,
    courses: coursesReducer,
    articles: articlesReducer,
    podcasts: podcastsReducer,
    consultants: consultantsReducer,
    courseDetails: courseDetailsReducer,
    products: productsReducer,
    cart: cartReducer,

    // admin reducers
    userStats: userStatsReducer,
    examAttempts: examAttemptsReducer,
    adminTests: adminTestsReducer,
    
    // authentication reducers
    auth: authReducer,
    otp: otpReducer,
    // profile reducer
    profile: profileReducer,
  },
});

export default store;
