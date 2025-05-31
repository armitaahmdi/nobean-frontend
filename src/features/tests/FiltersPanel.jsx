import commonFilters from "../../constants/filterConfigs";
import FilterGroup from "../../components/filter/FilterGroup";

export default function FiltersPanel({
  selectedFilters,
  setSelectedFilters,
}) {
  const config = commonFilters;

  return (
    <FilterGroup
      config={config}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );
}
