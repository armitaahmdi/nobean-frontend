/* eslint-disable react-hooks/exhaustive-deps */
import { HiVideoCamera, HiDocumentDuplicate } from "react-icons/hi2";
import Button from "../Button";
import translate from "../../locale/translate";
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
        if (ref.current) {
            setWidth(ref.current.offsetWidth)
        }
    }, [])

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
                    ${isFixed ? "fixed top-3 z-40 shadow-md " : ""}
                    bg-white rounded-[20px]  border-gray-200 py-4 px-2 mb-4
                    transition-all duration-300`}
                    style={{ width: isFixed ? width : "auto" }}>
                    <h2 className="text-gray-900 text-xl font-bold mb-4 text-center">{test.title}</h2>

                    <div className="w-full flex justify-center">
                        <button className="w-3/4 bg-lightBlue text-white hover:bg-darkBlue rounded-[10px] py-[12px] text-[16px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold"
                            onClick={handleStartClick}>
                            {translate.startfree}
                        </button>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center mt-8">
                        <button className="w-3/4 flex items-center justify-center gap-2 bg-lightBlue text-white hover:bg-darkBlue rounded-[10px] py-[12px] text-[16px] text-center font-bold">
                            <HiDocumentDuplicate size={24} className="text-lightYellow" />
                            {translate.resumeSample}
                        </button>

                        <button className="w-3/4 flex items-center justify-center gap-2 mt-2 bg-lightBlue text-white hover:bg-darkBlue rounded-[10px] py-[12px] text-[16px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold" >
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
                            className="font-bold text-darkYellow underline hover:text-blue-800 mt-1 text-center"
                        >
                            {translate.submitComments}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
