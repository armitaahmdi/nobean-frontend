import { useSelector } from "react-redux";
import boy from "../../../assets/images/categoryIcons/homePageIcons/boy.png";
import children from "../../../assets/images/categoryIcons/homePageIcons/children.png";
import family from "../../../assets/images/categoryIcons/homePageIcons/family.png";
import parents from "../../../assets/images/categoryIcons/homePageIcons/parents.png";
import { Link } from "react-router-dom";
import translate from "../../../locale/translate";

export default function CategoryCardsSection() {
    const exams = useSelector((store) => store.tests);
    const courses = useSelector((store) => store.courses);

    const countExamsByTarget = (target) => exams?.tests?.filter((e) => e.target_audience === target).length || 0;
    const countCoursesByTarget = (target) => courses?.courses?.filter((c) => c.target_audience === target).length || 0;

    console.log("exams in Redux store:", exams);
    console.log("courses in Redux store:", courses);

    const cards = [
        {
            title: "آزمون های ویژه فرزندان",
            count: countExamsByTarget("ویژه فرزندان"),
            image: children,
            filterValue: "ویژه فرزندان",
            link: "/tests",
        },
        {
            title: "آزمون های ویژه والدین",
            count: countExamsByTarget("ویژه والدین"),
            image: family,
            filterValue: "ویژه والدین",
            link: "/tests",
        },
        {
            title: "دوره های ویژه فرزندان",
            count: countCoursesByTarget("ویژه فرزندان"),
            image: boy,
            filterValue: "ویژه فرزندان",
            link: "/courses",
        },
        {
            title: "دوره های ویژه والدین",
            count: countCoursesByTarget("ویژه والدین"),
            image: parents,
            filterValue: "ویژه والدین",
            link: "/courses",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="flex items-center justify-center gap-3 relative text-xl font-bold text-gray-800 mb-10">
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                <span>{translate.specialCategory}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
                    >
                        <img src={card.image} alt={card.title} className="w-16 h-16 object-contain" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">{card.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">{card.count} مورد</p>
                        <Link
                            to={`${card.link}?target_audience=${encodeURIComponent(card.filterValue)}`}
                            className="mt-4 px-5 py-2 bg-darkBlue text-white rounded-2xl hover:bg-blue-700 transition-colors duration-300"
                        >
                            {translate.see}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}