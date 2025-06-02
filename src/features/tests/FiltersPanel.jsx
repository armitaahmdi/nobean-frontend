import FilterGroup from "../../components/filter/FilterGroup";

export default function FiltersPanel({
  config,
  selectedFilters,
  setSelectedFilters,
}) {

  return (
    <FilterGroup
      config={config}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );
}
