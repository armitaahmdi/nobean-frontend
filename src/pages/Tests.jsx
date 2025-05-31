import { useState } from "react";
import TestsList from "../features/tests/TestsList";
import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate"
import FiltersPanel from "../features/tests/FiltersPanel";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/pagination/Pagination";
import { applyFilters } from "../helper/applyFilters";
import { examsData } from "../constants/examData";

export default function Tests() {
  const { title, description, keywords } = translate.tests;
  
  const [selectedFilters, setSelectedFilters] = useState({
    badges: "",
    categories: "",
    sortOptions: "",
  });

  const filteredExams = applyFilters(examsData, selectedFilters); // توضیح در ادامه

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
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>


        <div className="lg:w-3/4 w-full">
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
        </div>
      </div>
    </>
  )
}
