import Button from "../../../../components/shared/Button";
import {
    FaHeadphonesSimple,
    FaUserGraduate,
    FaRegClock,
} from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function CourseIntroCard(props) {
    const {
        videoSrc,
        courseImage,
        title,
        description,
        price,
        time,
        session,
        participants,
    } = props;

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-8 p-6 bg-white rounded-[20px] shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={courseImage}
                            alt={`عکس دوره ${title}`}
                            className="w-16 h-16 rounded-xl shadow-md object-cover"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
                <video
                    controls
                    src={videoSrc}
                    className="w-full rounded-xl shadow-md object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6">
                <div className="flex items-center gap-4">
                    <div className="text-xl font-bold text-blue-700 whitespace-nowrap">
                        {price?.toLocaleString()} تومان
                    </div>
                    <Button color="blue" size="medium">ثبت‌نام در دوره</Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm w-full md:w-auto">
                    {[
                        {
                            icon: <FaHeadphonesSimple className="text-blue-500 text-xl" />,
                            label: "پشتیبانی ۲۴ ساعته",
                            bg: "bg-blue-100",
                        },
                        {
                            icon: <FaChalkboardTeacher className="text-green-500 text-xl" />,
                            label: `${session} جلسه`,
                            bg: "bg-green-100",
                        },
                        {
                            icon: <FaRegClock className="text-orange-500 text-xl" />,
                            label: `${time} دقیقه`,
                            bg: "bg-orange-100",
                        },
                        {
                            icon: <FaUserGraduate className="text-purple-500 text-xl" />,
                            label: `${participants} شرکت‌کننده`,
                            bg: "bg-purple-100",
                        },
                    ].map(({ icon, label, bg }, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 text-gray-700 transition hover:scale-105">
                            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shadow-sm`}>
                                {icon}
                            </div>
                            <span className="text-center">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
