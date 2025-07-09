import translate from "../../../locale/translate";
import { HiStar } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Button from "../../../components/shared/Button";
import { Link } from "react-router-dom";

export default function ConsultantCard({ consultant }) {
    return (
        <div className="w-full max-w-md bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center gap-4 transition-transform duration-300 hover:-translate-y-1">
            <img
                src={consultant.avatar}
                alt={consultant.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <div>
                <h2 className="text-xl font-bold text-gray-800">{consultant.name}</h2>
                <p className="text-sm text-gray-500">{consultant.specialty}</p>
            </div>

            {consultant.service && (
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <FaLocationDot className="text-[#4286F5]" />
                    <span className="font-medium">{consultant.service.type}</span>
                    {consultant.service.location !== "-" && (
                        <>
                            <span className="mx-1 text-gray-400">|</span>
                            <span>{consultant.service.location}</span>
                        </>
                    )}
                </p>
            )}

            <p className="text-sm text-gray-700 leading-6">{consultant.bio}</p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-700">
                <span className="flex items-center gap-1">
                    <HiStar className="text-[#F7BC2D]" />
                    {consultant.rating}
                </span>
                <span className="flex items-center gap-1">
                    <FaRegCommentDots />
                    {consultant.reviewsCount} {translate.comment}
                </span>
                <span className="flex items-center gap-1">
                    <BsCalendarDate />
                    {consultant.sessionsDone} {translate.session}
                </span>
            </div>

            <div className="text-[#5DA954] font-semibold text-sm">
                {consultant.price.toLocaleString()} {translate.toman}
            </div>

            <Link to={`/consultants/${consultant.id}`}>
                <Button size="small" color="blue">
                    {translate.reserveConsultants}
                </Button>
            </Link>
        </div>

    );
}
