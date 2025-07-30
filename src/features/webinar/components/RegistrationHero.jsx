export default function RegistrationHero() {
    return (
        <div className=" rounded-2xl  p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* متن و اطلاعات */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        وبینار تخصصی اختلال یادگیری
                    </h1>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                        در این وبینار، با ریشه‌های اختلال یادگیری، راهکارهای روانشناختی، و روش‌های تعامل با کودکان دارای این اختلال آشنا می‌شوید.
                    </p>

                    <ul className="text-sm text-gray-500 mb-4 space-y-1">
                        <li>🗓️ <span>تاریخ برگزاری: ۱۰ شهریور ۱۴۰۴</span></li>
                        <li>🕒 <span>ساعت: ۱۸:۰۰ تا ۱۹:۳۰</span></li>
                        <li>🎤 <span>مدرس: دکتر نسرین یوسفی (متخصص روانشناسی کودک)</span></li>
                    </ul>

                    <button
                        className="bg-blue-700 hover:bg-blue-800 transition text-white py-2.5 px-6 rounded-lg text-base font-semibold"
                        onClick={() => {
                            const priceRef = document.getElementById("price-section");
                            if (priceRef) {
                                window.scrollTo({ top: priceRef.offsetTop - 100, behavior: "smooth" });
                            }
                        }}
                    >
                        ثبت‌نام در وبینار
                    </button>
                </div>
            </div>
        </div>
    );
}
