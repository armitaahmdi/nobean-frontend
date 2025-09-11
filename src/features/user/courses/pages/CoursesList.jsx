import CourseCard from "../components/CourseCard";

export default function CoursesList({ courses }) {
    return (
        <div className="rounded-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}