import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar, FaUsers, FaClock, FaArrowLeft, FaFire } from "react-icons/fa";

export default function PopularTestsSection({ onViewAllTests }) {
    const { tests } = useSelector((store) => store.tests);

    // Get top 3 most popular tests based on participants, rating, and completion rate
    const popularTests = [...tests]
        .sort((a, b) => {
            const scoreA = (a.participants || 0) * 0.5 + (a.rating || 4.5) * 20 + (a.completionRate || 80) * 0.3;
            const scoreB = (b.participants || 0) * 0.5 + (b.rating || 4.5) * 20 + (b.completionRate || 80) * 0.3;
            return scoreB - scoreA;
        })
        .slice(0, 3);

    const getBadgeColor = (targetAudience) => {
        const colors = {
            "ویژه والدین و فرزندان": "bg-gradient-to-r from-blue-500 to-indigo-600",
            "ویژه والدین": "bg-gradient-to-r from-green-500 to-emerald-600", 
            "ویژه فرزندان": "bg-gradient-to-r from-purple-500 to-pink-600",
            "ویژه خانواده": "bg-gradient-to-r from-orange-500 to-red-600"
        };
        return colors[targetAudience] || "bg-gradient-to-r from-gray-500 to-gray-600";
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FaFire className="w-8 h-8 text-orange-500" />
                    <h2 className="text-3xl font-bold text-gray-900">
                        آزمون‌های محبوب
                    </h2>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    آزمون‌هایی که بیشترین استفاده و رضایت کاربران را داشته‌اند
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularTests.map((test, index) => (
                    <div
                        key={test.id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                    >
                        {/* Popularity Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <FaFire className="w-3 h-3" />
                                #{index + 1}
                            </div>
                        </div>

                        {/* Test Image */}
                        <div className="relative h-40 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                            <img 
                                src={test.imagepath} 
                                alt={test.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Target Audience Badge */}
                            <div className="mb-3">
                                <span className={`${getBadgeColor(test.target_audience)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                    {test.target_audience}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {test.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                {test.description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <FaUsers className="w-4 h-4" />
                                        <span>{(test.participants || 0).toLocaleString('fa-IR')}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock className="w-4 h-4" />
                                        <span>{test.time || '30'} دقیقه</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <FaStar className="w-4 h-4" />
                                    <span className="text-sm font-medium">{test.rating || '4.8'}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link
                                to={`/tests/${test.id}`}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                <span>شروع آزمون</span>
                                <FaArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
                <button
                    onClick={onViewAllTests}
                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                >
                    <span>مشاهده همه آزمون‌ها</span>
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
