import { HiClock } from "react-icons/hi2";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiOutlineListBullet } from "react-icons/hi2";
import translate from "../../locale/translate";
import Button from "../../components/button/Button"
import { Link } from "react-router-dom";

const badgeColors = {
    "ویژه والدین و فرزندان": "#FDC730",
    "ویژه والدین": "#629BF7",
    "ویژه فرزندان": "#34A853"
}

export default function TestCard({ test }) {
    const badgeBgColor = badgeColors[test.badge] || "gray";

    return (
        <div className="relative w-full h-auto flex flex-col justify-center items-center bg-[#ECF3FE] rounded-[20px] shadow-md overflow-hidden">
            <div style={{ backgroundColor: badgeBgColor }}
                className="absolute top-3 left-7 rounded-[10px] text-xs py-2 px-3">
                {test.badge}
            </div>

            <img src={test.image} alt={test.title} className="w-[140px] h-[140px] rounded-[20px]" />

            <div className="p-4 flex flex-col justify-center items-center gap-2 text-center">
                <h3 className="text-[18px] font-bold">{test.title}</h3>
                <p className="text-[15px]">{test.description}</p>

                <div className="flex flex-wrap justify-center text-xs my-4 gap-4 sm:gap-6">
                    <span className="flex items-center gap-1"> <HiClock className="text-lightYellow w-5 h-5" />'{test.time}</span>
                    <span className="flex items-center gap-1"> <HiOutlineHashtag className="text-lightYellow w-5 h-5" /> {test.participants} {translate.participants} </span>
                    <span className="flex items-center gap-1"> <HiOutlineListBullet className="text-lightYellow w-5 h-5" /> {test.questionsCount} {translate.question} </span>
                </div>

                <Link to={`/tests/${test.id}`}>
                    <Button color="blue" size="small">
                        {translate.startfree}
                    </Button>
                </Link>
            </div>
        </div>

    );
}