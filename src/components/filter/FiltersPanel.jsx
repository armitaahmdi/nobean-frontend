import FilterGroup from "./FilterGroup";

export default function FiltersPanel({
  config,
  selectedFilters,
  setSelectedFilters,
  isMobile = false,
}) {

  return (
    <FilterGroup
      config={config}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
      isMobile={isMobile}
    />
  );
}
