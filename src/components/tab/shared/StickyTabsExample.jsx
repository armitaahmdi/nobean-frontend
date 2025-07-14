import React, { useEffect, useRef, useState } from "react";

const tabs = [
    { id: "about", label: "درباره" },
    { id: "schedule", label: "زمان‌بندی" },
    { id: "location", label: "آدرس مطب" },
    { id: "reviews", label: "نظرات" },
];

export default function StickyTabsExample() {
    const [activeTab, setActiveTab] = useState("about");
    const [isSticky, setIsSticky] = useState(false);
    const tabsRef = useRef(null);
    const sentinelRef = useRef(null);
    const endRef = useRef(null);
    const [tabsHeight, setTabsHeight] = useState(0);

    useEffect(() => {
        if (tabsRef.current) {
            setTabsHeight(tabsRef.current.getBoundingClientRect().height);
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (!sentinelRef.current || !endRef.current) return;

            const sentinelRect = sentinelRef.current.getBoundingClientRect();
            const endRect = endRef.current.getBoundingClientRect();

            if (sentinelRect.bottom <= 0 && endRect.top > tabsHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [tabsHeight]);

    const onClickTab = (id) => {
        setActiveTab(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div>
            {/* spacer sentinel */}
            <div ref={sentinelRef} />

            {/* spacer برای جلوگیری از پرش صفحه هنگام sticky */}
            {isSticky && <div style={{ height: tabsHeight }} />}

            <nav
                ref={tabsRef}
                style={{
                    position: isSticky ? "fixed" : "relative",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: "1rem",
                        overflowX: "auto",
                    }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onClickTab(tab.id)}
                            style={{
                                padding: "0.5rem 1rem",
                                borderBottom: activeTab === tab.id ? "2px solid blue" : "2px solid transparent",
                                fontWeight: activeTab === tab.id ? "bold" : "normal",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* محتوا */}
            <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
                {tabs.map((tab) => (
                    <section
                        key={tab.id}
                        id={tab.id}
                        style={{ paddingTop: tabsHeight + 20, marginBottom: "4rem" }}
                    >
                        <h2>{tab.label}</h2>
                        <p>محتوای تب {tab.label} اینجا قرار می‌گیرد.</p>
                        <p>...</p>
                        <p>...</p>
                    </section>
                ))}
                

                {/* sentinel انتهای محتوا برای غیرفعال کردن sticky */}
                <div ref={endRef} style={{ height: 1 }} />
            </div>
        </div>
    );
}
