import { FaHome, FaUsers, FaClipboardList, FaUserTie, FaFileAlt } from "react-icons/fa";

const adminMenu = [
    {
        id: "dashboard",
        name: "داشبورد",
        link: "/admin",
        icon: FaHome,
    },
    {
        id: "users",
        name: "کاربران",
        icon: FaUsers,
        submenu: [
            { id: "users-list", name: "لیست کاربران", link: "/admin/users/list" },
            { id: "users-create", name: "ایجاد کاربر جدید", link: "/admin/users/create" },
        ],
    },
    {
        id: "exams",
        name: "آزمون‌ها",
        link: "/admin/exams",
        icon: FaClipboardList,
    },
    {
        id: "consultants",
        name: "مشاوران",
        link: "/admin/consultants",
        icon: FaUserTie,
    },
    {
        id: "articles",
        name: "مقالات",
        link: "/admin/articles",
        icon: FaFileAlt,
    },
];

export default adminMenu;
