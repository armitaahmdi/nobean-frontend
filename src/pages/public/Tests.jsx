import TestsList from "../../features/user/tests/pages/TestsList";
import translate from "../../locale/translate"
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../features/user/tests/testsSlice";
import { testsFilterConfig } from "../../components/filter/filterConfig";
import FilterablePaginatedList from "../../components/filter/FilterablePaginatedList";
import TestsHeroSection from "../../components/tests/TestsHeroSection";
import PopularTestsSection from "../../components/tests/PopularTestsSection";
import EducationalContentSection from "../../components/tests/EducationalContentSection";
import QuickTestFinder from "../../components/tests/QuickTestFinder";
import TestimonialsSection from "../../components/tests/TestimonialsSection";
import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Tests() {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((store) => store.tests)
  const allTestsRef = useRef(null);
  const quickTestFinderRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Check if user is coming from pagination (has page parameter)
  const isFromPagination = searchParams.has('page');

  const handleViewAllTests = () => {
    allTestsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartTest = () => {
    quickTestFinderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top when first visiting the page (not from pagination)
  useEffect(() => {
    if (!isFromPagination) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isFromPagination]);

  return (
    <>
      {/* Hero Section */}
      <TestsHeroSection tests={tests} />
      
      {/* Popular Tests Section */}
      <PopularTestsSection onViewAllTests={handleViewAllTests} />
      
      {/* Educational Content Section */}
      <EducationalContentSection />
      
      {/* Quick Test Finder Section */}
      <div ref={quickTestFinderRef} className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <QuickTestFinder />
        </div>
      </div>
      
      {/* All Tests Section */}
      <div ref={allTestsRef} className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              همه آزمون‌ها
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مجموعه کامل آزمون‌های تشخیص اختلالات یادگیری
            </p>
          </div>
        </div>
        
        {/* Main Content */}
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
          scrollToTop={false}
          scrollToElement={isFromPagination ? allTestsRef.current : null}
        />
      </div>
      
      {/* Testimonials Section */}
      <TestimonialsSection onStartTest={handleStartTest} />
    </>
  )
}