export default function WebinarTabs({ tabs, activeTab, onChange }) {
    return (
        <div className="relative mt-5 max-w-full overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
                <menu
                    className="
                        flex w-max
                        items-center gap-4 sm:gap-6
                        px-4 py-3 bg-white
                        border border-dashed border-[#6308FD33]
                        rounded-2xl shadow-sm
                    "
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`whitespace-nowrap text-sm sm:text-base md:text-lg px-2 sm:px-3 py-1 transition-all duration-150 ${activeTab === tab.id
                                    ? "text-[#7C3AED] font-semibold"
                                    : "text-gray-700 hover:text-[#7C3AED]"
                                }`}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </menu>
            </div>
        </div>

    );
}
