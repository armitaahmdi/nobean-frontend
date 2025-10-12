/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CollapsibleCard from "../../shared/CollapsibleCard";
import TimeRangeSelector from "../../shared/TimeRangeSelector";
import ExcelExportButton from "../../shared/ExcelExportButton";
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
import { FaClipboardList } from "react-icons/fa";
import { filterByDateRange } from "../../../../../helper/dateFilters"
import moment from "moment-jalaali";
import { selectRecentActivities } from "../../../slices/dashboardSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function ExamAttemptsChart() {
    const attempts = useSelector(selectRecentActivities);
    const users = useSelector((state) => state.userStats.users);
    const { tests } = useSelector((store) => store.tests);
    const [chartType, setChartType] = useState("bar");
    const [range, setRange] = useState("1m");

    const filteredAttempts = useMemo(() => {
        return filterByDateRange(attempts || [], "completedAt", range);
    }, [attempts, range]);

    const chartData = useMemo(() => {
        if (!Array.isArray(filteredAttempts) || filteredAttempts.length === 0) {
            return { 
                labels: ["هیچ داده‌ای موجود نیست"], 
                datasets: [{
                    label: "تعداد شرکت در آزمون",
                    data: [0],
                    backgroundColor: "#e5e7eb",
                    borderColor: "#9ca3af",
                    borderWidth: 1,
                }]
            };
        }

        if (!Array.isArray(tests)) {
            return { labels: [], datasets: [] };
        }

        const examCountMap = {};
        filteredAttempts.forEach((a) => {
            examCountMap[a.examId] = (examCountMap[a.examId] || 0) + 1;
        });

        const dataArray = Object.entries(examCountMap)
            .map(([examId, count]) => {
                const exam = tests.find((t) => t.id === parseInt(examId));
                return {
                    title: exam?.title || `آزمون ${examId}`,
                    count,
                };
            })
            .sort((a, b) => b.count - a.count);

        const labels = dataArray.map((d) => d.title);
        const dataValues = dataArray.map((d) => d.count);

        return {
            labels,
            datasets: [
                {
                    label: "تعداد شرکت در آزمون",
                    data: dataValues,
                    backgroundColor: "#d97706",
                    borderColor: "#b45309",
                    borderWidth: 1,
                    borderRadius: 4,
                    tension: chartType === "line" ? 0.3 : 0,
                    fill: chartType === "line" ? false : undefined,
                    pointBackgroundColor: chartType === "line" ? "#b45309" : undefined,
                },
            ],
        };
    }, [filteredAttempts, tests, chartType]);

    const maxY = Math.max(...chartData.datasets[0]?.data || [0], 0);
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
                    font: { size: 14 },
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: false,
                },
                title: {
                    display: true,
                    text: "عنوان آزمون",
                    font: { size: 16, weight: "800" },
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax,
                ticks: {
                    stepSize: yStep,
                    font: { size: 14 },
                },
                title: {
                    display: true,
                    text: "تعداد شرکت‌کننده",
                    font: { size: 16, weight: "800" },
                },
            },
        },
    };

    const excelData = useMemo(() => {
        return filteredAttempts.map((attempt) => {
            const exam = tests.find((t) => t.id === attempt.examId);
            const user = users.find((u) => u.id === attempt.userId);

            return {
                "عنوان آزمون": exam?.title || `آزمون ${attempt.examId}`,
                "نام کاربر": user?.full_name || user?.name || "—",
                "تاریخ شرکت": moment(attempt.created_at).format("jYYYY/jMM/jDD"),
                "نمره": attempt.score ?? "—",
            };
        });
    }, [filteredAttempts, tests, users]);


    return (
        <CollapsibleCard
            title="آزمون‌های انجام شده"
            icon={FaClipboardList}
            headerBgColor="#b45309" // رنگ مشابه نارنجی تیره‌تر
        >
            <div className="flex justify-between mb-3">
                <TimeRangeSelector onChange={setRange} defaultValue="1m" />
                <ExcelExportButton
                    data={excelData}
                    columns={[
                        { label: "عنوان آزمون", key: "عنوان آزمون" },
                        { label: "نام کاربر", key: "نام کاربر" },
                        { label: "تاریخ شرکت", key: "تاریخ شرکت" },
                        { label: "نمره", key: "نمره" },
                    ]}
                    fileName="exam-attempts.xlsx"
                    sheetName="ExamAttempts"
                    label="خروجی اکسل آزمون‌ها"
                />
            </div>
            <div>
                {/* دکمه انتخاب نوع نمودار */}
                <div className="flex justify-end mb-4 gap-2">
                    <button
                        onClick={() => setChartType("bar")}
                        className={`px-4 py-1 rounded-md text-sm border ${chartType === "bar" ? "bg-amber-500 text-white" : "bg-gray-100"}`}
                    >
                        نمودار میله‌ای
                    </button>
                    <button
                        onClick={() => setChartType("line")}
                        className={`px-4 py-1 rounded-md text-sm border ${chartType === "line" ? "bg-amber-500 text-white" : "bg-gray-100"}`}
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
            </div>
        </CollapsibleCard>
    );
}
