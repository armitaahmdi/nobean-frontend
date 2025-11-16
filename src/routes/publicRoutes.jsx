import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("../layout/Layout"));
const Home = lazy(() => import("../pages/public/Home"));
const Tests = lazy(() => import("../pages/public/Tests"));
const TestDetails = lazy(() => import("../pages/public/TestDetails"));
const Courses = lazy(() => import("../pages/public/Courses"));
const CourseDetails = lazy(() => import("../pages/public/CourseDetails"));
const Article = lazy(() => import("../pages/public/Articles"));
const ArticleDetail = lazy(() => import("../pages/public/ArticleDetail"));
const Podcasts = lazy(() => import("../pages/public/Podcasts"));
const PodcastDetail = lazy(() => import("../pages/public/PodcastDetail"));
const Services = lazy(() => import("../pages/public/Services"));
const Contact = lazy(() => import("../pages/public/Contact"));
const Consultants = lazy(() => import("../pages/public/Consultants"));
const ConsultantDetail = lazy(() => import("../pages/public/ConsultantDetail"));
const TestQuestions = lazy(() => import("../pages/public/TestQuestion"));
const Webinar = lazy(() => import("../pages/public/Webinar"));
const Store = lazy(() => import("../pages/public/Store"));
const ProductDetail = lazy(() => import("../pages/public/ProductDetail"));
const Cart = lazy(() => import("../pages/public/Cart"));
const Favorites = lazy(() => import("../pages/public/Favorites"));
const AboutUs = lazy(() => import("../pages/public/AboutUs"));
const Profile = lazy(() => import("../pages/public/Profile"));
const Dashboard = lazy(() => import("../pages/public/Dashboard"));
const AuthContainer = lazy(() => import("../features/authentication/AuthContainer"));

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
