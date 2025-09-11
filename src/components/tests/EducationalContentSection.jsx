import { FaBookOpen, FaQuestionCircle, FaLightbulb, FaChartLine, FaUserGraduate, FaHeart } from "react-icons/fa";

export default function EducationalContentSection() {
    const educationalContent = [
        {
            id: 1,
            icon: FaBookOpen,
            title: "آشنایی با اختلالات یادگیری",
            description: "اختلالات یادگیری شامل مشکلاتی در خواندن، نوشتن، ریاضی و پردازش اطلاعات است که بر عملکرد تحصیلی تأثیر می‌گذارد.",
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            tips: [
                "نشانه‌های اولیه شامل مشکل در خواندن، نوشتن یا ریاضی است",
                "تشخیص زودهنگام کلید موفقیت درمان است",
                "هر کودک الگوی یادگیری منحصر به فردی دارد"
            ]
        },
        {
            id: 2,
            icon: FaQuestionCircle,
            title: "چگونه برای آزمون آماده شویم؟",
            description: "آماده‌سازی مناسب کودک برای آزمون‌های تشخیصی می‌تواند نتایج دقیق‌تری ارائه دهد.",
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            tips: [
                "کودک را در محیط آرام و بدون استرس قرار دهید",
                "اطمینان حاصل کنید که کودک استراحت کافی داشته است",
                "توضیح دهید که آزمون برای کمک به او طراحی شده است"
            ]
        },
        {
            id: 3,
            icon: FaLightbulb,
            title: "درک نتایج آزمون",
            description: "نتایج آزمون‌های روان‌شناسی اطلاعات ارزشمندی درباره نقاط قوت و ضعف کودک ارائه می‌دهد.",
            color: "from-yellow-500 to-orange-600",
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600",
            tips: [
                "نتایج را با متخصص روان‌شناسی بررسی کنید",
                "نقاط قوت کودک را شناسایی و تقویت کنید",
                "برای نقاط ضعف برنامه‌ریزی درمانی انجام دهید"
            ]
        },
        {
            id: 4,
            icon: FaChartLine,
            title: "پیگیری پیشرفت کودک",
            description: "نظارت منظم بر پیشرفت کودک در روند درمان و آموزش بسیار مهم است.",
            color: "from-purple-500 to-pink-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            tips: [
                "پیشرفت را در بازه‌های زمانی منظم ارزیابی کنید",
                "تغییرات مثبت را جشن بگیرید",
                "در صورت نیاز برنامه درمانی را تعدیل کنید"
            ]
        },
        {
            id: 5,
            icon: FaUserGraduate,
            title: "راهکارهای آموزشی",
            description: "استراتژی‌های آموزشی مناسب می‌تواند یادگیری کودک را بهبود بخشد.",
            color: "from-indigo-500 to-blue-600",
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600",
            tips: [
                "از روش‌های چندحسی استفاده کنید",
                "تکرار و تمرین منظم را در برنامه قرار دهید",
                "با معلم کودک همکاری نزدیک داشته باشید"
            ]
        },
        {
            id: 6,
            icon: FaHeart,
            title: "حمایت عاطفی از کودک",
            description: "حمایت عاطفی و روانی مناسب اعتماد به نفس کودک را تقویت می‌کند.",
            color: "from-red-500 to-pink-600",
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            tips: [
                "کودک را به خاطر تلاش‌هایش تشویق کنید",
                "احساسات کودک را درک و تأیید کنید",
                "محیط خانه را مثبت و حمایت‌گر نگه دارید"
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    محتوای آموزشی و راهنما
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    راهنماها و نکات مفید برای درک بهتر اختلالات یادگیری و نحوه برخورد با آن‌ها
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalContent.map((content) => {
                    const IconComponent = content.icon;
                    return (
                        <div
                            key={content.id}
                            className="group"
                        >
                            <div className={`${content.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 h-full`}>
                                {/* Icon */}
                                <div className="flex items-center justify-center mb-4">
                                    <div className={`w-14 h-14 bg-gradient-to-r ${content.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                                        {content.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        {content.description}
                                    </p>
                                    
                                    {/* Tips */}
                                    <div className="text-right">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">نکات مهم:</h4>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {content.tips.map((tip, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* General Information */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        💡 نکته مهم
                    </h3>
                    <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
                        اختلالات یادگیری قابل درمان هستند و با تشخیص زودهنگام، حمایت مناسب و برنامه‌ریزی صحیح، 
                        کودکان می‌توانند به موفقیت تحصیلی و شخصی دست یابند. مهم‌ترین نکته این است که هر کودک 
                        منحصر به فرد است و نیاز به رویکرد شخصی‌سازی شده دارد.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm text-gray-700">
                            <strong>تشخیص زودهنگام</strong> = موفقیت بیشتر
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm text-gray-700">
                            <strong>حمایت خانواده</strong> = اعتماد به نفس بالاتر
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm text-gray-700">
                            <strong>درمان تخصصی</strong> = بهبود سریع‌تر
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
