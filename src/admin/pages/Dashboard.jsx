import { useEffect, useState, useMemo } from "react";
import StatsGroup from "../components/StatsGroup";
import { statItems } from "../config/statSections";
import UserSignupChart from "../components/chart/UserSignupChart";
import statistics from "../assets/statistics.png"
import RecentUsersTable from "../components/tables/RecentUsersTable";
import ExamAttemptsChart from "../components/chart/ExamAttemptsChart";

export default function Dashboard() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // شبیه‌سازی fetch داده
        setTimeout(() => {
            const fakeData = [
                { key: "users", count: 230 },
                { key: "exams", count: 18 },
                { key: "examsTaken", count: 450 },
                { key: "coursesPurchased", count: 120 },
                { key: "consultants", count: 12 },
                { key: "successfulConsultations", count: 85 },
                { key: "articles", count: 45 },
                { key: "podcasts", count: 10 },
                { key: "comments", count: 280 },
            ];
            setStats(fakeData);
            setLoading(false);
        }, 1000);
    }, []);

    const statsMap = useMemo(() => {
        const map = {};
        stats.forEach(s => {
            map[s.key] = s.count;
        });
        return map;
    }, [stats]);

    if (loading) return <p>در حال بارگذاری آمار...</p>;

    return (
        <div className="flex flex-col gap-10">
            {/* Stat Cards */}
            <StatsGroup items={statItems} statsMap={statsMap} />

            {/* Charts */}
            <div className="flex items-baseline">
                <img className="w-10 h-10" src={statistics} alt="admin panel" />
                <h1 className="mx-2 font-semibold text-lg">گزارش ها</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Chart Section */}
                <div className="lg:w-2/3 w-full">
                    <UserSignupChart />
                </div>

                {/* Recent Users Table */}
                <div className="lg:w-1/3 w-full">
                    <RecentUsersTable />
                </div>
            </div>
            <div>
                <ExamAttemptsChart />
            </div>
        </div>
    );
}
