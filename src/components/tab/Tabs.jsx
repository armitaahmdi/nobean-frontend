import { useSearchParams } from "react-router-dom";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";
import FaqTab from "./FaqTab";
import TestValidityTab from "./TestValidityTab";
import translate from "../../locale/translate";
import SubmitComment from "../card/SubmitComment";

export default function Tabs({ tabs, data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabKey = searchParams.get("tab") || tabs[0].key;
  const activeTabObj = tabs.find((tab) => tab.key === activeTabKey);

  const handleTabClick = (tabKey) => {
    setSearchParams({ tab: tabKey });
  };

  const renderActiveTab = () => {
    if (!activeTabObj) return null;

    switch (activeTabObj.key) {
      case "description":
        return <DescriptionTab description={data.description} video={data.video} />;
      case "reviews":
        return <ReviewsTab reviews={data.reviews} />;
      case "faq":
        return <FaqTab faq={data.faq} />;
      case "testValidity":
        return <TestValidityTab validity={data.validity} />;
      default:
        return (
          <p className="text-gray-600 leading-relaxed">
            {translate.nocontent}
          </p>
        );
    }
  };

  return (
    <>
      <div className="bg-white rounded-[20px] lg:w-[85%] p-4 md:p-6">
        {/* Tab Headers */}
        <div
          className="
          flex justify-start md:justify-around gap-4 border-b border-gray-200 pb-2 mb-4 overflow-x-auto scrollbar-hide           
        "
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.key)}
              className={`
              pb-2 whitespace-nowrap text-sm sm:text-base transition-colors duration-200
              ${activeTabKey === tab.key
                  ? "text-darkBlue font-bold"
                  : "hover:text-darkBlue"
                }
            `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">{renderActiveTab()}</div>
      </div>

      {activeTabKey === "reviews" && (
        <div className="mt-10">
          <SubmitComment />
        </div>
      )}

    </>
  );
}
