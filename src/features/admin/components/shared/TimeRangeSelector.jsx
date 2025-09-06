import { useState } from "react";

const ranges = [
    { label: "۷ روز گذشته", value: "7d" },
    { label: "۱ ماه گذشته", value: "1m" },
    { label: "۳ ماه گذشته", value: "3m" },
    { label: "همه داده‌ها", value: "all" },
];

export default function TimeRangeSelector({ onChange, defaultValue = "1m" }) {
    const [selected, setSelected] = useState(defaultValue);

    const handleClick = (value) => {
        setSelected(value);
        onChange(value);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {ranges.map((r) => (
                <button
                    key={r.value}
                    onClick={() => handleClick(r.value)}
                    className={`px-3 py-1 rounded-md text-sm border transition ${selected === r.value
                            ? "bg-gray-300 text-gray-800 border-gray-400"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
