import moment from "moment-jalaali";
import { FaClock } from "react-icons/fa";
import translate from "../../../../locale/translate";

function QuickReserveCard({ schedule, onOpenScheduleTab }) {
  if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white rounded-2xl shadow-xl p-6 max-w-xs border border-blue-200">
        {translate.noschadule}
      </div>
    );
  }
  const now = moment();

  const firstAvailable = schedule
    .flatMap((day) =>
      day.slots
        .map((slot) => ({
          date: day.date,
          time: slot.time ?? slot,
          reserved: slot.reserved ?? false,
        }))
        .filter((slot) => {
          if (slot.reserved) return false;
          const slotDateTime = moment(slot.date + " " + slot.time, "jYYYY-jMM-jD HH:mm");
          return slotDateTime.isAfter(now);
        })
    )
    .sort((a, b) => {
      const aTime = moment(a.date + " " + a.time, "jYYYY-jMM-jD HH:mm");
      const bTime = moment(b.date + " " + b.time, "jYYYY-jMM-jD HH:mm");
      return aTime - bTime;
    })[0];

  const handleReserve = () => {
    if (firstAvailable) {
      onOpenScheduleTab();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white rounded-2xl shadow-xl p-6 max-w-xs border border-blue-200">
      <h3 className="text-2xl font-extrabold mb-5 text-blue-900 flex items-center gap-3">
        <FaClock className="text-blue-700" size={24} /> {translate.quickreserve}
      </h3>

      {firstAvailable ? (
        <>
          <p className="text-blue-800 text-sm font-medium"> {translate.firstschadule}</p>
          <p className="mt-3 text-xl font-bold text-blue-600 tracking-wide">
            {moment(firstAvailable.date, "jYYYY-jMM-jD").format("jD jMMMM")} - {firstAvailable.time}
          </p>
          <button
            onClick={handleReserve}
            className="
              mt-8 w-full
              bg-blue-600 hover:bg-blue-700
              text-white
              py-3 rounded-xl
              transition
              duration-300
              font-semibold
              shadow-md
              hover:shadow-lg
              active:scale-95
              focus:outline-none
              focus:ring-4 focus:ring-blue-300
            "
          >
            {translate.reserve}
          </button>
        </>
      ) : (
        <p className="text-center text-gray-400 italic py-8"> {translate.noemptytime}</p>
      )}
    </div>
  );
}

export default QuickReserveCard;
