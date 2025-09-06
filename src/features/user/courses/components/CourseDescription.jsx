import CourseHighlights from './CourseHighlights';
import { HiOutlineDocumentText, HiOutlineLightBulb } from 'react-icons/hi';
import CourseInstructorCard from './CourseInstructorCard';
import ReviewsCard from "../../../../components/reviews/ReviewsCard"
import messageIcon from "../../../../assets/images/icons/chat.png"
import teacherIcon from "../../../../assets/images/icons/teacher.png"

export default function CourseDescription({ course }) {
    if (!course) return null;

    return (
        <div className="mt-16 max-w-7xl mx-auto px-4 space-y-16">
            {/* توضیحات اصلی دوره */}
            <section className="bg-blue-50 p-6 md:p-10 rounded-2xl shadow-sm border-r-4 border-blue-400">
                <div className="flex items-center gap-3 mb-6">
                    <HiOutlineDocumentText className="text-blue-500 text-2xl" />
                    <h2 className="text-2xl font-semibold text-gray-800">درباره دوره</h2>
                </div>
                <p className="text-gray-700 leading-8 text-justify text-base sm:text-lg">
                    {course.mainDesc}
                </p>
            </section>

            {/* هایلایت‌ها */}
            <section className="bg-white p-6 md:p-10 rounded-2xl shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <HiOutlineLightBulb className="text-yellow-500 text-2xl" />
                    <h2 className="text-2xl font-semibold text-gray-800">نکات برجسته دوره</h2>
                </div>
                <CourseHighlights highlights={course.courseHighlights} />
            </section>

            <div>
                <h1 className='text-2xl flex items-center font-semibold text-gray-800 mb-6'>
                    <img className='w-8 ml-2' src={teacherIcon} />
                    از چه کسی یاد میگیرید‌؟
                </h1>
                <CourseInstructorCard course={course} />
            </div>

            {/* کامپوننت نظرات */}
            <div className="mt-16">
                <h2 className="text-2xl flex items-center font-bold text-gray-800 mb-6">
                    <img className='w-12 ml-2' src={messageIcon} />
                    نظرات شما
                </h2>
                <ReviewsCard reviews={course.reviews} />
            </div>
        </div>
    );
}
