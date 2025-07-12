import moment from "moment-jalaali";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollapsibleCard from "../shared/CollapsibleCard";
import { TbUsersPlus } from "react-icons/tb";

export default function RecentUsersTable({ limit = 10 }) {
    const users = useSelector((state) => state.userStats.users);

    // جدیدترین‌ها از بالا
    const sortedUsers = [...users]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

    return (
        <CollapsibleCard title="کاربران ثبت‌ نامی اخیر" icon={TbUsersPlus}>
            <div className="bg-white rounded-lg px-4 pt-4 max-w-3xl w-full mx-auto">
                <table className="w-full text-sm border">
                    <thead className="bg-gray-100 text-right">
                        <tr>
                            <th className="p-2 border">نام</th>
                            <th className="p-2 border">شماره ثبت‌نام</th>
                            <th className="p-2 border">تاریخ ثبت‌نام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user) => (
                            <tr key={user.id} className="text-right">
                                <td className="p-2 border">{user.name || "—"}</td>
                                <td className="p-2 border">{user.phoneNumber}</td>
                                <td className="p-2 border">
                                    {moment(user.createdAt).format("jYYYY/jMM/jDD")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 text-center">
                    <Link
                        to="/admin/users"
                        className="text-[#3b82f6] hover:underline text-md font-bold"
                    >
                        مشاهده همه کاربران 
                    </Link>
                </div>
            </div>
        </CollapsibleCard>
    );
}
