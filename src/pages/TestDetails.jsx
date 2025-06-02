import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"
import { fetchTests } from "../features/tests/testsSlice";
import IntroCard from "../components/card/IntroCard";
import Tabs from "../components/tab/Tabs";

export default function TestDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { tests, loading, error } = useSelector((store) => store.tests);

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (tests.length === 0) {
            dispatch(fetchTests());
        }
    }, [dispatch, tests.length]);


    const test = tests.find((i) => i.id === +id);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا در دریافت اطلاعات: {error}</p>;
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
        <div className="px-4 md:px-12">
            <IntroCard
                title={test.title}
                description={test.description}
                image={test.image}
                category={test.category}
                tests={test} 
                onGoToReviews={handleGoToReviews}
            />

            <div className="mt-10">
                <Tabs tabs={tabs} data={test} />
            </div>
        </div>
    )
}
