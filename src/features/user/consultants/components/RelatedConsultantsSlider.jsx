import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RelatedConsultantCard from "../components/RelatedConsultantCard";
import translate from "../../../../locale/translate";

export default function RelatedConsultantsSlider({ consultants }) {
  return (
    <>
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 32px !important;
          height: 32px !important;
          background-color: white !important;
          border-radius: 9999px !important; /* کاملاً گرد */
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
          color: #4A5568 !important; /* خاکستری متوسط */
          transition: background-color 0.2s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: #f1f5f9 !important; /* خاکستری روشن هنگام هاور */
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px !important;
          font-weight: bold;
        }

      `}</style>

      <div className="w-[90%] mx-auto flex flex-col justify-center px-2 sm:px-4 mt-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 px-2">
          {translate.suggestconsultants}
        </h2>

        <Swiper className="mb-10 w-full"
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {consultants.map((consultant) => (
            <SwiperSlide key={consultant.id}>
              <div className="h-full">
                <RelatedConsultantCard consultant={consultant} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
