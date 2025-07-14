import { useState, useEffect, useRef } from "react";
import AboutTab from "../consultant/AboutTab";
import ScheduleTab from "../consultant/ScheduleTab";
import LocationTab from "../consultant/LocationTab";
import ReviewsCard from "../../reviews/ReviewsCard";
import translate from "../../../locale/translate";
import consultantImage from "../../../assets/images/icons/consultant.png";
import locationImage from "../../../assets/images/icons/location.png";
import calenderImage from "../../../assets/images/icons/schedule.png"
import commentImage from "../../../assets/images/icons/social-media.png"

const tabs = [
    { id: "about", label: "درباره" },
    { id: "schedule", label: "زمان‌بندی" },
    { id: "location", label: "آدرس مطب" },
    { id: "reviews", label: "نظرات" },
];

export default function AnchorTabs({ consultant }) {
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
        function onScroll() {
            if (!sentinelRef.current || !endRef.current) return;
            const sentinelRect = sentinelRef.current.getBoundingClientRect();
            const endRect = endRef.current.getBoundingClientRect();

            if (sentinelRect.bottom <= 0 && endRect.top > tabsHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [tabsHeight]);

    const handleClick = (id) => {
        setActiveTab(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <div ref={sentinelRef} />
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
                    borderTopRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "1rem", overflowX: "auto" }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleClick(tab.id)}
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

            {/* محتوای تب‌ها */}
            <div className="bg-white/80 rounded-b-[20px]" style={{ padding: "1rem", margin: "auto" }}>
                <section id="about" style={{ marginBottom: "4rem" }}>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <img src={consultantImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
                        {translate.consultantDesc}
                    </h2>
                    <div><AboutTab consultant={consultant} /></div>
                </section>

                <section id="schedule" style={{ paddingTop: tabsHeight + 20, marginBottom: "4rem" }}>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <img src={calenderImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
                        {translate.schaduleTimming}
                    </h2>
                    <ScheduleTab schedule={consultant.schedule} />
                </section>

                <section id="location" style={{ paddingTop: tabsHeight + 20, marginBottom: "4rem" }}>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <img src={locationImage} alt={translate.altdescription} className="w-7 h-7 object-cover" />
                        {translate.clinicaddress}
                    </h2>
                    <LocationTab service={consultant} />
                </section>

                <section id="reviews" style={{ paddingTop: tabsHeight + 20, marginBottom: "4rem" }}>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <img src={commentImage} alt={translate.clinicaddress} className="w-7 h-7 object-cover" />
                        {translate.ratingandcomment}
                    </h2>
                    <ReviewsCard reviews={consultant.reviews || []} />
                </section>

                {/* این div نقش sentinel انتهای محتوا رو داره */}
                <div ref={endRef} style={{ height: 1 }} />
            </div>
        </>
    );
}
