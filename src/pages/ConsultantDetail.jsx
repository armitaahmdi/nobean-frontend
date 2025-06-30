/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchConsultants } from "../features/consultants/consultantsSlice";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import ConsultantProfile from "../features/consultants/ConsultantProfile";
import QuickReserveCard from "../features/consultants/QuickReserveCard";
import RelatedConsultantsSlider from "../features/consultants/RelatedConsultantsSlider";
import AnchorTabs from "../components/tab/AnchorTabs";
import AboutTab from "../components/tab/consultantTabs/AboutTab";
import ScheduleTab from "../components/tab/consultantTabs/ScheduleTab";
import LocationTab from "../components/tab/consultantTabs/LocationTab";
import ReviewsCard from "../components/card/ReviewsCard";
import consultantImage from "../assets/images/consultant.png"
import locationImage from "../assets/images/location.png";
import calenderImage from "../assets/images/schedule.png"
import commentImage from "../assets/images/social-media.png"
import translate from "../locale/translate";

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

        {/* Anchor-style tabs */}
        <div className="
         row-start-3 col-start-1 col-end-4
            md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3
            lg:col-start-1 lg:col-end-3 lg:row-end-2 
        ">
          <AnchorTabs />
        </div>

        <div className="bg-white/80 px-4 rounded-b-[20px]
        flex flex-col
         row-start-3 col-start-1 col-end-4
          md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3
          lg:col-start-1 lg:col-end-3 lg:row-end-2 mt-14
        ">
          <section id="about" className="py-8 scroll-mt-24">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <img src={consultantImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
               {translate.consultantDesc}
            </h2>
            <AboutTab consultant={consultant} />
          </section>

          <section id="schedule" className="scroll-mt-28 border-t border-gray-200 py-12">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <img src={calenderImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
              {translate.schaduleTimming}
            </h2>
            <ScheduleTab schedule={consultant.schedule} />
          </section>

          <section id="location" className="scroll-mt-28 border-t border-gray-200 py-12">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <img src={locationImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
              {translate.clinicaddress}
            </h2>
            <LocationTab service={consultant} />
          </section>

          <section id="reviews" className="scroll-mt-28 border-t border-gray-200 py-12">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <img src={commentImage} alt={translate.clinicaddress} className="w-7 h-7 object-cover" />
              {translate.ratingandcomment}
            </h2>
            <ReviewsCard reviews={consultant.reviews || []} />
          </section>
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
