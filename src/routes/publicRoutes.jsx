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
            { path: "courses", element: <Courses /> },
            { path: "courses/:id", element: <CourseDetails /> },
            { path: "webinar", element: <Webinar /> },
            { path: "articles", element: <Article /> },
            { path: "articles/:id", element: <ArticleDetail /> },
            { path: "podcasts", element: <Podcasts /> },
            { path: "podcasts/:id", element: <PodcastDetail /> },
            { path: "services", element: <Services /> },
            { path: "contact", element: <Contact /> },
            { path: "consultants", element: <Consultants /> },
            { path: "consultants/:id", element: <ConsultantDetail /> },
            { path: "store", element: <Store /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
];
