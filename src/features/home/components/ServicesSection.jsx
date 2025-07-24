import { Link } from "react-router-dom";
import learningSupportImage from "../../../assets/images/learning.jpg";
import satisfiction from "../../../assets/images/categoryIcons/homePageIcons/satisfaction.png";
import training from "../../../assets/images/categoryIcons/homePageIcons/training.png";
import consultation from "../../../assets/images/categoryIcons/homePageIcons/consultation.png";
import healthreport from "../../../assets/images/categoryIcons/homePageIcons/health-report.png";
import translate from "../../../locale/translate";

const services = [
    {
        id: 1,
        icon: satisfiction,
        title: "آزمون‌های تشخیص اختلال یادگیری",
        description: "آزمون‌های تخصصی برای شناسایی دقیق اختلالات یادگیری کودکان و نوجوانان.",
        bgColor: "bg-[#106089]",
        textColor: "text-white",
        link: "/tests",
    },
    {
        id: 2,
        icon: consultation,
        title: "مشاوره و حمایت تخصصی",
        description: "مشاوره‌های اختصاصی و برنامه‌ریزی درمانی برای خانواده‌ها و مدارس.",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        link: "/consultants",
    },
    {
        id: 3,
        icon: training,
        title: "دوره‌های آموزشی ویژه",
        description: "دوره‌های تخصصی برای آموزش مهارت‌های جبران اختلالات یادگیری.",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        link: "/courses",
    },
    {
        id: 4,
        icon: healthreport,
        title: "گزارش‌ها و تحلیل پیشرفت",
        description: "گزارش‌های دقیق عملکرد و پیشرفت برای ارزیابی بهتر روند درمانی.",
        bgColor: "bg-[#106089]",
        textColor: "text-white",
        link: "/",
    },
];

function ServiceCard({ icon, title, description, bgColor, textColor, link }) {
    return (
        <Link
            to={link}
            className={`${bgColor} flex items-center gap-5 rounded-3xl p-6 shadow-md hover:shadow-lg transition cursor-pointer`}
        >
            <div className="w-16 h-16 flex-shrink-0">
                <img
                    src={icon}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex flex-col text-right">
                <h3 className={` ${textColor} text-lg font-bold`}>{title}</h3>
                <p className={` ${textColor} text-sm mt-1 leading-relaxed`}>
                    {description}
                </p>
            </div>
        </Link>
    );
}

export default function ServicesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14">
            <h2 className="flex items-center justify-center gap-3 relative text-xl font-bold text-gray-800 mb-10">
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                <span>{translate.ourService}</span>
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center">
                    <img
                        src={learningSupportImage}
                        alt="حمایت از اختلال یادگیری"
                        className="rounded-3xl shadow-lg object-cover max-h-[500px] w-full"
                    />
                </div>

                <div className="flex flex-col gap-8">
                    {services.slice(0, 2).map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>

                <div className="flex flex-col gap-8">
                    {services.slice(2, 4).map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
