import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchConsultants } from "../features/consultants/consultantsSlice";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import ConsultantProfile from "../features/consultants/ConsultantProfile";
import Tabs from "../components/tab/Tabs";
import QuickReserveCard from "../features/consultants/QuickReserveCard";
import RelatedConsultantsSlider from "../features/consultants/RelatedConsultantsSlider";

export default function ConsultantDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { consultants, loading, error } = useSelector((state) => state.consultants);

  useEffect(() => {
    if (consultants.length === 0) {
      dispatch(fetchConsultants());
    }
  }, [consultants.length, dispatch]);

  const consultant = consultants.find((c) => c.id === Number(id));
  const [reservedSlot, setReservedSlot] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenScheduleTab = (slot) => {
    setReservedSlot(slot);
    setSearchParams({ tab: "schedule" });
  };

  useEffect(() => {
    if (searchParams.get("tab") === "schedule") {
      const element = document.getElementById("schedule-tab");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!consultant) return <div>مشاور پیدا نشد.</div>;

  const tabs = [
    { id: "about", label: "درباره", key: "about" },
    { id: "schedule", label: "زمان‌بندی", key: "schedule" },
    { id: "location", label: "آدرس مطب", key: "location" },
    { id: "reviews", label: "نظرات", key: "reviews" },
  ];

  return (
    <>
      <div
        className="
          max-w-screen-xl mx-auto p-4
          grid gap-8
          grid-rows-[auto_auto_auto]
    
          md:grid-rows-[auto_auto]
          md:grid-cols-3   /* 3 ستون تبلت */
    
          lg:grid-rows-1
          lg:grid-cols-[1fr_260px] /* دسکتاپ: ستون چپ کوییک رزرو 220px و ستون راست پروفایل+تب */
        "
      >
        {/* QuickReserveCard */}
        <div
          className="
            row-start-2 col-start-1 col-end-4  /* موبایل عرض کامل */
            md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-3  /* تبلت ستون سوم ، 2 ردیف */
            lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2
            flex-shrink-0
          "
        >
          <QuickReserveCard
            schedule={consultant.schedule}
            onOpenScheduleTab={handleOpenScheduleTab}
          />
        </div>

        {/* Profile */}
        <div
          className="
            row-start-1 col-start-1 col-end-4  /* موبایل عرض کامل */
            md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2  /* تبلت ستون 1 و 2 ردیف 1 */
            lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2
          "
        >
          <ConsultantProfile consultant={consultant} />
        </div>

        {/* Tabs */}
        <div id="schedule-tab"
          className="
            row-start-3 col-start-1 col-end-4
            md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3
            lg:col-start-1 lg:col-end-2 lg:row-end-2 mt-8
          ">
          <Tabs tabs={tabs} data={consultant} reservedSlot={reservedSlot} />
        </div>
      </div>

      <RelatedConsultantsSlider
        consultants={
          consultants
            .filter((c) => c.id !== consultant.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8)
        }
      />
    </>
  );

}
