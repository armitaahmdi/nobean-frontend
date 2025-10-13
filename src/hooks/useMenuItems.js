import { useSelector } from "react-redux";
import { IoHomeOutline, IoBriefcaseOutline, IoClipboardOutline, IoBookOutline, IoNewspaperOutline, IoInformationCircleOutline } from "react-icons/io5";
import { HiOutlineUserGroup, HiOutlinePhone } from "react-icons/hi2";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";

export const useMenuItems = () => {
    const { tests = [] } = useSelector((store) => store.tests);
    const { courses = [] } = useSelector((store) => store.courses);
    const { articles = [] } = useSelector((store) => store.articles);
    const { podcasts = [] } = useSelector((store) => store.podcasts)
    const { consultants = [] } = useSelector((store) => store.consultants)

    const buildSubmenu = (items = [], baseLink) =>
        items.map(item => ({
            name: item.title || item.name,
            link: `${baseLink}/${item.id}`,
        }));

    const menuItems = [
        { name: "صفحه اصلی", link: "/", icon: IoHomeOutline },
        {
            name: "آزمون‌ها",
            link: "/tests",
            icon: IoClipboardOutline,
            // submenu: buildSubmenu(tests, "/tests"),
        },
        // {
        //     name: "دوره‌های توسعه فردی",
        //     link: "/courses",
        //     icon: IoBookOutline,
        //     submenu: buildSubmenu(courses, "/courses"),
        // },
        // {
        //     name: "وبینار 🔥",
        //     link: "/webinar",
        //     icon: FaChalkboardTeacher,
        // },
        // {
        //     name: "مقالات",
        //     link: "/articles",
        //     icon: IoNewspaperOutline,
        //     submenu: buildSubmenu(articles, "/articles"),
        // },
        // {
        //     name: "پادکست",
        //     link: "/podcasts",
        //     icon: CiMicrophoneOn,
        //     submenu: buildSubmenu(podcasts, "/podcasts"),
        // },
        // {
        //     name: "مشاورین",
        //     link: "/consultants",
        //     icon: HiOutlineUserGroup,
        //     submenu: buildSubmenu(consultants, "/consultants")
        // },
        // {
        //     name: "فروشگاه",
        //     link: "/store",
        // },
        // {
        //     name: "خدمات‌سازمانی",
        //     link: "/services",
        //     icon: IoBriefcaseOutline,
        // },
        { name: "درباره ما", link: "/about", icon: IoInformationCircleOutline },
        { name: "ارتباط با ما", link: "/contact", icon: HiOutlinePhone },
    ];

    return menuItems;
};
