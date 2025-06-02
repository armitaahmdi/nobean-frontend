import { useState } from "react";
import FilterBox from "./FilterBox";
import FilterModalMobile from "./FilterModalMobile";
import translate from "../../locale/translate";
import { IoFilter } from "react-icons/io5";

export default function FilterGroup({ config, selectedFilters, setSelectedFilters }) {
    const [activeFilterKey, setActiveFilterKey] = useState(null);

    const hasActiveFilters = Object.values(selectedFilters).some((val) => {
        if (Array.isArray(val)) return val.length > 0;
        return val !== null && val !== "" && val !== undefined;
    });

    const clearAllFilters = () => {
        const emptyFilters = Object.keys(selectedFilters).reduce((acc, key) => {
            acc[key] = Array.isArray(selectedFilters[key]) ? [] : "";
            return acc;
        }, {});
        setSelectedFilters(emptyFilters);
        setActiveFilterKey(null);
    };


    return (
        <>
            {/* mobile */}
            <div className="lg:hidden flex items-center gap-3 overflow-x-auto whitespace-nowrap">
                <span
                    onClick={hasActiveFilters ? clearAllFilters : undefined}
                    className={`flex items-center gap-1 shrink-0 cursor-pointer ${hasActiveFilters ? "text-red-500" : ""
                        }`}
                    title={hasActiveFilters ? "حذف همه فیلترها" : ""}
                >
                    <IoFilter />
                    {hasActiveFilters ? "حذف فیلتر" : translate.filter}
                </span>

                {Object.entries(config).map(([key, { title }]) => (
                    <button
                        key={key}
                        onClick={() => setActiveFilterKey(key)}
                        className="text-right bg-white p-4 rounded-[20px] border shrink-0 whitespace-nowrap"
                    >
                        {title}
                    </button>
                ))}
            </div>

            {/* modal*/}
            {activeFilterKey && (
                <FilterModalMobile
                    title={config[activeFilterKey].title}
                    options={config[activeFilterKey].options}
                    selected={selectedFilters[activeFilterKey]}
                    isMultiSelect={config[activeFilterKey].multiple}
                    onChange={(newVal) =>
                        setSelectedFilters((prev) => ({
                            ...prev,
                            [activeFilterKey]: newVal,
                        }))
                    }
                    onClose={() => setActiveFilterKey(null)}
                />
            )}

            {/* desktop */}
            <div className="hidden lg:block">
                {hasActiveFilters && (
                    <div className="flex justify-start mb-4">
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-red-500 underline hover:text-red-700"
                        >
                            {translate.deletefilters}
                        </button>
                    </div>
                )}
                {Object.entries(config).map(([key, { title, options, multiple }]) => (
                    <div className="mb-4" key={key}>
                        <FilterBox
                            title={title}
                            options={options}
                            multiple={multiple}
                            selectedOption={selectedFilters[key]}
                            onSelect={(val) =>
                                setSelectedFilters((prev) => ({
                                    ...prev,
                                    [key]: val,
                                }))
                            }
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
