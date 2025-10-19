import { Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

import Home from "../pages/public/Home";
import Tests from "../pages/public/Tests";
import TestDetails from "../pages/public/TestDetails";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import Article from "../pages/public/Articles";
import ArticleDetail from "../pages/public/ArticleDetail";
import Podcasts from "../pages/public/Podcasts";
import PodcastDetail from "../pages/public/PodcastDetail";
import Services from "../pages/public/Services";
import Contact from "../pages/public/Contact";
import Consultants from "../pages/public/Consultants";
import ConsultantDetail from "../pages/public/ConsultantDetail";
import TestQuestions from "../pages/public/TestQuestion";
import Webinar from "../pages/public/Webinar";
import Store from "../pages/public/Store";
import ProductDetail from "../pages/public/ProductDetail";
import Cart from "../pages/public/Cart";
import Favorites from "../pages/public/Favorites";
import AboutUs from "../pages/public/AboutUs";
import Profile from "../pages/public/Profile";
import Dashboard from "../pages/public/Dashboard";
import AuthContainer from "../features/authentication/AuthContainer";

export const PublicRoutes = () => [
    { path: "/login", element: <AuthContainer /> },
    { path: "/exam/:testId", element: <TestQuestions /> },
    {
        path: "/*",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },    
            { path: "tests", element: <Tests /> },
            { path: "tests/:id", element: <TestDetails /> },
            // { path: "courses", element: <Courses /> },
            // { path: "courses/:id", element: <CourseDetails /> },
            // { path: "webinar", element: <Webinar /> },
            { path: "articles", element: <Article /> },
            { path: "articles/:id", element: <ArticleDetail /> },
            // { path: "podcasts", element: <Podcasts /> },
            // { path: "podcasts/:id", element: <PodcastDetail /> },
            // { path: "services", element: <Services /> },
            { path: "contact", element: <Contact /> },
            { path: "consultants", element: <Consultants /> },
            { path: "consultants/:id", element: <ConsultantDetail /> },
            // { path: "store/:id", element: <ProductDetail /> },
            // { path: "store", element: <Store /> },
            { path: "cart", element: <Cart /> },
            { path: "favorites", element: <Favorites /> },
            { path: "profile", element: <Profile /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "about", element: <AboutUs /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
];
