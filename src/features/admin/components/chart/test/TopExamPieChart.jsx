import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CollapsibleCard from "../../shared/CollapsibleCard";
import { FaChartPie } from "react-icons/fa";
import { filterByDateRange } from "../../../../../helper/dateFilters"
import TimeRangeSelector from "../../shared/TimeRangeSelector";
import { selectRecentActivities } from "../../../slices/dashboardSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#2563eb", "#f59e0b", "#16a34a"];

export default function TopExamPieChart() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const attempts = useSelector(selectRecentActivities) || [];
    const { tests } = useSelector((store) => store.tests);
    const [range, setRange] = useState("all");

    const filteredAttempts = useMemo(() => filterByDateRange(attempts, "completedAt", range), [attempts, range]);

    const chartData = useMemo(() => {
        if (!Array.isArray(filteredAttempts) || filteredAttempts.length === 0) {
            return {
                labels: ["هیچ داده‌ای موجود نیست"],
                datasets: [{
                    data: [1],
                    backgroundColor: ["#e5e7eb"],
                    borderColor: ["#9ca3af"],
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
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        return {
            labels: dataArray.map((d) => d.title),
            datasets: [
                {
                    data: dataArray.map((d) => d.count),
                    backgroundColor: COLORS.slice(0, dataArray.length),
                    borderColor: "#fff",
                    borderWidth: 2,
                },
            ],
        };
    }, [filteredAttempts, tests]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 15,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const label = context.label;
                        return `${label}: ${value} شرکت‌کننده`;
                    },
                },
            },
        },
    };

    return (
        <CollapsibleCard
            title="پرمصرف‌ترین آزمون‌ها"
            icon={FaChartPie}
            headerBgColor="#d97706"
        >
            <TimeRangeSelector onChange={setRange} defaultValue="1m" />
            <div className="w-full max-w-md mx-auto">
                <Doughnut data={chartData} options={options} />
            </div>
        </CollapsibleCard>
    );
}
