import { useState } from "react";
import { Link } from "react-router-dom";
import translate from "../../../../locale/translate";
import { HiClock } from "react-icons/hi2";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";
import { getShortenText } from "../../../../helper/helperFunction";
import Button from "../../../../components/shared/Button"

const badgeColors = {
    "ویژه والدین و فرزندان": "#FDC730",
    "ویژه والدین": "#629BF7",
    "ویژه فرزندان": "#34A853"
}

export default function CourseCard({ course }) {
    const [isHovered, setIsHovered] = useState(false);
    const badgeBgColor = badgeColors[course.target_audience] || "gray";

    return (
        <div className="relative w-full h-auto py-6 flex flex-col justify-center items-center bg-[#FFF8E6] rounded-[20px] shadow-md overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div style={{ backgroundColor: badgeBgColor }}
                className="absolute top-3 left-7 rounded-[10px] text-xs py-2 px-3">
                {course.target_audience}
            </div>

            {
                isHovered ? <div className="leading-8 my-2 p-[10px]">{course.description}</div> : <>
                    <img src={course.image} alt={course.title} className="w-[140px] h-[140px] rounded-[20px]" />

                    <div className="p-4 flex flex-col justify-center items-center gap-2 text-center">
                        <h3 className="text-[18px] font-bold">{course.title}</h3>
                        <p className="text-[15px]">{getShortenText(course.description)}</p>

                        <div className="flex flex-wrap justify-center text-xs my-4 gap-4 sm:gap-6">
                            <span className="flex items-center gap-1"> <HiClock className="text-lightYellow w-5 h-5" />'{course.time}</span>
                            <span className="flex items-center gap-1"> <HiOutlineHashtag className="text-lightYellow w-5 h-5" /> {course.participants} {translate.participants} </span>
                            <span className="flex items-center gap-1"> <HiStar className="text-lightYellow w-5 h-5" /> {course.rating} </span>
                        </div>
                    </div>
                </>
            }

            <Link className="my-4" to={`/courses/${course.id}`}>
                <Button color="blue" size="small">
                    {translate.startfree}
                </Button>
            </Link>
        </div>
    )
}
