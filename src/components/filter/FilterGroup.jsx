import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import FilterModalMobile from "./FilterModalMobile";
import { useSearchParams } from "react-router-dom";
import translate from "../../locale/translate";
import SearchBox from "../shared/SearchBox";

export default function FilterGroup({ config, selectedFilters, setSelectedFilters, isMobile = false }) {
    const [activeFilterKey, setActiveFilterKey] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const parseParamValue = (value, multiple) => multiple ? value.split(",").filter(Boolean) : value;

    useEffect(() => {
        const initialFilters = {};
        for (const [key, { multiple }] of Object.entries(config)) {
            const urlValue = searchParams.get(key);
            if (urlValue) {
                initialFilters[key] = parseParamValue(urlValue, multiple);
            } else {
                initialFilters[key] = multiple ? [] : "";
            }
        }
        setSelectedFilters(initialFilters);
    }, [config, searchParams, setSelectedFilters]);

    const handleFilterChange = (key, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: value,
        }));

        const newParams = new URLSearchParams(searchParams);
        if (!value || (Array.isArray(value) && value.length === 0)) {
            newParams.delete(key);
        } else {
            newParams.set(key, Array.isArray(value) ? value.join(",") : value);
        }
        setSearchParams(newParams);
    };

    return (
        <>
            {/* Mobile Layout */}
            {isMobile ? (
                <div className="flex flex-col gap-6">
                    <div className="mb-4">
                        <SearchBox />
                    </div>
                    
                    {Object.entries(config).map(([key, { title, options, multiple, icon }]) => (
                        <div key={key}>
                            <FilterBox
                                title={title}
                                options={options}
                                icon={icon}
                                multiple={multiple}
                                selectedOption={selectedFilters[key]}
                                onSelect={(val) => handleFilterChange(key, val)}
                                isCategory={key === "categories"}
                                isMobile={true}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                        <div className="mb-6 bg-sky-50 p-6 rounded-2xl shadow-xl border border-sky-100">
                            <SearchBox />
                        </div>

                        {Object.entries(config).map(([key, { title, options, multiple, icon }]) => (
                            <div className="mb-4" key={key}>
                                <FilterBox
                                    title={title}
                                    options={options}
                                    icon={icon}
                                    multiple={multiple}
                                    selectedOption={selectedFilters[key]}
                                    onSelect={(val) => handleFilterChange(key, val)}
                                    isCategory={key === "categories"}
                                    isMobile={false}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tablet/Mobile Layout */}
                    <div className="lg:hidden flex flex-col gap-4">
                        <div className="mb-2">
                            <SearchBox />
                        </div>
                        
                        {config.categories && (
                            <>
                                <h4 className="text-gray-700 font-bold mb-2 text-md select-none">{translate.categories}</h4>
                                <div className="scrollbar-none scroll-smooth snap-x">
                                    <div className="flex sm:justify-center gap-3 pb-2 pr-4">
                                        {config.categories.options.map((option) => {
                                            const isSelected = selectedFilters.categories === option.name;
                                            return (
                                                <button
                                                    key={option.name}
                                                    onClick={() => {
                                                        const newValue = isSelected ? "" : option.name;
                                                        handleFilterChange("categories", newValue);
                                                    }}
                                                    className={`
                                                    flex flex-col items-center justify-center min-w-[80px] max-w-[80px]
                                                    p-2 cursor-pointer border rounded-xl shrink-0 transition-all
                                                    shadow-sm hover:shadow-md
                                                    ${isSelected ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white hover:bg-gray-50"}
                                                  `}
                                                >
                                                    <img
                                                        src={option.image}
                                                        alt={option.name}
                                                        className="w-14 h-14 rounded-full object-cover"
                                                    />
                                                    <span className="text-md font-bold text-center mt-2 text-gray-700 leading-tight">{option.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Other Filters */}
                        <div className="flex items-center gap-3 whitespace-nowrap">
                            {Object.entries(config).map(([key, { title, icon: Icon }]) => (
                                key !== "categories" && (
                                    <button
                                        key={key}
                                        onClick={() => setActiveFilterKey(key)}
                                        className="flex items-center gap-2 text-right bg-white shadow-lg p-4 rounded-[20px] border shrink-0 whitespace-nowrap hover:shadow-xl transition-shadow"
                                    >
                                        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
                                        {title}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Mobile Modal */}
                    {activeFilterKey && (
                        <FilterModalMobile
                            title={config[activeFilterKey].title}
                            options={config[activeFilterKey].options}
                            icon={config[activeFilterKey].icon}
                            selected={selectedFilters[activeFilterKey]}
                            isMultiSelect={config[activeFilterKey].multiple}
                            onChange={(newVal) => handleFilterChange(activeFilterKey, newVal)}
                            onClose={() => setActiveFilterKey(null)}
                            isCategory={false}
                        />
                    )}
                </>
            )}
        </>
    );
}
