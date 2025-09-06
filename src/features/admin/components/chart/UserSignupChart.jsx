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
import TimeRangeSelector from "../shared/TimeRangeSelector";
import ExcelExportButton from "../shared/ExcelExportButton"
import { filterByDateRange } from "../../../../helper/dateFilters";

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
    const { tests } = useSelector((state) => state.tests);
    const [chartType, setChartType] = useState("bar");
    const [range, setRange] = useState("1m");

    const filteredUsers = useMemo(() => {
        return filterByDateRange(users, "created_at", range);
    }, [users, range]);

    const chartData = useMemo(() => {
        const counts = {};
        filteredUsers.forEach((user) => {
            const date = user.created_at.split("T")[0];
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
                    tension: 0.3,
                    fill: false,
                },
            ],
        };
    }, [filteredUsers]);

    const maxY = Math.max(...chartData.datasets[0].data, 0);
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
                ticks: { font: { size: 14 } },
                title: {
                    display: true,
                    text: "تاریخ",
                    font: { size: 16, weight: "800" },
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax,
                ticks: { stepSize: yStep, font: { size: 14 } },
                title: {
                    display: true,
                    text: "تعداد کاربران",
                    font: { size: 16, weight: "800" },
                },
            },
        },
    };

    // const exportData = useMemo(() => {
    //     return filteredUsers.map(user => ({
    //         "نام": user.full_name || user.name || "—",
    //         "شماره تماس": user.phoneNumber || "—",
    //         "تاریخ ثبت‌نام": moment(user.created_at).format("jYYYY/jMM/jDD"),
    //     }));
    // }, [filteredUsers]);
    // const exportData = useMemo(() => {
    //     return filteredUsers.flatMap(user => {
    //         const base = {
    //             "نام": user.full_name || user.name || "—",
    //             "شماره تماس": user.phoneNumber || "—",
    //         };

    //         const signupRow = {
    //             ...base,
    //             "نوع فعالیت": "ثبت‌نام",
    //             "تاریخ": moment(user.created_at).format("jYYYY/jMM/jDD"),
    //             "جزئیات": "—",
    //         };

    //         const examRows = (user.examsTaken || []).map(exam => ({
    //             ...base,
    //             "نوع فعالیت": "آزمون",
    //             "تاریخ": moment(exam.takenAt).format("jYYYY/jMM/jDD"),
    //             "جزئیات": `نمره: ${exam.score}`,
    //         }));

    //         const courseRows = (user.coursesPurchased || []).map(course => ({
    //             ...base,
    //             "نوع فعالیت": "دوره",
    //             "تاریخ": moment(course.purchasedAt).format("jYYYY/jMM/jDD"),
    //             "جزئیات": course.courseTitle || "—",
    //         }));

    //         return [signupRow, ...examRows, ...courseRows];
    //     });
    // }, [filteredUsers]);
    const exportData = useMemo(() => {
        return filteredUsers.flatMap(user => {
            const base = {
                "نام": user.full_name || user.name || "—",
                "شماره تماس": user.phoneNumber || "—",
            };

            const signupRow = {
                ...base,
                "نوع فعالیت": "ثبت‌نام",
                "تاریخ": moment(user.created_at).format("jYYYY/jMM/jDD"),
                "جزئیات": "—",
            };

            const examRows = (user.examsTaken || []).map(exam => {
                const examTitle = tests.find(t => t.id === exam.examId)?.title || `آزمون #${exam.examId}`;
                return {
                    ...base,
                    "نوع فعالیت": "آزمون",
                    "تاریخ": moment(exam.takenAt).format("jYYYY/jMM/jDD"),
                    "جزئیات": `نام: ${examTitle}\nنمره: ${exam.score}`,
                };
            });

            const courseRows = (user.coursesPurchased || []).map(course => ({
                ...base,
                "نوع فعالیت": "دوره",
                "تاریخ": moment(course.purchasedAt).format("jYYYY/jMM/jDD"),
                "جزئیات": course.courseTitle || "—",
            }));

            return [signupRow, ...examRows, ...courseRows];
        });
    }, [filteredUsers, tests]);


    return (
        <CollapsibleCard
            title="گزارش ثبت نام کاربران"
            icon={FaUserPlus}
            headerBgColor="#047857"
        >
            <div className="flex justify-between items-center mb-4">
                <TimeRangeSelector onChange={setRange} defaultValue="1m" />
                <ExcelExportButton
                    data={exportData}
                    fileName="user-signups.xlsx"
                    sheetName="Signups"
                    columns={[
                        { label: "نام", key: "نام" },
                        { label: "شماره تماس", key: "شماره تماس" },
                        { label: "نوع فعالیت", key: "نوع فعالیت" },
                        { label: "تاریخ", key: "تاریخ" },
                        { label: "جزئیات", key: "جزئیات" },
                    ]}
                    label="خروجی اکسل کاربران"
                />

            </div>

            {/* سوییچ نمودار */}
            <div className="flex justify-end mb-4 gap-2">
                <button
                    onClick={() => setChartType("bar")}
                    className={`px-4 py-1 rounded-md text-sm border ${chartType === "bar" ? "bg-emerald-500 text-white" : "bg-gray-100"}`}
                >
                    نمودار میله‌ای
                </button>
                <button
                    onClick={() => setChartType("line")}
                    className={`px-4 py-1 rounded-md text-sm border ${chartType === "line" ? "bg-emerald-500 text-white" : "bg-gray-100"}`}
                >
                    نمودار خطی
                </button>
            </div>

            {/* نمودار */}
            {chartType === "bar" ? (
                <Bar data={chartData} options={{ ...options, aspectRatio: 2.5 }} />
            ) : (
                <Line data={chartData} options={{ ...options, aspectRatio: 2.5 }} />
            )}
        </CollapsibleCard>
    );
}
