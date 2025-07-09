import { FaGraduationCap, FaUserTie, FaClock } from "react-icons/fa";

export default function AboutTab({ consultant }) {
    if (!consultant) return <p className="text-center text-gray-400 italic mt-10">داده‌ای موجود نیست.</p>;

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-tr from-white to-blue-50 rounded-3xl shadow-xl p-8 md:p-12 text-gray-800">

            {/* نام و تخصص */}
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-darkBlue mb-1">{consultant.name}</h2>
                <p className="text-md md:text-lg text-gray-600">{consultant.specialty || "-"}</p>
            </div>

            {/* توضیحات */}
            <p className="text-justify text-gray-700 leading-relaxed mb-8 md:text-lg">
                {consultant.description || "توضیحی موجود نیست."}
            </p>

            {/* جزئیات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-default">
                    <FaUserTie className="mx-auto mb-3 text-blue-600 text-3xl drop-shadow" />
                    <h4 className="text-sm text-gray-400 mb-1">تخصص</h4>
                    <p className="font-semibold text-lg text-gray-800">{consultant.specialty || "-"}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-default">
                    <FaGraduationCap className="mx-auto mb-3 text-blue-600 text-3xl drop-shadow" />
                    <h4 className="text-sm text-gray-400 mb-1">مدرک تحصیلی</h4>
                    <p className="font-semibold text-lg text-gray-800">{consultant.scientificDegree || "-"}</p>
                </div>

                {consultant.yearsOfExperience && (
                    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-default">
                        <FaClock className="mx-auto mb-3 text-blue-600 text-3xl drop-shadow" />
                        <h4 className="text-sm text-gray-400 mb-1">تجربه کاری</h4>
                        <p className="font-semibold text-lg text-gray-800">{consultant.yearsOfExperience} سال</p>
                    </div>
                )}
            </div>
        </div>
    );
}
