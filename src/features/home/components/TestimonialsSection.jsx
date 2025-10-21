// components/TestimonialsSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import translate from "../../../locale/translate";

const testimonials = [
    {
        text: "سؤال‌ها باعث شدن بیشتر فکر کنم. معمولاً فقط سعی می‌کنم مطالب رو حفظ کنم، نه اینکه واقعاً بفهمم. حالا فهمیدم باید بدونن چرا دارم چیزی رو میخونم.",
    },
    {
        text: "اولش فکر کردم سؤال‌ها تکراری هستن، اما بعد دیدم هرکدوم به بخش متفاوتی از نحوه درس خواندنم اشاره می‌کنه. حالا فهمیدم که در مدیریت زمان واقعا ضعیفم.",
    },
    {
        text: "بعد از آزمون، حس کردم باید یادبگیرم چطور در آزمون ها بهتر عمل کنم، نه فقط چطور درس بخونم. تا حالا هیچوقت به این فکر نکرده بودم.",
    },
    {
        text: "این آزمون نشون داد درس خوندنم گاهی خوبه، گاهی نه.بعضی روز ها تمرکز دارم، بعضی روزها اصلا نمیتونم ادامه بدم.",
    },
    {
        text: "قبلا فکر میکردم باید زیاد بخونم تا موفق شم، ولی سؤال ها نشون داد چطور خوندم هم مهمه. الان میخوام روش مطالعه‌م رو عوض کنم.",
    },
    {
        text: "بعضی سؤال ها باعث شدن به کارهام فکر کنم. مثلاً چرا همیشه شب قبل از امتحان تازه میفهمم چقدر باید بخونم؟",
    },
    {
        text: "سؤال‌ها یادم انداختن که برنامه ریزی چقدر مهمه. تازه فهمیدم بیشتر کارهایی که انجام میدم همون چیزهایی هستن که آزمون درباره‌شون صحبت میکنه.",
    },
    {
        text: "فکر می‌کنم آزمون خیلی دقیق بود، چون هم درباره انگیزه پرسیده بود  هم درباره تمرکز. حالا بهتر میدونم سبک یادگیری خودم چطوره.",
    },
    {
        text: "من همیشه قبل از امتحان، خلاصه‌هام رو مرور می‌کنم.بعد از خواندن این سؤال‌ها مطمئن شدم که این روش درسته.",
    },
    {
        text: "جالب بود که دیدیم فرزندمون بیشتر حفظ میکنه تا اینکه بفهمه.حداقل حالا میدونیم چطور باید کمکش کنیم.",
    },
    {
        text: "نمیدونستم اصلاً آزمونی وجود داره که روش مطالعه بچه‌ها را بسنجه.نتایجش واقعاً مفید بود.",
    },
    {
        text: "این آزمون کمک کرد بفهمیم چرا نمره‌های بچه‌مون بالای پایین می‌شن. حالا میخوایم با مشاور مدرسه صحبت کنین تا مهارت مطالعه‌ش بهتر شه.",
    },
    {
        text: "به نظرم این ازمون میتونه واقعا به برنامه‌ریزی درسی کمک کنه، چون نشون میده مشکل اصلی هر دانش‌آموز چیه؟ بی توجهی ، بی انگیزگی یا روش غلط امتحان دادن.",
    },
    {
        text: "بعد از دیدن نتیج فهمیدن بعضی از شاگرهام باهوشن ولی اشتباه درس میخونن. برای هرکدوم تمرین های خاصی طراحی کردیم.",
    },
    {
        text: "به عنوان مدیر، متوجه شدم نتایج این ازمون میتونه روی نحوه مشاوره به دانش آموز ها و حتی روش تدریس معلم‌ها تأثیر بزاره. چون دید ملی نسبت به یادگیری ارائه می‌ده.",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="flex items-center justify-center gap-3 relative text-2xl font-bold text-gray-800 mb-12">
                    <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                    <span>{translate.reviews}</span>
                    <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                </h2>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ type: "progressbar" }}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1}
                    className="testimonials-swiper"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-gray-700 text-lg leading-loose border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex justify-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-3xl text-[#106089] font-serif">"</span>
                                {item.text}
                                <span className="text-3xl text-[#106089] font-serif">"</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
