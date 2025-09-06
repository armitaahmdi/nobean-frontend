import { FaHome, FaUsers, FaClipboardList, FaUserTie, FaFileAlt, FaPodcast, FaBookOpen, FaSchool } from "react-icons/fa";

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
        id: "courses",
        name: "دوره ها",
        link: "/admin/courses",
        icon: FaBookOpen,
    },
    {
        id: "consultants",
        name: "مشاورها",
        link: "/admin/consultants",
        icon: FaUserTie,
    },
    {
        id: "schools",
        name: "مدیریت مدارس",
        link: "/admin/schools",
        icon: FaSchool,
    },
    {
        id: "articles",
        name: "مقالات",
        link: "/admin/articles",
        icon: FaFileAlt,
    },
    {
        id: "podcasts",
        name: "پادکست ها",
        link: "/admin/podcasts",
        icon: FaPodcast,
    },
];

export default adminMenu;
