/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TestsList from "../features/tests/TestsList";
import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate"
import FiltersPanel from "../features/tests/FiltersPanel";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import { applyFilters } from "../helper/applyFilters";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../features/tests/testsSlice";
import { testsFilterConfig } from "../components/filter/filterConfig";
import { getInitialSelectedFilters } from "../helper/helperFunction";

export default function Tests() {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((store) => store.tests)
  const { title, description, keywords } = translate.tests;

  useEffect(() => {
    dispatch(fetchTests())
  }, [])

  const [selectedFilters, setSelectedFilters] = useState(
    getInitialSelectedFilters(testsFilterConfig)
  );

  const filteredExams = applyFilters(tests, selectedFilters);

  const {
    currentData,
    currentPage,
    totalPages,
    goToPage
  } = usePagination(filteredExams, 12);

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        <div className="lg:w-1/4 w-full">
          <FiltersPanel
            config={testsFilterConfig}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>


        <div className="lg:w-3/4 w-full">
          {loading && <p>در حال بارگذاری...</p>}
          {error && <p>خطا: {error}</p>}
          {!loading && !error && (
            <>
              <TestsList
                tests={currentData}
                selectedBadge={selectedFilters.badges}
                selectedSort={selectedFilters.sortOptions}
                selectedCategory={selectedFilters.categories}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
