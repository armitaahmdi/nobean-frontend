import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsultants } from "../../../features/user/consultants/consultantsSlice";
import { FaStar, FaCrown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import translate from "../../../locale/translate";
import { FaLocationDot } from "react-icons/fa6";

function ConsultantCard({ consultant, featured }) {
    const navigate = useNavigate();

    return (
        <div
            className={`
                relative
                bg-white 
                rounded-2xl 
                shadow-md 
                p-5 
                flex flex-col 
                transition-shadow duration-300 
                hover:shadow-lg
                h-full
                border border-gray-200
            `}
        >
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={consultant.avatar}
                    alt={consultant.name}
                    className={`rounded-full shadow-md object-cover ${featured ? "w-24 h-24" : "w-16 h-16"}`}
                />
                <div>
                    <h3 className={`font-semibold ${featured ? "text-xl" : "text-lg"} text-gray-900`}>
                        {consultant.name}
                    </h3>
                    <p className="text-sm text-gray-500">{consultant.specialty}</p>
                    <div className="flex items-center gap-1 text-yellow-400 mt-1">
                        <FaStar />
                        <span className="text-sm font-semibold text-gray-800">
                            {consultant.rating?.toFixed(1)} / ۵
                        </span>
                        <span className="text-xs text-gray-400 ml-2">({consultant.reviewsCount} نظر)</span>
                    </div>
                </div>
            </div>

            {featured && (
                <>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-4 text-justify">
                        {consultant.description}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1 mt-auto">
                        <p>
                            <strong>{translate.Expertise}:</strong> {consultant.specialty}
                        </p>
                        <p>
                            <strong>{translate.servicetype}:</strong> {consultant.service.type}
                        </p>
                        <p className="flex">
                            <strong> <FaLocationDot /> </strong> {consultant.service.location}
                        </p>
                        <p>
                            <strong>{translate.workhours}:</strong> {consultant.service.workHours}
                        </p>
                        <p>
                            <strong>{translate.sessionPrice}:</strong> {consultant.price.toLocaleString()} تومان
                        </p>
                    </div>
                </>
            )}

            {/* دکمه آیکون فلش پایین سمت چپ */}
            <button
                onClick={() => navigate(`/consultants/${consultant.id}`)}
                className="absolute bottom-0 left-0 bg-cyan-600 text-white rounded-tr-xl rounded-bl-xl p-3 shadow-lg hover:bg-cyan-800 transition"
                title="مشاهده پروفایل"
                aria-label="مشاهده پروفایل"
            >
                <FaArrowLeft />
            </button>

        </div>
    );
}

export default function TopConsultantsSection() {
    const dispatch = useDispatch();
    const { consultants, loading, error } = useSelector((state) => state.consultants);

    useEffect(() => {
        if (!consultants || consultants.length === 0) {
            dispatch(fetchConsultants());
        }
    }, [consultants, dispatch]);

    if (loading) return <div>در حال بارگذاری...</div>;
    if (error) return <div>خطا در بارگذاری اطلاعات مشاوران</div>;
    if (!consultants || consultants.length === 0) return <div>مشاوری یافت نشد.</div>;

    const sortedConsultants = [...consultants].sort((a, b) => b.rating - a.rating);
    const topConsultant = sortedConsultants[0];
    const suggestedConsultants = sortedConsultants.slice(1, 5);

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="flex items-center justify-center gap-3 relative text-xl font-bold text-gray-800 mb-10">
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                <span>{translate.bestConsultants}</span>
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
            </h2>
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                <div className="w-full lg:w-1/3">
                    <div className="bg-indigo-50 p-6 rounded-3xl shadow-lg h-full flex flex-col">
                        <h3 className="text-lg font-semibold text-center mb-6 text-indigo-600 flex items-center justify-center gap-2">
                            <FaCrown /> {translate.bestConsultantsOfMonth}
                        </h3>
                        <ConsultantCard consultant={topConsultant} featured />
                    </div>
                </div>

                <div className="w-full lg:w-2/3">
                    <h3 className="text-lg font-semibold mb-6 text-gray-700 text-center md:text-right">
                        {translate.suggestconsultants}
                    </h3>
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-6
                            auto-rows-fr">
                        {suggestedConsultants.map((c, i) => (
                            <ConsultantCard key={c.id} consultant={c} crown={!i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
