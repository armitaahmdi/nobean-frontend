import { FaRegClock, FaCalendarAlt, FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import webinarImg from "../../../../assets/images/banner/webinar-banner.jpg";

export default function WebinarHero({ scrollToPrice }) {
  return (
    <div className="flex justify-center items-center px-4">
      <section className="bg-white rounded-[20px] py-4 shadow-md w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
          {/* متن */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#e0e7ff] text-[#1C2E4E] text-sm font-medium px-4 py-1 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                <path stroke="#1C2E4E" strokeWidth="1.5" d="M12 8.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
                <path stroke="#1C2E4E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12h-3M3 12h3m6 9v-3m0-15v3" />
              </svg>
              وبینار آموزشی
            </span>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1C2E4E] leading-tight mb-4">
              وبینار اختلال یادگیری
            </h1>

            <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
              با حضور متخصصان روانشناسی، به بررسی علائم، دلایل و راهکارهای اختلالات یادگیری در کودکان و نوجوانان می‌پردازیم.
            </p>

            {/* اطلاعات وبینار */}
            <div className="flex flex-wrap gap-3 mb-8 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full shadow-sm text-gray-700">
                <FaRegClock className="text-primary" />
                ۹۰ دقیقه
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full shadow-sm text-gray-700">
                <FaCalendarAlt className="text-primary" />
                ۲۰ شهریور ۱۴۰۴
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full shadow-sm text-gray-700">
                <FaRegCheckCircle className="text-primary" />
                ویژه والدین و معلمان
              </div>
            </div>

            <button onClick={scrollToPrice}
              className="bg-darkBlue text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#152541] transition">
              ثبت‌نام در وبینار
              <HiOutlineArrowRight className="text-lg" />
            </button>
          </div>

          {/* تصویر */}
          <div className="relative w-full flex justify-center">
            <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-sm">
              <img
                src={webinarImg}
                alt="وبینار اختلال یادگیری"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}