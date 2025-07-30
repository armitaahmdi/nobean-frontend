import { FaCheckCircle, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import RegistrationHero from "../RegistrationHero";

export default function AboutSection() {
    return (
        <section className="bg-white rounded-3xl max-w-7xl px-6 py-14 shadow-lg border border-gray-100">
            <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
                    درباره وبینار
                </h2>
                <div>
                    <RegistrationHero />
                </div>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-12 text-justify">
                    در این وبینار تخصصی، به بررسی عمیق و همه‌جانبه‌ی اختلالات یادگیری در کودکان و نوجوانان می‌پردازیم؛ اختلالاتی که گاه پنهان می‌مانند و در صورت عدم شناسایی صحیح، می‌توانند تأثیرات بلندمدتی بر رشد تحصیلی، عاطفی و اجتماعی فرد بگذارند.
                    مطالب ارائه‌شده در این وبینار شامل شناسایی علائم اولیه‌ی اختلالات مانند نارساخوانی، نارسانویسی، و اختلال ریاضی، همچنین راهکارهای علمی برای تشخیص دقیق توسط والدین، معلمان و متخصصان خواهد بود.
                    علاوه بر آن، رویکردهای درمانی نوین، نقش تکنولوژی‌های آموزشی، و راهکارهای تقویت عزت‌نفس و انگیزه در کودکان مبتلا نیز بررسی خواهند شد.
                    این جلسه با هدف ارتقای سطح آگاهی عمومی و تخصصی برگزار می‌شود و فضایی فراهم می‌سازد تا شرکت‌کنندگان بتوانند با نگاهی علمی و کاربردی به موضوع بپردازند.
                    ارائه این وبینار توسط روانشناسان و مشاوران با تجربه در حوزه روانشناسی کودک صورت می‌گیرد و همراه با مثال‌های واقعی و تجربه‌های بالینی خواهد بود.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">اهداف وبینار</h3>
                <ul className="space-y-4 mb-12">
                    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        افزایش آگاهی والدین، معلمان و علاقه‌مندان نسبت به اختلالات یادگیری و انواع آن
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        آشنایی با نشانه‌های هشداردهنده و راه‌های اولیه شناسایی مشکلات یادگیری در سنین مختلف
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        ارائه‌ی راهکارهای کاربردی برای مواجهه صحیح با چالش‌های یادگیری در محیط خانه و مدرسه
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        معرفی ابزارها و روش‌های نوین مداخله و درمان با تمرکز بر تجربه‌های بالینی
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        تقویت تعامل مؤثر میان والدین، معلمان و متخصصان برای حمایت چندجانبه از کودک
                    </li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">برای چه کسانی مناسب است؟</h3>
                <ul className="space-y-6 text-gray-700 text-base sm:text-lg">
                    <li className="flex items-center gap-3">
                        <FaUserGraduate className="text-primary flex-shrink-0" size={22} />
                        والدین کودکانی که با چالش‌های یادگیری مواجه هستند
                    </li>
                    <li className="flex items-center gap-3">
                        <FaChalkboardTeacher className="text-primary flex-shrink-0" size={22} />
                        معلمانی که می‌خواهند عملکرد دانش‌آموزان را بهتر درک کنند
                    </li>
                    <li className="flex items-center gap-3">
                        <FaUserGraduate className="text-primary flex-shrink-0" size={22} />
                        روانشناسان یا دانشجویان علاقه‌مند به حوزه یادگیری
                    </li>
                </ul>
            </div>
        </section>
    );
}
