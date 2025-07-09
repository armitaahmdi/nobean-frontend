import { FaStar, FaUsers, FaCreditCard } from "react-icons/fa";
import ConsultantTags from "../components/ConsultantTags";
import translate from "../../../locale/translate";

const ConsultantProfile = ({ consultant }) => {
  if (!consultant) return null;

  return (
    <div
      className="
        bg-white [box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_-20px_25px_-5px_rgba(0,0,0,0.1)] rounded-2xl
        p-4 sm:p-6
        flex flex-col sm:flex-row sm:items-start
        gap-4 sm:gap-6
        max-w-full
        overflow-hidden
      "
    >
      <div
        className="
          flex-shrink-0
          w-24 h-24 sm:w-32 sm:h-32
          rounded-full border-2 border-gray-200
          overflow-hidden
          mx-auto sm:mx-0
          hover:scale-105 transition-transform duration-300
        "
      >
        <img
          src={consultant.avatar}
          alt={consultant.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 w-full overflow-hidden space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
          <span className="break-words">{consultant.name}</span>
          <span className="text-sm text-gray-500">({consultant.gender})</span>
        </h2>

        <p className="text-primary font-medium break-words">{consultant.specialty}</p>
        <p className="text-sm text-gray-500 break-words">{consultant.scientificDegree}</p>
        <p className="text-sm text-gray-500 break-words">
          {translate.servicetype}: {consultant.service.type}
          {consultant.service.location !== "-" ? ` - ${consultant.service.location}` : ""}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mt-2 break-words">
          {consultant.bio}
        </p>

        <ConsultantTags tags={consultant.tags} />

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {consultant.rating} ({consultant.reviewsCount} {translate.comment})
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-blue-500" />
            {consultant.sessionsDone} {translate.session}
          </div>
          <div className="flex items-center gap-1">
            <FaCreditCard className="text-green-500" />
            {consultant.price.toLocaleString()} {translate.toman}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
