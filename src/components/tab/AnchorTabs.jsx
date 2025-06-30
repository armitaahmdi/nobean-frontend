/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const tabs = [
    { id: "about", label: "درباره" },
    { id: "schedule", label: "زمان‌بندی" },
    { id: "location", label: "آدرس مطب" },
    { id: "reviews", label: "نظرات" },
];

export default function AnchorTabs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFixed, setIsFixed] = useState(false);
    const tabRef = useRef(null);

    const activeTab = searchParams.get("tab") || "about";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFixed(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "0px 0px 0px 0px",
            }
        );

        if (tabRef.current) {
            observer.observe(tabRef.current);
        }

        return () => {
            if (tabRef.current) observer.unobserve(tabRef.current);
        };
    }, []);

    const handleClick = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setSearchParams({ tab: id });
    };

    return (
        <>
            {/* Sentinel برای شروع تب */}
            <div ref={tabRef} />

            <nav
                className={`
          ${isFixed ? "fixed top-0 left-0 w-full z-40 shadow-md" : ""}
          bg-white rounded-t-[20px] border-b border-gray-200 py-4 px-2 mb-4
          transition-all duration-300
        `}
            >
                <div className="flex gap-4 overflow-x-auto scrollbar-hide max-w-screen-xl mx-auto justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleClick(tab.id)}
                            className={`
                                text-sm md:text-base whitespace-nowrap font-semibold transition
                                px-3 py-1.5 rounded-md
                                ${activeTab === tab.id
                                    ? "text-darkBlue border-b-2 border-darkBlue"
                                    : "text-gray-600 hover:text-darkBlue border-b-2 border-transparent hover:border-darkBlue"
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
