import { getExcerpt } from "../../helper/helperFunction";
import translate from "../../locale/translate";
import { RxClock } from "react-icons/rx";
import { HiOutlineEye } from "react-icons/hi";

export default function ArticleCard({ article }) {
    return (
        <div className="border border-[#D7D7D7] p-3 rounded-[20px]">
            <img className="rounded-[20px] w-full object-cove" src={article.image} alt={article.title} />
            <div className="p-4 flex flex-col gap-3 ">
                <h3 className="font-bold text-[18px]">{article.title}</h3>
                <p className="text-[13px] text-[#757575]">{getExcerpt(article.description)}</p>
                <div className="flex items-center">
                    <span className="flex items-center text-[#757575] text-[14px]">
                        <RxClock className="ml-1" /> {article.readingTime} {translate.minutes}
                    </span>
                    <span className="flex items-center text-[#757575] mr-3 text-[14px]">
                        <HiOutlineEye className="ml-1" /> 1,258
                    </span>
                </div>
            </div>
        </div>
    )
}
