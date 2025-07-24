import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PopularCardItems from "./PopularCardItems";
import translate from "../../../locale/translate";

function SectionTitle({ title, to }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            {to && (
                <Link
                    to={to}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {translate.seeAll}
                </Link>
            )}
        </div>
    );
}

export default function PopularItemsSection() {
    const exams = useSelector((state) => state.tests.tests || []);
    const courses = useSelector((state) => state.courses.courses || []);

    const popularExams = [...exams]
        .sort((a, b) => (b.participants || 0) - (a.participants || 0))
        .slice(0, 4);

    const popularCourses = [...courses]
        .sort((a, b) => (b.participants || 0) - (a.participants || 0))
        .slice(0, 4);

    return (
        <section className="max-w-7xl mx-auto px-4 py-14 space-y-16">
            <div>
                <SectionTitle title="آزمون‌های محبوب" to="/tests" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {popularExams.map((exam) => (
                        <PopularCardItems key={exam.id} item={exam} type="exam" />
                    ))}
                </div>
            </div>

            <div>
                <SectionTitle title="دوره‌های محبوب" to="/courses" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {popularCourses.map((course) => (
                        <PopularCardItems key={course.id} item={course} type="course" />
                    ))}
                </div>
            </div>
        </section>
    );
}