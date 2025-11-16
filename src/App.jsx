// import { Routes, Route, Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import Layout from "./layout/Layout";
// import Home from "./pages/Home";
// import Tests from "./pages/Tests";
// import TestDetails from "./pages/TestDetails";
// import Courses from "./pages/Courses";
// import CourseDetails from "./pages/CourseDetails";
// import Article from "./pages/Articles";
// import ArticleDetail from "./pages/ArticleDetail";
// import Podcasts from "./pages/Podcasts";
// import PodcastDetail from "./pages/PodcastDetail";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";
// import Consultants from "./pages/Consultants";
// import ConsultantDetail from "./pages/ConsultantDetail";
// import TestQuestions from "./pages/TestQuestion";

// import { fetchTests } from "./features/tests/testsSlice";
// import { fetchCourses } from "./features/courses/coursesSlice";
// import { fetchArticles } from "./features/articles/articlesSlice";
// import { fetchPodcasts } from "./features/podcasts/podcastsSlice";
// import AuthContainer from "./features/authentication/AuthContainer";
// import AdminRoutes from "./admin/routes/AdminRoutes";
// import ScrollToTop from "./components/shared/ScrollToTop";
// import Webinar from "./pages/Webinar";
// import Store from "./pages/Store";

// export default function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchTests());
//     dispatch(fetchCourses());
//     dispatch(fetchArticles());
//     dispatch(fetchPodcasts());
//   }, [dispatch]);

//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/exam/:testId" element={<TestQuestions />} />
//         <Route path="/login" element={<AuthContainer />} />
//         {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
//         {AdminRoutes()}
//         <Route
//           path="/*"
//           element={
//             <Layout>
//               <Routes>
//                 <Route path="/" element={<Home />} />

//                 <Route path="/tests" element={<Tests />} />
//                 <Route path="/tests/:id" element={<TestDetails />} />

//                 <Route path="/courses" element={<Courses />} />
//                 <Route path="/courses/:id" element={<CourseDetails />} />

//                 <Route path="/webinar" element={<Webinar />} />

//                 <Route path="/articles" element={<Article />} />
//                 <Route path="/articles/:id" element={<ArticleDetail />} />

//                 <Route path="/podcasts" element={<Podcasts />} />
//                 <Route path="/podcasts/:id" element={<PodcastDetail />} />

//                 <Route path="/services" element={<Services />} />
//                 <Route path="/contact" element={<Contact />} />

//                 <Route path="/consultants" element={<Consultants />} />
//                 <Route path="/consultants/:id" element={<ConsultantDetail />} />

//                 <Route path="/store" element={<Store />} />

//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </Layout>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

import { Routes, Route } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PublicRoutes } from "./routes/publicRoutes";
import {AdminRoutes} from "./routes/AdminRoutes";
import ScrollToTop from "./components/shared/ScrollToTop";
import AuthProvider from "./features/authentication/AuthProvider";
import LoadingState from "./components/ui/LoadingState";

// Route-level pages are responsible for fetching their own data to avoid blocking initial load

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Removed global data prefetching to improve initial page load performance.
  // Each route should fetch its own data when needed.

  return (
    <AuthProvider>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Suspense fallback={<LoadingState />}>
      <Routes>
        {/* مسیرهای عمومی */}
        {PublicRoutes().map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((child, i) => (
              <Route
                key={i}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}

        {/* مسیرهای ادمین */}
        {AdminRoutes({ user }).map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((child, i) => (
              <Route
                key={i}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
      </Suspense>
    </AuthProvider>
  );
}