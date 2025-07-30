import community from "../../../../assets/images/icons/community.png"
import accessibility from "../../../../assets/images/icons/accessibility.png"
import project from "../../../../assets/images/icons/project.png"
import webinar from "../../../../assets/images/icons/webinar.png"

const features = [
    {
        icon: webinar,
        title: "محتوای کاربردی و علمی",
        description:
            "مطالب این وبینار توسط متخصصین روانشناسی کودک تدوین شده و قابل استفاده در موقعیت‌های واقعی است.",
    },
    {
        icon: community,
        title: "مناسب برای والدین و مربیان",
        description:
            "مطالب طوری طراحی شده که هم برای خانواده‌ها و هم برای مربیان و معلمان قابل فهم و مفید باشد.",
    },
    {
        icon: accessibility,
        title: "دسترسی به ضبط جلسه",
        description:
            "در صورتی که موفق به حضور در زمان وبینار نشدید، می‌توانید بعداً ویدیو را مشاهده کنید.",
    },
    {
        icon: project,
        title: "مدت زمان بهینه",
        description:
            "در مدت زمانی حدود ۹۰ دقیقه، اطلاعات جامع و فشرده‌ای در مورد اختلال یادگیری ارائه می‌شود.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="mt-16 max-w-7xl px-4">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
                ویژگی‌های این وبینار
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(({ icon, title, description }, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
                    >
                        <div className="w-14 h-14 flex items-center justify-center mb-5">
                            <img src={icon} alt={title}  />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
