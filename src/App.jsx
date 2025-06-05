import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import Courses from "./pages/Courses";
import Article from "./pages/Articles";
import Podcasts from "./pages/Podcasts";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import TestDetails from "./pages/TestDetails";
import CourseDetails from "./pages/CourseDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTests } from "./features/tests/testsSlice";
import { fetchCourses } from "./features/courses/coursesSlice";
import { fetchArticles } from "./features/articles/articlesSlice";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  // dispatch tests for navbar
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTests());
    dispatch(fetchCourses());
    dispatch(fetchArticles())
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/:id" element={<TestDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
