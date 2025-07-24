// components/TestimonialsSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import translate from "../../../locale/translate";

const testimonials = [
    {
        text: "پسرم مبتلا به بیش‌فعالی بود و شرایط سختی داشتیم. جلسات مشاوره به ما یاد داد چطور آرامش ایجاد کنیم. واقعاً ممنونم.",
    },
    {
        text: "زمانی که اتیسم پسرم تشخیص داده شد، ناامید بودم. اما با تمرینات و همراهی تیم متخصص، پیشرفت چشم‌گیری داشت.",
    },
    {
        text: "مشکل حرکتی مزمنی داشتم، اما با صبوری و انگیزه‌ای که در جلسات دریافت کردم، بهتر شدم. از تیم درمانی ممنونم.",
    },
    {
        text: "دخترم تاخیر گفتاری داشت و علاقه‌ای به جلسات درمانی نداشت. اما با اخلاق خوب مشاور، مشتاقانه جلسات رو ادامه داد.",
    },
];

export default function TestimonialsSection() {
    return (
        <section className=" py-16">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="flex items-center justify-center gap-3 relative text-xl font-bold text-gray-800 mb-10">
                    <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                    <span>{translate.reviews}</span>
                </h2>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ type: "progressbar" }}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-xl shadow-md p-8 text-gray-700 text-lg leading-loose">
                                <span className="text-2xl text-indigo-500 font-serif">“</span>
                                {item.text}
                                <span className="text-2xl text-indigo-500 font-serif">”</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
