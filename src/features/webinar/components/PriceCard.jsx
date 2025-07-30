export default function PriceCard() {
    return (
        <section className="mt-20 mb-10 px-4 flex justify-center">
            <div className="w-full max-w-7xl">
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-xl rounded-2xl px-8 py-10 text-center mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">ثبت‌نام در وبینار</h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        با ثبت‌نام در این وبینار، به محتوای تخصصی در زمینه اختلال یادگیری و راهکارهای کاربردی دست خواهید یافت.
                    </p>

                    <div className="bg-white border border-blue-100 rounded-xl py-5 mb-6 shadow-sm">
                        <p className="text-gray-500 text-sm">هزینه ثبت‌نام</p>
                        <p className="text-4xl font-extrabold text-blue-700 mt-2">۱۹۰٬۰۰۰ تومان</p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-xl text-lg font-semibold w-full sm:w-auto">
                        ثبت‌نام در وبینار
                    </button>

                    <p className="text-sm text-gray-500 mt-6">ظرفیت محدود - فقط تا پایان هفته</p>
                </div>
            </div>
        </section>
    );
}
