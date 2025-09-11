/* eslint-disable react-hooks/exhaustive-deps */
import { HiVideoCamera, HiDocumentDuplicate } from "react-icons/hi2";
import Button from "../../../../components/shared/Button";
import translate from "../../../../locale/translate";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function StickyActionsColumn({ test, onGoToReviews }) {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate(`/exam/${test.id}`);
    };

    const [isFixed, setIsFixed] = useState(false);
    const [width, setWidth] = useState(null)
    const ref = useRef();
    const tabRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (ref.current && !isFixed) {
                // Use getBoundingClientRect for more accurate width
                const rect = ref.current.getBoundingClientRect();
                setWidth(rect.width);
            }
        };
        
        // Set initial width after a small delay to ensure element is rendered
        const timer = setTimeout(updateWidth, 100);
        
        // Update width on resize
        window.addEventListener('resize', updateWidth);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateWidth);
        };
    }, [isFixed])

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

    return (
        <>
            <div ref={tabRef} />

            <div className="w-full relative">
                {/* نسخه دسکتاپ: همیشه fixed */}
                <div
                    ref={ref}
                    className={` hidden lg:flex flex-col items-center justify-center 
                    ${isFixed ? "fixed top-3 z-30 shadow-md " : ""}
                    bg-gradient-to-br from-lightBlue/5 via-white to-secondaryBlue/5 rounded-2xl border border-lightBlue/20 py-4 px-2 mb-4
                    transition-all duration-300`}
                    style={{ width: isFixed ? width : "auto" }}>
                    <h2 className="text-gray-900 text-xl font-bold mb-4 text-center">{test.title}</h2>

                    <div className="w-full flex justify-center">
                        <button className="w-3/4 glow-button bg-gradient-to-r from-lightBlue to-darkBlue text-white hover:from-darkBlue hover:to-lightBlue rounded-xl py-[12px] text-[16px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={handleStartClick}>
                            {translate.startfree}
                        </button>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center mt-8">
                        <button className="w-3/4 flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-lightBlue hover:bg-white border border-lightBlue/20 rounded-xl py-[12px] text-[16px] text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                            <HiDocumentDuplicate size={24} className="text-lightYellow" />
                            {translate.resumeSample}
                        </button>

                        <button className="w-3/4 flex items-center justify-center gap-2 mt-2 bg-white/80 backdrop-blur-sm text-lightBlue hover:bg-white border border-lightBlue/20 rounded-xl py-[12px] text-[16px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-semibold shadow-md hover:shadow-lg transition-all duration-300" >
                            <HiVideoCamera size={24} className="text-lightYellow" />
                            {translate.courseSample}
                        </button>
                    </div>
                    <button
                        onClick={onGoToReviews}
                        className="font-bold mt-2 text-darkYellow underline hover:text-blue-800 text-center"
                    >
                        {translate.submitComments}
                    </button>
                </div>

                {/* نسخه موبایل/تبلت */}
                <div className="lg:hidden w-full mt-6 p-4 flex flex-col md:flex-row-reverse md:items-start gap-6 overflow-hidden">
                    {/* دکمه شروع آزمون و عنوان */}
                    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-lightBlue/5 via-white to-secondaryBlue/5 rounded-2xl border border-lightBlue/20 mt-2 p-4 shadow-lg">
                        <h2 className="text-gray-900 text-xl font-bold text-center mb-2">{test.title}</h2>

                        <button
                            onClick={handleStartClick}
                            className="w-full glow-button bg-gradient-to-r from-lightBlue to-darkBlue text-white hover:from-darkBlue hover:to-lightBlue rounded-xl my-3 py-2 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {translate.startfree}
                        </button>

                        <button
                            onClick={onGoToReviews}
                            className="font-bold text-darkYellow hover:text-lightYellow mt-1 text-center transition-colors duration-300"
                        >
                            {translate.submitComments}
                        </button>
                    </div>

                     {/* دکمه‌های نمونه‌ها */}
                     <div className="flex flex-col gap-3 w-full">
                        <button className="w-full flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm text-lightBlue hover:bg-white border border-lightBlue/20 rounded-xl py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                            <HiDocumentDuplicate size={20} className="text-lightYellow" />
                            {translate.resumeSample}
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm text-lightBlue hover:bg-white border border-lightBlue/20 rounded-xl py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                            <HiVideoCamera size={20} className="text-lightYellow" />
                            {translate.courseSample}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
