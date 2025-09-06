import { FaTag } from "react-icons/fa";
import mainLogo from "../../../../assets/images/logo/main-logo.png";
import translate from "../../../../locale/translate";

export default function IntroCard({ title, description, image, category, tags = [] }) {
    return (
        <div className="bg-white flex flex-col lg:flex-row w-full rounded-[24px] p-6 sm:p-8 gap-6 shadow-md">
            {/* لوگو ثابت */}
            <div className="w-full lg:w-[170px] h-[150px] bg-[#134797] rounded-[20px] flex justify-center items-center shrink-0">
                <img src={mainLogo} alt={translate.altdescription} className="w-[90px] h-auto" />
            </div>

            {/* محتوای معرفی آزمون */}
            <div className="flex flex-col gap-y-5 sm:gap-y-6 flex-1">
                <div className="flex items-center gap-x-3">
                    <img src={image} alt={title} className="w-16 h-16 rounded-full object-cover" />
                    <h2 className="text-xl font-bold text-[#1a1a1a]">{title}</h2>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed text-justify max-w-3xl">
                    {description}
                </p>

                {/* دسته بندی */}
                <p className="text-sm text-gray-500 mb-2">دسته‌بندی: <span className="font-semibold">{category}</span></p>

                {/* نمایش تگ‌ها */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                            <FaTag size={12} />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
