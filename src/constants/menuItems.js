export const menuItems = [
    { name: "صفحه اصلی", link: "/" },
    {
        name: "آزمون‌ها",
        link: "/tests",
        submenu: [
            { name: "آزمون 1", link: "/tests/1" },
            { name: "آزمون 2", link: "/tests/2" },
        ],
    },
    {
        name: "دوره‌های توسعه فردی",
        link: "/courses",
        submenu: [
            { name: "دوره 1", link: "/courses/1" },
            { name: "دوره 2", link: "/courses/2" },
        ],
    },
    {
        name: "مقالات",
        link: "/articles",
        submenu: [
            { name: "مقاله 1", link: "/courses/1" },
            { name: "مقاله 2", link: "/courses/2" },
        ],
    },
    {
        name: "پادکست",
        link: "/podcasts",
        submenu: [
            { name: "پادکست 1", link: "/courses/1" },
            { name: "پادکست 2", link: "/courses/2" },
        ],
    },
    {
        name: "خدمات‌سازمانی",
        link: "/services",
    },
    { name: "ارتباط با ما", link: "/contact" },
];
