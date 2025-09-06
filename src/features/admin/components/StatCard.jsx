import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export default function StatCard({ title, count, icon: Icon, color = "purple", link }) {
    const bgColorClass = {
        blue: "bg-blue-200",
        green: "bg-green-200",
        yellow: "bg-yellow-200",
        red: "bg-rose-200",
        purple: "bg-purple-200",
        teal: "bg-teal-200",
        orange: "bg-orange-200",
        pink: "bg-pink-200",
        cyan: "bg-cyan-200",
    }[color] || "bg-slate-200";

    const iconColorClass = {
        blue: "text-blue-700",
        green: "text-green-700",
        yellow: "text-yellow-700",
        red: "text-rose-700",
        purple: "text-purple-700",
        teal: "text-teal-700",
        orange: "text-orange-700",
        pink: "text-pink-700",
        cyan: "text-cyan-700",
    }[color] || "text-slate-700";

    const buttonColorClass = {
        blue: "bg-blue-700 hover:bg-blue-800",
        green: "bg-green-700 hover:bg-green-800",
        yellow: "bg-yellow-600 hover:bg-yellow-700",
        red: "bg-rose-700 hover:bg-rose-800",
        purple: "bg-purple-700 hover:bg-purple-800",
        teal: "bg-teal-700 hover:bg-teal-800",
        orange: "bg-orange-700 hover:bg-orange-800",
        pink: "bg-pink-700 hover:bg-pink-800",
        cyan: "bg-cyan-700 hover:bg-cyan-800",
    }[color] || "bg-slate-700 hover:bg-slate-800";

    return (
        <div
            className={`${bgColorClass} rounded-2xl shadow
        hover:shadow-lg transition-all flex flex-col justify-between`}
        >
            <div className="flex items-start gap-4 px-6 py-5">
                <div className="flex-1 text-right">
                    <div className="text-4xl font-extrabold text-gray-900 leading-snug">{count}</div>
                    <div className="text-base font-semibold text-gray-800 mt-1">{title}</div>
                </div>
                <div className={`${iconColorClass} text-5xl`}>
                    <Icon />
                </div>
            </div>

            <Link
                to={link}
                className={`rounded-b-2xl px-3 py-2 flex justify-center text-md text-white transition-all ${buttonColorClass}`}
            >
                اطلاعات بیشتر
            </Link>
        </div>
    );
}
