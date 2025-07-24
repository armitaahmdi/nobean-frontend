import { Link } from "react-router-dom";
import { FaUserAlt, FaClock, FaStar } from "react-icons/fa";
import translate from "../../../locale/translate";

export default function PopularCardItems({ item, type }) {
    const {
        id,
        image,
        title,
        participants,
        rating,
        price,
        category,
        description,
    } = item;

    const isCourse = type === "course";

    return (
        <Link
            to={`/${isCourse ? "courses" : "tests"}/${id}`}
            className="bg-gradient-to-tr from-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col group cursor-pointer border border-transparent hover:border-blue-300"
        >
            <div className="relative h-44 w-full overflow-hidden rounded-2xl mb-5">
                <img
                    src={image || "/default-image.png"}
                    alt={title}
                    className="object-cover w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />
                {price === 0 && isCourse && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {translate.free}
                    </span>
                )}
            </div>

            {category && (
                <span className="inline-block text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full mb-3 font-semibold select-none">
                    {category}
                </span>
            )}

            <h3 className="text-base sm:text-lg font-extrabold text-blue-900 line-clamp-2 mb-3 group-hover:text-blue-700 transition-colors">
                {title}
            </h3>

            {isCourse && description && (
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-5 leading-relaxed">
                    {description}
                </p>
            )}

            <div className="text-sm text-gray-700 space-y-3 mb-5">
                <div className="flex items-center gap-3">
                    <FaUserAlt className="text-blue-500" />
                    <span>{participants?.toLocaleString()} {translate.participants}</span>
                </div>
                <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400" />
                    <span>{rating || 0} از ۵</span>
                </div>
            </div>

            {isCourse ? (
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-md font-extrabold text-green-700">
                        {price === 0 ? "رایگان" : `${price.toLocaleString()} تومان`}
                    </span>
                    <span className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 rounded-full shadow-md transition duration-300 select-none">
                        {translate.seeCourse}
                    </span>
                </div>
            ) : (
                <div className="text-sm mt-auto text-blue-600 font-bold text-center hover:underline hover:text-blue-800 transition select-none">
                    {translate.seeExam}
                </div>
            )}
        </Link>
    );
}
