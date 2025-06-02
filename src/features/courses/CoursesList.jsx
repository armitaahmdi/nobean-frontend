import CourseCard from "./CourseCard";

export default function CoursesList({ courses }) {
    return (
        <div className="bg-white rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}