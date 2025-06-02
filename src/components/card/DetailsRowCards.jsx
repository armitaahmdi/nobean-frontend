import { HiClock } from "react-icons/hi2";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { HiMiniSparkles } from "react-icons/hi2";
import { HiOutlineListBullet } from "react-icons/hi2";
import translate from "../../locale/translate";
import Button from "../Button";

export default function DetailsRowCards({ tests, onGoToReviews }) {

    return (
        <div className="flex flex-wrap gap-6 justify-between mt-6">
            {/* Suitable For */}
            <div className="bg-white rounded-[20px] p-4 min-w-[220px] flex-1">
                <h2 className="text-lightYellow font-bold text-xl mb-3">{translate.suitablefor}</h2>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {tests.suitableFor && tests.suitableFor.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Number of done */}
            <div className="bg-white rounded-[20px] p-4 min-w-[140px] flex flex-col items-center justify-center flex-1">
                <h2 className="flex items-center font-semibold mb-1 text-xl">
                    <HiOutlineHashtag size={20} className="ml-1 text-lightYellow" />
                    {translate.numberofdone}
                </h2>
                <p className="text-lg font-bold">{tests.participants}</p>
            </div>

            {/* Rating and Comments */}
            <div className="flex flex-col gap-6 flex-1 min-w-[140px]">
                <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center">
                    <h2 className="flex items-center font-semibold mb-1 text-xl">
                        <HiMiniSparkles size={20} className="ml-1 text-lightYellow" />
                        {translate.rating}
                    </h2>
                    <p className="text-lg font-bold">{tests.rating}</p>
                </div>
                <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center">
                    <h2 className="flex items-center font-semibold mb-1 text-xl">
                        <HiChatBubbleBottomCenterText size={20} className="ml-1 text-lightYellow" />
                        {translate.comments}
                    </h2>
                    <p className="text-lg font-bold">{tests.reviews ? tests.reviews.length : 0}</p>
                </div>
            </div>

            {/* Duration and Number of Questions */}
            <div className="flex flex-col gap-6 flex-1 min-w-[140px]">
                <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center">
                    <h2 className="flex items-center font-semibold mb-1 text-xl">
                        <HiClock size={20} className="ml-1 text-lightYellow" />
                        {translate.duration}
                    </h2>
                    <p className="text-lg font-bold">{tests.time}</p>
                </div>
                <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center">
                    <h2 className="flex items-center font-semibold mb-1 text-xl">
                        <HiOutlineListBullet size={20} className="ml-1 text-lightYellow" />
                        {translate.numberofquestion}
                    </h2>
                    <p className="text-lg font-bold">{tests.questionsCount}</p>
                </div>
            </div>

            {/* Start Button */}
            <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center min-w-[180px]">
                <h2 className="text-gray-900 text-xl font-bold mb-4">{tests.title}</h2>

                <Button size="xlarge" color="blue"> {translate.startfree}</Button>
                <button
                    onClick={onGoToReviews}
                    className="font-bold  text-darkYellow underline hover:text-blue-800 cursor-pointer mt-4">
                    ثبت نظر
                </button>
            </div>
        </div>
    );
}