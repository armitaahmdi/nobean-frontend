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
                {/* <div className="bg-white flex w-full rounded-[20px] py-3 px-5 gap-x-5">
                    <div className="w-[170px] h-[150px] bg-[#134797] rounded-[20px] flex justify-center items-center">
                        <img src={mainLogo} alt={translate.altdescription} />
                    </div>

                    <div className="flex flex-col gap-y-6">
                        <div className="flex items-center gap-x-2">
                            <img src={image} alt={title} className="w-16 h-16 rounded-full" />
                            <h2 className="text-xl font-bold">{title}</h2>
                        </div>

                        <p className="text-sm mr-6">{description}</p>

                        <p className="text-sm text-[#8A8A8A] mr-6">{category}</p>
                    </div>
                </div> */}
                <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                    <div className="bg-white flex flex-col sm:flex-row w-full rounded-[20px] py-3 px-5 gap-4 sm:gap-x-5">
                        {/* لوگو */}
                        <div className="w-full sm:w-[170px] h-[150px] bg-[#134797] rounded-[20px] flex justify-center items-center shrink-0">
                            <img src={mainLogo} alt={translate.altdescription} className="w-[90px] h-auto" />
                        </div>

                        {/* متن و تصویر پروفایل */}
                        <div className="flex flex-col gap-y-4 sm:gap-y-6">
                            <div className="flex items-center gap-x-2 mt-2 sm:mt-0">
                                <img src={image} alt={title} className="w-16 h-16 rounded-full" />
                                <h2 className="text-xl font-bold">{title}</h2>
                            </div>

                            <p className="text-sm mr-0 sm:mr-6">{description}</p>
                            <p className="text-sm text-[#8A8A8A] mr-0 sm:mr-6">{category}</p>
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
