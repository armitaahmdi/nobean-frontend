import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";
import Button from "../button/Button";
import { HiVideoCamera } from "react-icons/hi2";
import { HiDocumentDuplicate } from "react-icons/hi2";
import DetailsRowCards from "./DetailsRowCards";

export default function IntroCard({ title, description, image, category, tests }) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                    <div className="bg-white flex flex-col lg:flex-row w-full rounded-[24px] p-6 sm:p-8 gap-6">
                        <div className="w-full lg:w-[170px] h-[150px] bg-[#134797] rounded-[20px] flex justify-center items-center shrink-0">
                            <img src={mainLogo} alt={translate.altdescription} className="w-[90px] h-auto" />
                        </div>

                        <div className="flex flex-col gap-y-5 sm:gap-y-6 flex-1">
                            <div className="flex items-center gap-x-3">
                                <img src={image} alt={title} className="w-16 h-16 rounded-full object-cover" />
                                <h2 className="text-xl font-bold text-[#1a1a1a]">{title}</h2>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed text-justify max-w-3xl">
                                {description}
                            </p>

                            <p className="text-sm text-gray-500">{category}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-transparent p-2 flex flex-col gap-2 items-center w-full md:items-start md:w-fit">
                    <Button size="xlarge" color="blue">
                        <HiDocumentDuplicate size={28} className="text-lightYellow" />
                        {translate.resumeSample}
                    </Button>
                    <Button size="xlarge" color="blue">
                        <HiVideoCamera size={28} className="text-lightYellow" />
                        {translate.courseSample}
                    </Button>
                </div>
            </div>

            <DetailsRowCards tests={tests} />
        </>
    );
}
