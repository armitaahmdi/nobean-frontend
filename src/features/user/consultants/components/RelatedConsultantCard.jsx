import { FaStar, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import translate from "../../../../locale/translate";

export default function RelatedConsultantCard({ consultant }) {
    const navigate = useNavigate();
     if (!consultant) return null;

    const handleQuickReserve = (e) => {
        e.stopPropagation();
        navigate(`/consultants/${consultant.id}?tab=schedule`);
    };

    return (
        <div
            className="
          p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 transition-all
          shadow-md hover:shadow-lg cursor-pointer flex flex-col gap-4
          border border-sky-100
          sm:flex-row sm:items-center sm:gap-6"
        >
            <img
                src={consultant.avatar}
                alt={consultant.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md mx-auto sm:mx-0"
            />

            <div className="flex-1 flex flex-col gap-2 text-center sm:text-right">
                <h3 className="text-base font-semibold text-sky-900">{consultant.name}</h3>

                <div className="flex justify-center sm:justify-start items-center text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`mr-0.5 ${i < Math.round(consultant.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="ml-2 text-gray-600 text-xs">
                        {consultant.rating?.toFixed(1) || "–"}
                    </span>
                </div>

                <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-blue-800">
                    <FaBriefcase className="text-blue-500" />
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">
                        {consultant.specialty}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 mt-2 border-t border-blue-100">
                    <a
                        href={`/consultants/${consultant.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-sky-700 hover:underline font-medium"
                    >
                        {translate.seeprofile}
                    </a>
                    <button
                        onClick={handleQuickReserve}
                        className="text-sm font-semibold px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow hover:brightness-110 transition"
                    >
                        {translate.quickreserve}
                    </button>
                </div>
            </div>
        </div>
    );
}
