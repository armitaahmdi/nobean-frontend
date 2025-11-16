import { Link } from "react-router-dom";
import learningSupportImage from "../../../assets/images/learning.jpg";
import translate from "../../../locale/translate";
import examTest from "../../../assets/images/3d/3d-exam-test.png";
import report from "../../../assets/images/3d/3d-report.png";
import specialTechniques from "../../../assets/images/3d/3d-teaching-strategies.png";
import personalization from "../../../assets/images/3d/3d-personalized .png";
import service3d from "../../../assets/images/3d/services.png";

const services = [
    {
        id: 1,
        icon: examTest,
        title: "اجرای آزمون راهبردهای مطالعه و یادگیری (LASSI)",
        description: "برگزاری آزمون به صورت فردی و گروهی به صورت آنلاین و حضوری",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        textColor: "text-blue-800",
        link: "/tests",
    },
    {
        id: 2,
        icon: report,
        title: "ارائه کارنامه تخصصی و فردی",
        description: "ارائه نمره، نمودار و جدول برای هر دانش آموز",
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
        textColor: "text-emerald-800",
        // link: "/consultants",
    },
    {
        id: 3,
        icon: personalization,
        title: "ارائه تحلیل شخصی سازی شده",
        description: "تفسیر وضعیت هر فرد و سطح او",
        bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
        textColor: "text-amber-800",
        link: "/courses",
    },
    {
        id: 4,
        icon: specialTechniques,
        title: "ارائه تکنیک و راهبردهای تخصصی ویژه دانش آموزان،والدین،معلمان و مدیران مدارس",
        description: "گزارش‌های دقیق عملکرد و پیشرفت برای ارزیابی بهتر روند درمانی.",
        bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
        textColor: "text-purple-800",
        link: "/",
    },
];

function ServiceCard({ icon, title, description, bgColor, textColor, link = "/" }) {
    return (
        <Link
            to={link}
            className={`${bgColor} flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 rounded-xl lg:rounded-3xl p-5 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] lg:hover:scale-105 border border-gray-100`}
        >
            <div className="w-20 h-20 lg:w-32 lg:h-32 flex-shrink-0 flex items-center justify-center">
                <img
                    src={icon}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex flex-col text-center lg:text-right flex-1 w-full min-w-0">
                <h3 className={`${textColor} text-base lg:text-lg font-bold mb-2 lg:mb-2.5 leading-snug lg:leading-tight`}>{title}</h3>
                <p className={`${textColor} text-sm leading-relaxed opacity-90`}>
                    {description}
                </p>
            </div>
        </Link>
    );
}

export default function ServicesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-14">
            <h2 className="flex items-center justify-center gap-2 md:gap-3 relative text-lg md:text-xl font-bold text-gray-800 mb-6 md:mb-8 lg:mb-10">
                <span className="inline-block w-8 md:w-12 lg:w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                <span>{translate.ourService}</span>
                <span className="inline-block w-8 md:w-12 lg:w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 items-center">
                <div className="hidden md:flex justify-center">
                    <img
                        src={service3d}
                        alt="حمایت از اختلال یادگیری"
                        className="rounded-2xl md:rounded-3xl shadow-lg object-cover max-h-[400px] md:max-h-[450px] lg:max-h-[500px] w-full"
                    />
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-8 items-stretch">
                    {services.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
