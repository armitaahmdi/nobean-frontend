import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function FaqTab({ faq }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faq?.length) return <p className="text-center text-gray-500">سؤالی برای نمایش وجود ندارد.</p>;

    return (
        <div className="space-y-3">
            {faq.map((item, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-right"
                    >
                        <span className="font-semibold text-gray-800">{item.question}</span>
                        <span
                            className={`text-xl text-darkBlue transform transition-transform duration-300 ${
                                openIndex === index ? "rotate-180" : ""
                            }`}
                        >
                            <HiChevronDown />
                        </span>
                    </button>

                    <div
                        className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                            openIndex === index ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden"
                        }`}
                    >
                        {item.answer}
                    </div>
                </div>
            ))}
        </div>
    );
}
