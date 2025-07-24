import { useDispatch, useSelector } from "react-redux";
import CoursesList from "../features/courses/pages/CoursesList";
import translate from "../locale/translate";
import { fetchCourses } from "../features/courses/coursesSlice";
import { coursesFilterConfig } from "../components/filter/filterConfig";
import FilterablePaginatedList from "../components/filter/FilterablePaginatedList";

export default function Courses() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((store) => store.courses);

  return (
    <>
      <FilterablePaginatedList
        fetchAction={fetchCourses}
        items={courses}
        loading={loading}
        error={error}
        config={coursesFilterConfig}
        ListComponent={({ data, selectedFilters }) => (
          <CoursesList
            courses={data}
            selectedSort={selectedFilters.sortOptions}
            selectedCategory={selectedFilters.categories}
            selectedBadge={selectedFilters.target_audience}
          />
        )}
        seo={translate.courses}
        filtersProps={{ dispatch }}
      />
    </>
  )
}
