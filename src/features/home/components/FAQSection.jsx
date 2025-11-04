import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const faqData = [
    {
        question: "چگونه در آزمون‌ها شرکت کنم؟",
        answer: "برای شرکت در آزمون‌ها ابتدا باید در سایت ثبت‌نام کرده و سپس آزمون مورد نظر را انتخاب کنید."
    },
    {
        question: "آیا می‌توانم کارنامه‌ام را بعداً ببینم؟",
        answer: "بله، تمامی کارنامه‌ها در پنل کاربری شما ذخیره می‌شوند و هر زمان قابل مشاهده‌اند."
    },
    {
        question: "چه کسانی می‌توانند از نتایج آزمون استفاده کنند؟",
        answer: "دانش آموزان ، والدین ، معلمان ، مشاوران مدرسه و مدیران مدرسه می‌توانند از نتایج آزمون استفاده کنند."
    },
    {
        question: "آیا آزمون‌ها دارای منابع معتبر هستند؟",
        answer: "بله، تمامی آزمون‌ها بر پایه به‌روزترین و معتبرترین منابع علمی بین‌المللی گردآوری و تدوین شده‌اند."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* <h2 className="text-xl font-extrabold text-center mb-12">پرسش‌های متداول</h2> */}
                <div className="relative text-center mb-16">
                    <h2 className="text-2xl font-bold z-10 relative">
                        سؤالات <span className="text-[#106089]">شما را پاسخ داده‌ایم!</span>
                    </h2>

                    <svg
                        className="mx-auto w-72 h-10"
                        viewBox="0 0 500 100"
                        preserveAspectRatio="none"
                        fill="none"
                        stroke="#106089" 
                        strokeWidth="3"
                    >
                        <path d="M0,80 C150,0 350,100 500,20" />
                    </svg>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/40 backdrop-blur-md border border-[#106089]/20 rounded-2xl shadow-lg transition-all duration-300"
                        >
                            <button
                                className="w-full flex items-center justify-between px-6 py-5 text-right text-[#106089] font-semibold text-lg"
                                onClick={() => toggle(index)}
                            >
                                <span>{item.question}</span>
                                <span>
                                    {openIndex === index ? (
                                        <FaMinus className="text-[#106089]" />
                                    ) : (
                                        <FaPlus className="text-[#106089]" />
                                    )}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}