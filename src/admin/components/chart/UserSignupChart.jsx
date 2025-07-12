import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import moment from "moment-jalaali";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import CollapsibleCard from "../shared/CollapsibleCard";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function UserSignupChart() {
    const users = useSelector((state) => state.userStats.users);
    const [chartType, setChartType] = useState("bar"); // 'bar' یا 'line'

    const chartData = useMemo(() => {
        const counts = {};
        users.forEach((user) => {
            const date = user.createdAt.split("T")[0];
            counts[date] = (counts[date] || 0) + 1;
        });

        const formatted = Object.entries(counts)
            .map(([date, count]) => ({
                date: moment(date).format("jYYYY/jMM/jDD"),
                count,
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const labels = formatted.map((d) => d.date);
        const dataValues = formatted.map((d) => d.count);

        return {
            labels,
            datasets: [
                {
                    label: "کاربران ثبت‌نامی",
                    data: dataValues,
                    backgroundColor: "#059669",
                    borderColor: "#047857",
                    pointBackgroundColor: "#047857",
                    borderRadius: 4,
                    tension: 0.3, // فقط در Line chart معنی داره
                    fill: false,
                },
            ],
        };
    }, [users]);

    const maxY = Math.max(...chartData.datasets[0].data);
    const yStep = 5;
    const suggestedMax = Math.ceil((maxY + yStep) / yStep) * yStep;

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
                title: {
                    display: true,
                    text: "تاریخ",
                    font: {
                        size: 16,
                        weight: "800"
                    }
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax,
                ticks: {
                    stepSize: yStep,
                    font: {
                        size: 14,
                    },
                },
                title: {
                    display: true, text: "تعداد کاربران", font: {
                        size: 16,
                        weight: "800"
                    }
                },
            },
        },
    };

    return (
        <CollapsibleCard title="گزارش ثبت نام کاربران" icon={FaUserPlus} headerBgColor="#047857">
            <div className="">
                {/* Toggle Switch */}
                <div className="flex justify-end mb-4 gap-2">
                    <button
                        onClick={() => setChartType("bar")}
                        className={`px-4 py-1 rounded-md text-sm border ${chartType === "bar" ? "bg-emerald-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        نمودار میله‌ای
                    </button>
                    <button
                        onClick={() => setChartType("line")}
                        className={`px-4 py-1 rounded-md text-sm border ${chartType === "line" ? "bg-emerald-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        نمودار خطی
                    </button>
                </div>

                {/* Chart */}
                {chartType === "bar" ? (
                    <Bar data={chartData} options={{ ...options, aspectRatio: 2.5 }} />
                ) : (
                    <Line data={chartData} options={{ ...options, aspectRatio: 2.5 }} />
                )}
            </div>
        </CollapsibleCard>
    );
}