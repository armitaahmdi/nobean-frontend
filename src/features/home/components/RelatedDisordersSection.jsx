import readingbook from "../../../assets/images/3d/3d-skill-study.png";
import cognitive from "../../../assets/images/3d/3d-cognitive.png";
import focus from "../../../assets/images/3d/3d-focus.png";
import examstrategies from "../../../assets/images/3d/3d-exam-strategies.png";
import evolation from "../../../assets/images/3d/3d-evolation.png";
import motivation from "../../../assets/images/3d/3d-motivation.png";

const learningSkills = [
    {
        title: "مهارت‌های مطالعه و یادگیری",
        description: "برنامه‌ریزی و مدیریت زمان • مرور مؤثر و سازماندهی اطلاعات • خودتنظیمی و خودگردانی در یادگیری",
        image: readingbook,
    },
    {
        title: "راهبردهای شناختی و فراشناختی",
        description: "تفکر تحلیلی و حل مسئله • دسته‌بندی و ارتباط مفاهیم • ارزیابی و اصلاح روش یادگیری خود",
        image: cognitive,
    },
    {
        title: "انگیزش و نگرش تحصیلی",
        description: "هدف گذاری و انگیزه درونی • اعتماد به نفس و خود کار آمدی • نگرش مثبت به مطالعه و آزمون",
        image: motivation,
    },
    {
        title: "تمرکز و توجه",
        description: "تمرکز حین مطالعه و آزمون • کاهش حواس‌پرتی • مدیریت انرژی ذهنی",
        image: focus,
    },
    {
        title: "راهبردهای آزمون",
        description: "تحلیل سؤال‌ها و پاسخ‌دهی مؤثر • مدیریت زمان و اضطراب در جلسه امتحان • انتخاب راهبرد مناسب با نوع سؤال",
        image: examstrategies,
    },
    {
        title: "ارزیابی و بازخورد یادگیری",
        description: "شناسایی نقاط قوت و ضعف • طراحی برنامه آموزشی شخصی‌سازی شده • پیگیری پیشرفت تحصیلی و بهبود راهبردها",
        image: evolation,
    },
];

export default function RelatedDisordersSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="flex items-center justify-center gap-3 relative text-2xl font-bold text-gray-800 mb-12">
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
                <span>مهارت‌های مطالعه و یادگیری</span>
                <span className="inline-block w-[3.2rem] h-[0.2rem] rounded-[30%] bg-[#106089] shadow-md"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {learningSkills.map((item, index) => (
                    <div
                        key={index}
                        className="
                            cursor-pointer
                            rounded-3xl
                            shadow-xl
                            transition-all
                            duration-300
                            p-8
                            flex flex-col justify-between
                            bg-white
                            border border-gray-200
                            hover:shadow-2xl
                            hover:border-[#106089]
                            hover:scale-105
                            group
                            min-h-[380px]
                        "
                    >
                        <div className="text-center">
                            <h3 className="font-bold text-xl mb-4 text-gray-800 group-hover:text-[#106089] transition-colors duration-300">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>
                        <div className="w-40 h-40 mt-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center group-hover:from-[#106089] group-hover:to-blue-600 transition-all duration-300 shadow-lg mx-auto">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-30 h-30 object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
