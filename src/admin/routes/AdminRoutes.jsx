// admin/routes/AdminRoutes.jsx
import { Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Articles from "../pages/Articles";
import Consultants from "../pages/Consultants";
import Courses from "../pages/Courses";
import Podcasts from "../pages/Podcasts";
import Tests from "../pages/Tests";

export default function AdminRoutes() {
    const user = { role: "superadmin" };

    if (user.role !== "superadmin") {
        return null; // یا می‌تونی Navigate بزنی
    }

    return (
        <>
            <Route path="admin" element={<AdminLayout role={user.role} />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="articles" element={<Articles />} />
                <Route path="consultants" element={<Consultants />} />
                <Route path="courses" element={<Courses />} />
                <Route path="podcasts" element={<Podcasts />} />
                <Route path="tests" element={<Tests />} />
            </Route>
        </>
    );
}
