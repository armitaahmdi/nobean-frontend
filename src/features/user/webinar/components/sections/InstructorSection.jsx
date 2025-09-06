import girl from "../../../../../assets/images/girl.png";

export default function InstructorSection() {
    const instructor = {
        name: "دکتر ناهید محمدی",
        title: "روانشناس کودک و نوجوان",
        bio: `دکتر ناهید محمدی دارای دکترای روانشناسی از دانشگاه تهران با بیش از ۱۵ سال تجربه در زمینه تشخیص و درمان اختلالات یادگیری کودکان است. 
ایشان بنیان‌گذار مرکز تخصصی رشد ذهنی کودک و مدرس دانشگاه در حوزه روانشناسی رشد هستند.`,
        image: girl,
    };

    return (
        <section className="mt-24 px-4 max-w-7xl">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center relative inline-block after:block after:w-16 after:h-1 after:bg-blue-400 after:mx-auto after:mt-2">
                از چه کسی یاد می‌گیرید؟
            </h2>

            <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-full max-w-xs shrink-0">
                    <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="rounded-2xl w-full h-auto object-cover"
                    />
                </div>

                <div className="text-right flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{instructor.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{instructor.title}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {instructor.bio}
                    </p>
                </div>
            </div>
        </section>
    );
}
