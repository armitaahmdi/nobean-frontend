import think from "../../../assets/images/categoryIcons/homePageIcons/think.png";
import headache from "../../../assets/images/categoryIcons/homePageIcons/headache.png";
import readingbook from "../../../assets/images/categoryIcons/homePageIcons/reading-book.png";
import adhd from "../../../assets/images/categoryIcons/homePageIcons/adhd.png";

const learningDisorders = [
    {
        title: "نارساخوانی (Dyslexia)",
        description: "مشکل در خواندن، درک متون و تلفظ صحیح واژه‌ها.",
        image: readingbook,
    },
    {
        title: "اختلال توجه (ADD)",
        description: "کودک به‌سختی تمرکز می‌کند و اغلب دچار حواس‌پرتی است.",
        image: headache,
    },
    {
        title: "بیش‌فعالی (ADHD)",
        description: "رفتارهای پرتحرک و عدم کنترل بر هیجانات یا حرکات.",
        image: adhd,
    },
    {
        title: "اختلال ریاضی (Dyscalculia)",
        description: "مشکل در درک اعداد، محاسبات و مفاهیم ریاضی.",
        image: think,
    },
];

export default function RelatedDisordersSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {learningDisorders.map((item, index) => (
                    <div
                        key={index}
                        className="
                            cursor-pointer
                            rounded-xl
                            shadow
                            transition
                            duration-300
                            p-6
                            flex flex-col items-center
                            bg-white
                            hover:bg-gradient-to-r
                            hover:from-blue-600
                            hover:to-blue-400
                            hover:text-white
                        "
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 mb-4 transition duration-300"
                        />
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-center">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
