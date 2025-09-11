import { FaRegUser } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CiGlobe } from "react-icons/ci";
import { LuGraduationCap } from "react-icons/lu";
import behavioral from "../../assets/images/categoryIcons/behavioral.png"
import family from "../../assets/images/categoryIcons/home.png"
import anxiety from "../../assets/images/categoryIcons/anxiety.png"
import behaviour from "../../assets/images/categoryIcons/behaviour.png"
import healthy from "../../assets/images/categoryIcons/healthy-lifestyle.png"
import learning from "../../assets/images/categoryIcons/learning.png";
import education from "../../assets/images/categoryIcons/education.png";
import skill from "../../assets/images/categoryIcons/skill-development.png";
import parent from "../../assets/images/categoryIcons/parent.png";
import psychology from "../../assets/images/categoryIcons/psychology.png";

// Import test-specific icons
import readingIcon from "../../assets/images/testIcons/reading-disorder.png";
import writingIcon from "../../assets/images/testIcons/writing.png";
import mathIcon from "../../assets/images/testIcons/maths.png";
import attentionIcon from "../../assets/images/testIcons/adhd.png";
import learningIcon from "../../assets/images/testIcons/learning-disorder.png";

export const testsFilterConfig = {
    target_audience: {
        title: "مناسب برای",
        icon: FaRegUser,
        options: ["ویژه والدین و فرزندان", "ویژه فرزندان", "ویژه والدین"],
    },
    sortOptions: {
        title: "مرتب‌سازی بر اساس",
        icon: IoFilter,
        options: ["بیشترین امتیاز", "بیشترین انجام", "قیمت"],
    },
    categories: {
        title: "دسته‌بندی آزمون",
        icon: IoMdPricetag,
        options: [
            { name: "اختلال خواندن", image: readingIcon },
            { name: "اختلال نوشتن", image: writingIcon },
            { name: "اختلال ریاضی", image: mathIcon },
            { name: "اختلال توجه", image: attentionIcon },
            { name: "اختلال یادگیری", image: learningIcon },
        ],
    },
};

export const coursesFilterConfig = {
    target_audience: {
        title: "مناسب برای",
        icon: FaRegUser,
        options: ["ویژه والدین و فرزندان", "ویژه فرزندان", "ویژه والدین"],
    },
    sortOptions: {
        title: "مرتب‌سازی بر اساس",
        icon: IoFilter,
        options: ["بیشترین امتیاز", "بیشترین انجام", "قیمت"],
    },
    categories: {
        title: "دسته‌بندی دوره",
        icon: IoMdPricetag,
        options: [
            { name: "خانواده", image: family },
            { name: "سبک زندگی", image: healthy },
            { name: "شخصیت شناسی", image: behaviour },
            { name: "اضطراب", image: anxiety },
            { name: "اختلالات رفتاری", image: behavioral },
        ],
    },
};

export const articlesFilterConfig = {
    target_audience: {
        title: "مناسب برای",
        icon: FaRegUser,
        options: ["ویژه والدین و فرزندان", "ویژه فرزندان", "ویژه والدین"],
    },
    categories: {
        title: "دسته‌بندی مقاله",
        icon: IoMdPricetag,
        // options: ["تحصیل", "هوش", "مهارت", "تربیت", "روانشناسی"],
        options: [
            { name: "هوش", image: learning },
            { name: "تحصیل", image: education },
            { name: "مهارت", image: skill },
            { name: "تربیت", image: parent },
            { name: "روانشناسی", image: psychology },
        ]
    },
}

export const podcastsFilterConfig = {
    target_audience: {
        title: "مناسب برای",
        icon: FaRegUser,
        options: ["ویژه والدین و فرزندان", "ویژه فرزندان", "ویژه والدین"],
    },
    categories: {
        title: "دسته‌بندی پادکست",
        icon: IoMdPricetag,
        options: [
            { name: "هوش", image: learning },
            { name: "تحصیل", image: education },
            { name: "مهارت", image: skill },
            { name: "تربیت", image: parent },
            { name: "روانشناسی", image: psychology },
        ]
    },
}

export const consultatsFilterConfig = {
    gender: {
        title: "جنسیت پزشک",
        icon: HiOutlineUserGroup,
        options: ["خانم", "آقا"]
    },
    service: {
        title: "نوع خدمت",
        icon: CiGlobe,
        options: ["آنلاین", "حضوری"]
    },
    scientificDegree: {
        title: "درجه علمی",
        icon: LuGraduationCap,
        options: ["کارشناس", "کارشناسی ارشد", "دکتری"]
    }
}

export const storeFilterConfig = {
    target_audience: {
        title: "مناسب برای",
        icon: FaRegUser,
        options: ["خانواده", "معلم", "دانش آموز"],
    },
    sortOptions: {
        title: "مرتب‌سازی بر اساس",
        icon: IoFilter,
        options: ["بیشترین امتیاز", "کمترین قیمت", "بیشترین قیمت", "جدیدترین"],
    },
}