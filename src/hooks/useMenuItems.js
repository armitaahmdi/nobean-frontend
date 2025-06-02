import { useSelector } from "react-redux";
import { useMemo } from "react";

export const useMenuItems = () => {
    const { tests = [] } = useSelector((store) => store.tests);

    const buildSubmenu = (items = [], baseLink) =>
        items.map(item => ({
            name: item.title || item.name,
            link: `${baseLink}/${item.id}`,
        }));

    const menuItems = useMemo(() => [
        { name: "صفحه اصلی", link: "/" },
        {
            name: "آزمون‌ها",
            link: "/tests",
            submenu: buildSubmenu(tests, "/tests"),
        },
        {
            name: "دوره‌های توسعه فردی",
            link: "/courses",
            // submenu: buildSubmenu(courses, "/courses"),
        },
        {
            name: "مقالات",
            link: "/articles",
            // submenu: buildSubmenu(articles, "/articles"),
        },
        {
            name: "پادکست",
            link: "/podcasts",
            // submenu: buildSubmenu(podcasts, "/podcasts"),
        },
        {
            name: "خدمات‌سازمانی",
            link: "/services",
        },
        { name: "ارتباط با ما", link: "/contact" },
    ], [tests]);

    return menuItems;
};
