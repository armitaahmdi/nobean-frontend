/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CollapsibleCard from "../shared/CollapsibleCard";
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
    const attempts = useSelector((state) => state.examAttempts.list) || [];
    const { tests } = useSelector((store) => store.tests);
    const [chartType, setChartType] = useState("bar");

    const chartData = useMemo(() => {
        if (!Array.isArray(attempts) || !Array.isArray(tests)) {
            return { labels: [], datasets: [] };
        }

        const examCountMap = {};
        attempts.forEach((a) => {
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
    }, [attempts, tests, chartType]);

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

    return (
        <CollapsibleCard
            title="آزمون‌های پرکاربرد"
            icon={FaClipboardList}
            headerBgColor="#b45309" // رنگ مشابه نارنجی تیره‌تر
        >
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
