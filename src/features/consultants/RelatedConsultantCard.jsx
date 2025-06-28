import { FaStar, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import translate from "../../locale/translate";

export default function RelatedConsultantCard({ consultant }) {
    const navigate = useNavigate();

    const handleQuickReserve = (e) => {
        e.stopPropagation();
        navigate(`/consultants/${consultant.id}?tab=schedule`);
    };

    return (
        <div
            className="
                relative p-5 rounded-3xl overflow-hidden cursor-pointer
                bg-white/80 backdrop-blur-md shadow-xl border border-blue-100
                hover:shadow-2xl transition-all duration-300
                flex flex-col gap-4
                before:absolute before:inset-0 before:rounded-3xl
                before:bg-gradient-to-tr before:from-cyan-400 before:to-blue-600
                before:opacity-30 before:z-[-1]
            "
        >
            <div className="flex items-center gap-4">
                <img
                    src={consultant.avatar}
                    alt={consultant.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                    <h3 className="text-base font-semibold text-blue-900">{consultant.name}</h3>
                    <div className="flex items-center text-yellow-400 text-sm mt-1">
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
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-800">
                <FaBriefcase className="text-blue-400" />
                <span className="px-2 py-0.5 rounded-full bg-blue-100/60 text-blue-800 backdrop-blur">
                    {consultant.specialty}
                </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                <a
                    href={`/consultants/${consultant.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-sky-700 hover:underline font-medium"
                >
                    {translate.seeprofile}
                </a>
                <button
                    onClick={handleQuickReserve}
                    className="text-sm font-semibold px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg hover:brightness-110 transition"
                >
                    {translate.quickreserve}
                </button>
            </div>
        </div>
    );
}
