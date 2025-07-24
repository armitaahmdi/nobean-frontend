import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Lottie from "lottie-react";
import arrowAnimation from "../../../assets/images/arrow.json";
import "../../../styles/BorderAnimation.css";

export default function SearchBar() {
    const [focused, setFocused] = useState(false);

    return (
        <div className="w-full flex flex-col items-center relative overflow-hidden">
            {/* تار شدن بک‌گراند */}
            {focused && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
                    onClick={() => setFocused(false)}
                />
            )}

            {/* جمله بالا */}
            <div className="mb-8 text-lg text-fuchsia-500 whitespace-nowrap font-bold flex flex-col items-center z-10">
                <span> تفسیر آنلاین و فوری کارنامه آزمون‌ها </span>
                <Lottie
                    animationData={arrowAnimation}
                    loop={true}
                    className="rotate-180 w-[80px] h-[80px]"
                />
            </div>

            {/* بخش وسط با سه ستون: چپ | اینپوت | راست */}
            <div className="flex items-center justify-center w-full max-w-7xl px-4 relative">
                {/* متن چپ */}
                <div className="hidden md:block w-48 text-right text-lg text-pink-900 font-bold ml-3">
                    <span>مشاوره تخصصی روان‌شناسی </span>
                    <span className="text-pink-700">کاملاً آنلاین</span>
                </div>

                {/* سرچ‌باکس با اسکیل */}

                <div
                    className={`relative w-full max-w-xl h-[75px] z-30 transition-transform duration-300 ease-in-out
                        ${focused ? "scale-105" : "hover:scale-105"}
                    `}
                >
                    {/* svg خط‌چین */}
                    <svg
                        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                        viewBox="0 0 400 60"
                        preserveAspectRatio="none"
                    >
                        <rect
                            x="1"
                            y="1"
                            width="398"
                            height="58"
                            rx="30"
                            ry="30"
                            stroke={focused ? "#fff" : "#000"}
                            strokeWidth="2"
                            fill="transparent"
                            className="animated-dashed"
                        />
                    </svg>

                    {/* والد input کوچک‌تر، وسط svg */}
                    <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full shadow-lg flex items-center gap-3 px-6">
                        <FaSearch className="text-gray-600 text-xl" />
                        <input
                            type="text"
                            placeholder="جستجو در آزمون‌ها، دوره‌ها، مشاورین"
                            className="w-full bg-transparent focus:outline-none text-sm text-black placeholder:text-gray-500"
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                    </div>
                </div>


                {/* متن راست */}
                <div className="hidden md:block w-48 text-left text-lg text-cyan-600 font-bold mr-3">
                    <span> ارزیابی دقیق توانایی‌ها، فقط با</span>
                    <span className="text-cyan-800"> یک آزمون</span>
                </div>
            </div>

            {/* متن پایین */}
            <div className="mt-12 text-lg text-orange-600 whitespace-nowrap font-bold text-center z-10">
                <span> دسترسی به دوره‌های مهارتی متناسب با </span>
                <span className="text-orange-400">نتیجه آزمون</span>
            </div>
        </div>
    );
}