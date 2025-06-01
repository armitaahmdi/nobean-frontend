import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchTests } from "../features/tests/testsSlice";
import IntroCard from "../components/card/IntroCard";


export default function TestDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { tests, loading, error } = useSelector((store) => store.tests);

    useEffect(() => {
        if (tests.length === 0) {
            dispatch(fetchTests());
        }
    }, [dispatch, tests.length]);


    const test = tests.find((i) => i.id === +id);
    console.log(test);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا در دریافت اطلاعات: {error}</p>;
    if (!test) return <p>آزمون مورد نظر پیدا نشد.</p>;

    return (
        <div>
            <IntroCard
                title={test.title}
                description={test.description}
                image={test.image}
                category={test.category}
                tests={test}
            />
        </div>
    )
}
