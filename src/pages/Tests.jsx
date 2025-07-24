import TestsList from "../features/tests/pages/TestsList";
import translate from "../locale/translate"
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../features/tests/testsSlice";
import { testsFilterConfig } from "../components/filter/filterConfig";
import FilterablePaginatedList from "../components/filter/FilterablePaginatedList";

export default function Tests() {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((store) => store.tests)

  return (
    <>
      <FilterablePaginatedList
        fetchAction={fetchTests}
        items={tests}
        loading={loading}
        error={error}
        config={testsFilterConfig}
        ListComponent={({ data, selectedFilters }) => (
          <TestsList
            tests={data}
            selectedSort={selectedFilters.sortOptions}
            selectedCategory={selectedFilters.categories}
            selectedBadge={selectedFilters.target_audience}
          />
        )}
        seo={translate.tests}
        filtersProps={{ dispatch }}
      />
    </>
  )
}
