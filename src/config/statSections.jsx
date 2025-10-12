import { FaUsers, FaFileAlt, FaUserTie, FaCommentDots, FaClipboardList, FaBookOpen, FaPodcast, FaCheckCircle, FaShoppingCart, FaHandshake } from "react-icons/fa";

export const statItems = [
    { key: "users", title: "کاربران", link: "/admin/users" },
    { key: "exams", title: "آزمون‌ها", link: "/admin/tests" },
    { key: "consultants", title: "مشاورها", link: "/admin/consultants" },
    { key: "examsTaken", title: "آزمون‌های انجام شده", link: "/admin/exam-results" },
    { key: "coursesPurchased", title: "دوره‌های خریداری شده", link: "/admin/courses" },
    { key: "successfulConsultations", title: "مشاوره‌های موفق", link: "/admin/consultants" },
    { key: "articles", title: "مقالات", link: "/admin/articles" },
    { key: "podcasts", title: "پادکست‌ها", link: "/admin/podcasts" },
    { key: "comments", title: "نظرات" },
];


export const iconsMap = {
    users: FaUsers,
    exams: FaClipboardList,
    examsTaken: FaCheckCircle,
    courses: FaBookOpen,
    coursesPurchased: FaShoppingCart,
    consultants: FaUserTie,
    successfulConsultations: FaHandshake,
    articles: FaFileAlt,
    podcasts: FaPodcast,
    comments: FaCommentDots,
};

export const colorsMap = {
    users: "blue",
    exams: "green",
    consultants: "purple",
    examsTaken: "teal",
    coursesPurchased: "orange",
    successfulConsultations: "pink",
    articles: "yellow",
    podcasts: "cyan",
    comments: "red",
};
