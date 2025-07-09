import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import AboutTab from "../consultant/AboutTab";
import LocationTab from "../consultant/LocationTab";
import ScheduleTab from "../consultant/ScheduleTab";
import ReviewsTab from "./ReviewsTab";
import DescriptionTab from "../test/DescriptionTab";
import FaqTab from "../shared/FaqTab";
import TestValidityTab from "../test/TestValidityTab"
import translate from "../../../locale/translate";

export default function Tabs({ tabs, data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabKey = searchParams.get("tab") || tabs[0].key;
  const activeTabObj = tabs.find((tab) => tab.key === activeTabKey);

  const scheduleRef = useRef(null);

  useEffect(() => {
    if (activeTabKey === "schedule" && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTabKey]);

  const handleTabClick = (tabKey) => {
    setSearchParams({ tab: tabKey });
  };

  const renderActiveTab = () => {
    if (!activeTabObj || !data) return null;

    switch (activeTabObj.key) {
      case "description":
        return <DescriptionTab description={data.description} video={data.video} />
      case "faq":
        return <FaqTab faq={data.faq} />
      // case "validity":
      //   return <TestValidityTab validity={data} />
      case "about":
        return <AboutTab consultant={data} />;
      case "location":
        return <LocationTab service={data} />;
      case "schedule":
        return (
          <div ref={scheduleRef}>
            <ScheduleTab schedule={data.schedule} />
          </div>
        );
      case "reviews":
        return <ReviewsTab reviews={data.reviews || []} />;
      default:
        return <p>{translate.nocontent}</p>;
    }
  };

  return (
    <>
      <div className="bg-white [box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_-20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[20px] mb-8 py-6 lg:p-6 shadow-lg">
        <nav
          className="
            flex justify-start md:justify-center border-b border-gray-300 pb-3 mb-6 overflow-x-auto scrollbar-hide
          "
          role="tablist"
          aria-label="Tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTabKey === tab.key;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.key)}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`
                  relative px-4 py-2 text-sm md:text-base font-medium
                  transition-colors duration-300
                  ${isActive
                    ? "text-darkBlue after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-darkBlue"
                    : "text-gray-600 hover:text-darkBlue"
                  }
                  whitespace-nowrap
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-6">{renderActiveTab()}</div>
      </div>

      <div id={tabsEndRefId} className="h-1" />
    </>
  );
}

export const tabsEndRefId = "tabs-end-marker";