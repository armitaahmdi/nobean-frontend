import { useRef, useEffect, useState } from "react";
import WebinarTabs from "./components/WebinarTabs";
import AboutSections from "./components/sections/AboutSections";
import FeaturesSection from "./components/sections/FeaturesSection";
import FaqTab from "../../components/tab/shared/FaqTab"
import CurriculumSection from "./components/sections/CurriculumSection"
import IntructorSection from "./components/sections/InstructorSection"
import PriceCard from "./components/PriceCard"

const tabs = [
    { id: "about", label: "درباره وبینار" },
    { id: "suitablefor", label: "برای چه کسانی ؟" },
    { id: "features", label: "ویژگی ها" },
    { id: "teacher", label: "مدرس" },
    { id: "curriculum", label: "سرفصل ها" },
    { id: "faq", label: "سوالات متداول" },
];

const faqData = [
    {
        question: "این وبینار برای چه کسانی مناسبه؟",
        answer: "برای والدین، معلمان، و مشاورانی که با کودکان دارای اختلال یادگیری سروکار دارند.",
    },
    {
        question: "آیا امکان دریافت فایل ضبط‌شده وبینار وجود دارد؟",
        answer: "بله، فایل ضبط‌شده پس از برگزاری در اختیار شرکت‌کنندگان قرار می‌گیرد.",
    },
    {
        question: "وبینار چقدر طول می‌کشه؟",
        answer: "مدت زمان وبینار حدود ۹۰ دقیقه است.",
    },
];

export default function WebinarPage({ priceRef }) {
    const [activeTab, setActiveTab] = useState("about");
    const isFirstLoad = useRef(true);

    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const faqRef = useRef(null);
    const teacherRef = useRef(null);
    const curriculumRef = useRef(null);
    const suitableRef = useRef(null);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        const refs = {
            about: aboutRef,
            suitablefor: suitableRef,
            features: featuresRef,
            faq: faqRef,
            teacher: teacherRef,
            curriculum: curriculumRef,
        };

        const selectedRef = refs[activeTab];
        if (selectedRef?.current) {
            const offsetTop = selectedRef.current.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    }, [activeTab]);

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-20 px-4">
            <WebinarTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-6 space-y-20">
                <div>
                    <AboutSections suitableRef={suitableRef} aboutRef={aboutRef} />
                </div>
                <div ref={featuresRef}>
                    <FeaturesSection />
                </div>
                <div ref={teacherRef}>
                    <IntructorSection />
                </div>
                <div ref={curriculumRef}>
                    <CurriculumSection />
                </div>
                <div className="max-w-7xl" ref={faqRef}>
                    <h2 className="text-2xl font-bold text-center mb-8">
                        سؤالات متداول
                    </h2>
                    <FaqTab faq={faqData} />
                </div>
                <div ref={priceRef}>
                    <PriceCard />
                </div>
            </div>
        </div>
    );
}