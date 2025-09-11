import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"
import { fetchTests } from "../../features/user/tests/testsSlice";
import { fetchTestDetails } from "../../features/user/tests/testDetailsSlice";
import IntroCard from "../../features/user/tests/components/IntroCard";
import Tabs from "../../components/tab/shared/Tabs";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import StickyActionsColumn from "../../features/user/tests/components/StickyActionsColumn";
import DetailsRowCards from "../../features/user/tests/components/DetailsRowCards";
import RelatedTestsSection from "../../components/tests/RelatedTestsSection";
import { useBreadcrumb } from "../../contexts/BreadcrumbContext";

export default function TestDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { tests, loading: testsLoading, error: testsError } = useSelector((store) => store.tests);
    const testDetailsState = useSelector((store) => store.testDetails.byTestId[id] || {
        testDetails: null,
        loading: false,
        error: null,
    });
    const { testDetails, loading: detailsLoading, error: detailsError } = testDetailsState;
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    const detailsRowRef = useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    // Fetch tests list for related tests section
    useEffect(() => {
        if (tests.length === 0) {
            dispatch(fetchTests());
        }
    }, [dispatch, tests.length]);

    // Fetch specific test details
    useEffect(() => {
        if (id && !testDetails && !detailsLoading) {
            dispatch(fetchTestDetails(id));
        }
    }, [dispatch, id, testDetails, detailsLoading]);
    
    // Set breadcrumb title when test is loaded
    useEffect(() => {
        if (testDetails) {
            setPageTitle(testDetails.title);
        }
        
        // Clean up when component unmounts
        return () => {
            clearPageTitle();
        };
    }, [testDetails, setPageTitle, clearPageTitle]);

    const loading = testsLoading || detailsLoading;
    const error = testsError || detailsError;
    const test = testDetails; // Use the specific test details instead of finding from array

    // Debug logging
    console.log('TestDetails Debug:', {
        id,
        testDetails,
        loading,
        error,
        test
    });

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
        <>
        <div className="px-4 md:px-12 flex flex-col lg:flex-row gap-6 items-start">
            {/* ستون سمت راست (محتوای اصلی) */}
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
                <IntroCard
                    title={test.title}
                    description={test.description}
                    shortDescription={test.ShortDescription}
                    imagepath={test.imagePath}
                    category={test.category}
                    tags={test.tags}
                    time={test.time}
                    participants={test.participants}
                    target_audience={test.target_audience}
                    suitableFor={test.suitableFor}
                    rating={test.rating}
                />
                <div className="lg:hidden block w-full lg:w-1/4">
                    <StickyActionsColumn test={test} onGoToReviews={handleGoToReviews} />
                </div>
                <DetailsRowCards ref={detailsRowRef} test={{ ...test, hideStart: true }} />
                <Tabs tabs={tabs} data={test} />
            </div>

            {/* ستون سمت چپ (استیکی اکشن‌ها) */}
            <div className="w-full hidden lg:block lg:w-1/4">
                <StickyActionsColumn test={test} onGoToReviews={handleGoToReviews} />
            </div>
        </div>

        {/* Related Tests Section - Full Width */}
        <RelatedTestsSection currentTest={test} allTests={tests} />
        </>
    )
}
