/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import CoursesList from "../features/courses/CoursesList";
import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate";
import { useEffect, useState } from "react";
import { fetchCourses } from "../features/courses/coursesSlice";
import { applyFilters } from "../helper/applyFilters";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import FiltersPanel from "../features/tests/FiltersPanel";
import { coursesFilterConfig } from "../components/filter/filterConfig";
import { getInitialSelectedFilters } from "../helper/helperFunction";

export default function Courses() {
  const { title, description, keywords } = translate.courses;
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((store) => store.courses);

  useEffect(() => {
    dispatch(fetchCourses())
  }, [])

  const [selectedFilters, setSelectedFilters] = useState(
    getInitialSelectedFilters(coursesFilterConfig)
  );

  const filteredExams = applyFilters(courses, selectedFilters);

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
            config={coursesFilterConfig}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className="lg:w-3/4 w-full">
          {loading && <p>در حال بارگذاری...</p>}
          {error && <p>خطا: {error}</p>}
          {!loading && !error && (
            <>
              <CoursesList
                courses={currentData}
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
