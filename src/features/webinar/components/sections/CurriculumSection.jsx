import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const phases = [
    {
        title: "بخش اول: آشنایی با اختلال یادگیری",
        duration: "۲۰ دقیقه",
        description:
            "در این بخش به تعریف علمی اختلال یادگیری، انواع آن و تفاوت آن با عقب‌ماندگی ذهنی یا مشکلات رفتاری پرداخته می‌شود. همچنین با نشانه‌های اولیه و اهمیت تشخیص به‌موقع آشنا می‌شوید.",
    },
    {
        title: "بخش دوم: نشانه‌ها و تشخیص",
        duration: "۳۰ دقیقه",
        description:
            "بررسی دقیق علائم شایع در کودکان با اختلال یادگیری مانند مشکلات خواندن، نوشتن یا تمرکز. همچنین نحوه ارزیابی اولیه در خانه یا مدرسه توضیح داده می‌شود.",
    },
    {
        title: "بخش سوم: روش‌های مداخله و راهکارها",
        duration: "۴۰ دقیقه",
        description:
            "در این بخش روش‌های علمی و عملی برای کمک به کودکان دارای اختلال یادگیری ارائه می‌شود؛ شامل مداخلات آموزشی، بازی‌های درمانی، همراهی با مشاور، و همکاری با معلم‌ها و والدین.",
    },
];

export default function CurriculumSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="max-w-7xl px-4 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                سرفصل‌های وبینار و مسیر یادگیری
            </h2>
            <p className="text-center text-gray-600 mb-10 leading-relaxed text-sm sm:text-base">
                در این وبینار جامع، به صورت مرحله‌ای با مفاهیم، تشخیص و راهکارهای کمک به کودکان دارای اختلال یادگیری آشنا می‌شوید.
            </p>

            <div className="space-y-4 ">
                {phases.map((phase, index) => (
                    <div
                        key={index}
                        className="border bg-white border-gray-200 rounded-2xl shadow-md overflow-hidden"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between px-4 py-4 sm:px-6 text-right text-sm sm:text-base font-semibold text-gray-800 hover:bg-gray-50 transition"
                        >
                            <span>{phase.title}</span>
                            <span className="flex items-center gap-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-xl">
                                {phase.duration}
                                <FaChevronDown
                                    className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-4 sm:px-6 pb-5 text-gray-700 text-sm sm:text-base leading-7 bg-gray-50 rounded-b-2xl">
                                {phase.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
