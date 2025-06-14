import translate from "../../locale/translate";
import { HiStar } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function ConsultantCard({ consultant }) {
    return (
        <div className="w-full max-w-md bg-[#ECF3FE] rounded-2xl shadow-md p-5 flex flex-col items-center text-center gap-3 border border-gray-100">
            <img
                src={consultant.avatar}
                alt={consultant.name}
                className="w-24 h-24 rounded-full object-cover shadow"
            />
            <div>
                <h2 className="text-lg font-bold">{consultant.name}</h2>
                <p className="text-sm text-gray-500">{consultant.specialty}</p>
            </div>
            {consultant.service && (
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FaLocationDot className="text-sm text-blue-500" />
                    <span className="font-medium">{consultant.service.type}</span>
                    {consultant.service.location !== "-" && (
                        <>
                            <span className="mx-1 text-gray-400">|</span>
                            <span className="text-gray-600">{consultant.service.location}</span>
                        </>
                    )}
                </p>

            )}

            <p className="text-sm text-gray-600 leading-6">{consultant.bio}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-700">
                <span className="flex gap-1">
                    <HiStar className="text-lightYellow text-[16px]" />
                    {consultant.rating}
                </span>
                <span className="flex gap-1">
                    <FaRegCommentDots />
                    {consultant.reviewsCount} {translate.comment}
                </span>
                <span className="flex gap-1">
                    <BsCalendarDate />
                    {consultant.sessionsDone} {translate.session}
                </span>
            </div>

            <div className="text-green-600 font-semibold">
                {consultant.price.toLocaleString()} {translate.toman}
            </div>
            {/* <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-[10px] text-sm hover:bg-blue-700 transition">
                {translate.reserveConsultants}
            </button> */}
            <Link to={`/consultants/${consultant.id}`}>
                <Button size="small" color="blue">
                    {translate.reserveConsultants}
                </Button>
            </Link>
        </div>
    );
}
