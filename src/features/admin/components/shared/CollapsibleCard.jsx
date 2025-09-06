import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function CollapsibleCard({ title, icon: Icon, children, headerBgColor = "#3b82f6" /* رنگ پیش‌فرض آبی */ }) {
    const [collapsed, setCollapsed] = useState(false);
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
        if (collapsed) {
            setMaxHeight("0px");
        } else {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, [collapsed]);

    return (
        <div className="border rounded-lg shadow-md bg-white w-full">
            <div
                className="flex justify-between items-center p-4 cursor-pointer select-none"
                onClick={() => setCollapsed(!collapsed)}
                style={{ backgroundColor: headerBgColor, color: "white" }}
            >
                <div className="flex items-center gap-2 rtl:gap-x-reverse">
                    {Icon && <Icon className="text-white text-xl" />}
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <button
                    aria-label={collapsed ? "باز کردن نمودار" : "بستن نمودار"}
                    className="text-lg font-bold"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCollapsed(!collapsed);
                    }}
                    style={{ backgroundColor: headerBgColor, color: "white", border: "none" }}
                >
                    {collapsed ? <FaPlus /> : <FaMinus />}
                </button>
            </div>

            {/* Body - نمودار با انیمیشن */}
            <div
                ref={contentRef}
                style={{
                    maxHeight,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.4s ease",
                    opacity: collapsed ? 0 : 1,
                }}
            >
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
