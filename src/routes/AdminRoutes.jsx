import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/adminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Articles from "../pages/admin/Articles";
import Consultants from "../pages/admin/Consultants";
import Courses from "../pages/admin/Courses";
import Podcasts from "../pages/admin/Podcasts";
import Tests from "../pages/admin/Tests";
import AdminTests from "../pages/admin/AdminTests";

export const AdminRoutes = ({ user }) => {
    if (!user || user.role !== "superadmin") {
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
                { path: "tests-management", element: <AdminTests /> },
            ],
        },
    ];
};
