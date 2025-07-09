import { useState } from "react";
import moment from "moment-jalaali";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import translate from "../../../locale/translate";

moment.loadPersian({ usePersianDigits: true });
moment.updateLocale("fa", { week: { dow: 6 } });

export default function ScheduleTab({ schedule }) {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf("week"));
  const [selectedSlot, setSelectedSlot] = useState(null);

  const currentWeekDates = [...Array(7)].map((_, i) =>
    moment(currentWeekStart).add(i, "days")
  );

  const goToNextWeek = () => setCurrentWeekStart((prev) => moment(prev).add(1, "week"));
  const goToPrevWeek = () => setCurrentWeekStart((prev) => moment(prev).subtract(1, "week"));
  if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
    return (
      <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-md border border-gray-200 text-center text-gray-500 italic">
        {translate.noschadule}
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevWeek}
          className="text-sm text-blue-700 hover:text-blue-900 transition flex items-center gap-1">
          <AiOutlineRight size={16} />
          {translate.previousweek}
        </button>
        <h2 className="text-lg font-bold text-gray-800 text-center">
          {moment(currentWeekStart).format("jD jMMMM")} تا{" "}
          {moment(currentWeekStart).add(6, "days").format("jD jMMMM")}
        </h2>
        <button
          onClick={goToNextWeek}
          className="text-sm text-blue-700 hover:text-blue-900 transition flex items-center gap-1"
        >
          {translate.nextweek}
          <AiOutlineLeft size={16} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {currentWeekDates.map((date) => {
          const dateStr = persianToEnglishDigits(date.format("jYYYY-jMM-jDD"));
          const isToday = date.isSame(moment(), "day");
          const isPast = date.isBefore(moment(), "day");
          const daySchedule = schedule.find((d) => d.date === dateStr);

          return (
            <div
              key={dateStr}
              className={`rounded-xl p-4 flex flex-col border shadow-sm transition min-w-0 ${isPast
                  ? "bg-gray-100 text-gray-400 border-gray-200 opacity-70 cursor-not-allowed"
                  : isToday
                    ? "border-blue-500 bg-blue-50"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
            >
              <div className="font-semibold text-center mb-1 text-wrap break-words">
                {date.format("dddd")}
              </div>
              <div className="text-xs text-center mb-2 text-wrap break-words">
                {date.format("jYYYY/jMM/jDD")}
              </div>

              <div className="mt-2 space-y-2">
                {isPast ? (
                  <div className="text-xs text-center mt-6 text-gray-400">
                    گذشته
                  </div>
                ) : daySchedule?.slots?.length ? (
                  daySchedule.slots.map((time) => {
                    const isSelected = selectedSlot === `${dateStr}-${time}`;
                    return (
                      <button
                        key={`${dateStr}-${time}`}
                        onClick={() => setSelectedSlot(`${dateStr}-${time}`)}
                        className={`w-full flex items-center justify-center gap-2 text-sm py-1.5 px-2 rounded-xl border transition font-medium text-wrap break-words text-center ${isSelected
                            ? "bg-blue-600 text-white border-blue-700"
                            : "bg-gray-50 text-blue-800 border-blue-200 hover:bg-blue-100"
                          }`}
                      >
                        {time}
                      </button>
                    );
                  })
                ) : (
                  <div className="text-gray-400 text-sm text-center mt-6">
                    نوبتی موجود نیست
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function persianToEnglishDigits(str) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
}
