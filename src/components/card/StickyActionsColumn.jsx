import { useEffect, useState, useRef } from "react";
import { HiVideoCamera, HiDocumentDuplicate } from "react-icons/hi2";
import Button from "../Button";
import translate from "../../locale/translate";
import { useNavigate } from "react-router-dom";

export default function StickyActionsColumn({ test, onGoToReviews, detailsRowRef }) {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    const [offsetBottom, setOffsetBottom] = useState(0);
    const [isSticky, setIsSticky] = useState(true);
    // const fixedRight = "calc(100% - 520px)";
    const [dynamicTop, setDynamicTop] = useState(520);

    const handleStartClick = () => {
        navigate(`/exam/${test.id}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            const marker = document.getElementById("tabs-end-marker");
            const container = containerRef.current;
            const wrapper = wrapperRef.current;
            if (!marker || !container || !wrapper) return;

            const markerTopInPage = marker.getBoundingClientRect().top + window.scrollY;
            const containerHeight = container.offsetHeight;
            const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
            const stickyLimit = markerTopInPage - containerHeight - dynamicTop;
            const bottomMargin = -50;

            // محاسبه موقعیت کامپوننت DetailsRowCards
            let detailsRowTop = 0;
            if (detailsRowRef && detailsRowRef.current) {
                detailsRowTop = detailsRowRef.current.getBoundingClientRect().top + window.scrollY;
                setDynamicTop(detailsRowTop); // به‌روزرسانی top برای sticky
            }

            if (window.scrollY >= stickyLimit) {
                setIsSticky(false);
                setOffsetBottom(markerTopInPage - wrapperTop - containerHeight + bottomMargin);
            } else {
                setIsSticky(true);
                setOffsetBottom(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [detailsRowRef, dynamicTop]);

    return (
        <div ref={wrapperRef} className="w-full relative">
            {/* نسخه دسکتاپ */}
            <div className="hidden lg:flex flex-col gap-3 items-stretch mb-[120px]">
                <Button
                    size="xlarge"
                    color="blue"
                    buttonClassName="border border-gray-300 hover:border-blue-500 transition-colors"
                >
                    <HiDocumentDuplicate size={24} className="text-lightYellow" />
                    {translate.resumeSample}
                </Button>

                <Button
                    size="xlarge"
                    color="blue"
                    buttonClassName="border border-gray-300 hover:border-blue-500 transition-colors"
                >
                    <HiVideoCamera size={24} className="text-lightYellow" />
                    {translate.courseSample}
                </Button>
            </div>

            {/* <div
                ref={containerRef}
                className="hidden lg:flex flex-col gap-4 items-center"
                style={{
                    position: isSticky ? "fixed" : "absolute",
                    top: isSticky ? `${dynamicTop}px` : `${offsetBottom}px`,
                    right: isSticky ? fixedRight : "auto",
                    width: "300px",
                    zIndex: 50,
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "1rem",
                }}
            > */}
            <div
                ref={containerRef}
                className={`hidden lg:flex flex-col gap-4 items-center ${isSticky ? "fixed" : "absolute"
                    } `}
                style={{
                    top: isSticky ? `${dynamicTop}px` : `${offsetBottom}px`,
                    width: "300px",
                    zIndex: 50,
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "1rem",
                }}
            >

                <h2 className="text-gray-900 text-xl font-bold mb-4 text-center">{test.title}</h2>
                <Button size="xlarge" color="blue" onClick={handleStartClick}>
                    {translate.startfree}
                </Button>
                <button
                    onClick={onGoToReviews}
                    className="font-bold text-darkYellow underline hover:text-blue-800 mt-1 text-center"
                >
                    {translate.submitComments}
                </button>
            </div>

            {/* نسخه تبلت و موبایل */}
            <div className="lg:hidden w-full mt-6  p-4 flex flex-col md:flex-row-reverse md:items-start gap-6 overflow-hidden">

                {/* دکمه‌های نمونه‌ها */}
                <div className="flex flex-col gap-3 w-full">
                    <Button
                        size="xlarge"
                        color="blue"
                        buttonClassName="border border-gray-300 hover:border-blue-500 transition-colors w-full"
                    >
                        <HiDocumentDuplicate size={24} className="text-lightYellow" />
                        {translate.resumeSample}
                    </Button>
                    <Button
                        size="xlarge"
                        color="blue"
                        buttonClassName="border border-gray-300 hover:border-blue-500 transition-colors w-full"
                    >
                        <HiVideoCamera size={24} className="text-lightYellow" />
                        {translate.courseSample}
                    </Button>
                </div>

                {/* دکمه شروع آزمون و عنوان */}
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-[20px] mt-2 p-4 shadow-md">
                    <h2 className="text-gray-900 text-xl font-bold text-center mb-2">{test.title}</h2>

                    <Button
                        size="xlarge"
                        color="blue"
                        onClick={handleStartClick}
                        className="w-full"
                    >
                        {translate.startfree}
                    </Button>

                    <button
                        onClick={onGoToReviews}
                        className="font-bold text-darkYellow underline hover:text-blue-800 mt-2 text-sm text-center"
                    >
                        {translate.submitComments}
                    </button>
                </div>
            </div>

        </div>
    );
}

