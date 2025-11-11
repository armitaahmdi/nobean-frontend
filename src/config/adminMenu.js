import { FaHome, FaUsers, FaClipboardList, FaUserTie, FaFileAlt, FaPodcast, FaBookOpen, FaSchool, FaChartBar, FaComments } from "react-icons/fa";

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
        link: "/admin/users",
        icon: FaUsers,
    },
    {
        id: "exams",
        name: "آزمون‌ها",
        icon: FaClipboardList,
        submenu: [
            { id: "exams-list", name: "لیست آزمون‌ها", link: "/admin/tests", icon: FaClipboardList },
            { id: "exam-results", name: "نتایج آزمون‌ها", link: "/admin/exam-results", icon: FaChartBar },
        ],
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
    {
        id: "comments",
        name: "نظرات",
        link: "/admin/comments",
        icon: FaComments,
    },
];

export default adminMenu;
