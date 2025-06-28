import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"
import { fetchTests } from "../features/tests/testsSlice";
import IntroCard from "../components/card/IntroCard";
import Tabs from "../components/tab/Tabs";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import StickyActionsColumn from "../components/card/StickyActionsColumn";
import DetailsRowCards from "../components/card/DetailsRowCards";

export default function TestDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { tests, loading, error } = useSelector((store) => store.tests);
    const detailsRowRef = useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (tests.length === 0) {
            dispatch(fetchTests());
        }
    }, [dispatch, tests.length]);


    const test = tests.find((i) => i.id === +id);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;
    if (!test) return <p>آزمون مورد نظر پیدا نشد.</p>;

    const handleGoToReviews = () => {
        setSearchParams({ tab: "reviews" });
        setTimeout(() => {
            const el = document.getElementById("submit-comment");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 150);
    };

    const tabs = [
        {
            id: "description",
            label: "توضیحات",
            key: "description",
        },
        {
            id: "validity",
            label: "اعتبار آزمون",
            key: "validity",
        },
        {
            id: "comments",
            label: "نظرات",
            key: "reviews",
        },
        {
            id: "faq",
            label: "پرسش‌های متداول",
            key: "faq",
        },
    ];

    return (
        <div className="px-4 md:px-12 flex flex-col lg:flex-row-reverse gap-6">
            <div className="hidden lg:block w-full lg:w-1/4">
                <StickyActionsColumn test={test} onGoToReviews={handleGoToReviews}
                    detailsRowRef={detailsRowRef}
                />
            </div>

            <div className="w-full lg:w-3/4 flex flex-col gap-6">
                <IntroCard
                    title={test.title}
                    description={test.description}
                    image={test.image}
                    category={test.category}
                    tags={test.tags}
                />
                <div className="block lg:hidden w-full lg:w-1/4">
                    <StickyActionsColumn test={test} onGoToReviews={handleGoToReviews} />
                </div>
                <DetailsRowCards ref={detailsRowRef} tests={{ ...test, hideStart: true }} />
                <Tabs tabs={tabs} data={test} />
            </div>
        </div>
    )
}
