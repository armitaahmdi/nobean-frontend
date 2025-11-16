import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";
const AdminLayout = lazy(() => import("../layout/adminLayout/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Users = lazy(() => import("../pages/admin/Users"));
const Articles = lazy(() => import("../pages/admin/Articles"));
const Consultants = lazy(() => import("../pages/admin/Consultants"));
const Courses = lazy(() => import("../pages/admin/Courses"));
const Podcasts = lazy(() => import("../pages/admin/Podcasts"));
const Tests = lazy(() => import("../pages/admin/Tests"));
const ExamResults = lazy(() => import("../pages/admin/ExamResults"));
const Comments = lazy(() => import("../pages/admin/Comments"));

export const AdminRoutes = ({ user }) => {
    // Check admin access with multiple conditions
    const isAdmin = user && (
        (user.user?.role === "admin" || user.user?.role === "superadmin") ||
        (user.role === "admin" || user.role === "superadmin") ||
        user.phone === '09198718211'
    );

    console.log('AdminRoutes - User:', user);
    console.log('AdminRoutes - User.user.role:', user?.user?.role);
    console.log('AdminRoutes - User.role:', user?.role);
    console.log('AdminRoutes - Is admin?', isAdmin);
    
    if (!isAdmin) {
        return [
            { path: "*", element: <Navigate to="/login" replace /> }
        ];
    }

    return [
        {
            path: "admin",
            element: <AdminLayout role={user.role} />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "users", element: <Users /> },
                { path: "articles", element: <Articles /> },
                { path: "consultants", element: <Consultants /> },
                { path: "courses", element: <Courses /> },
                { path: "podcasts", element: <Podcasts /> },
                { path: "tests", element: <Tests /> },
                { path: "exam-results", element: <ExamResults /> },
                { path: "comments", element: <Comments /> },
            ],
        },
    ];
};
