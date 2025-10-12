/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import FiltersPanel from "./FiltersPanel";
import usePagination from "../../hooks/usePagination";
import Pagination from "../shared/Pagination";
import { applyFilters } from "../../helper/applyFilters";
import { getInitialSelectedFilters } from "../../helper/helperFunction";
import HelmetSeo from "../../helper/helmet";
import LoadingState from "../ui/LoadingState";
import ErrorState from "../ui/ErrorState";

export default function FilterablePaginatedList({
    fetchAction,
    items,
    loading,
    error,
    config,
    ListComponent,
    seo,
    filtersProps = {},
    scrollToTop = true,
    scrollToElement = null
}) {
    const { title, description, keywords } = seo;

    const initialSelectedFilters = useMemo(() => getInitialSelectedFilters(config), [config]);
    const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);

    const dispatch = filtersProps.dispatch;
    useEffect(() => {
        if (dispatch && fetchAction) {
            dispatch(fetchAction());
        }
    }, [dispatch, fetchAction]);

    const filteredItems = applyFilters(items, selectedFilters);

    const {
        currentData,
        currentPage,
        totalPages,
        goToPage
    } = usePagination(filteredItems, 12, scrollToTop, scrollToElement);

    // Scroll to target element when category filter changes
    useEffect(() => {
        if (selectedFilters && selectedFilters.categories !== undefined) {
            if (scrollToElement) {
                try {
                    scrollToElement.scrollIntoView({ behavior: 'smooth' });
                } catch (e) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else if (scrollToTop) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilters?.categories]);

    return (
        <div className="relative">
            <HelmetSeo title={title} description={description} keywords={keywords} />

            {/* Main Content Container */}
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 p-2 sm:p-4 lg:p-6 min-h-screen">
                {/* Desktop Sidebar */}
                <div className="hidden xl:block xl:w-1/4 xl:min-w-[280px] xl:max-w-[320px]">
                    <div className="sticky top-6 pb-6">
                        <FiltersPanel
                            config={config}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            isMobile={false}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="xl:w-3/4 w-full min-w-0 flex-1 pb-8">
                    {/* Active Filters Summary */}
                    <div className="mb-4">
                        {(() => {
                            const chips = [];
                            const addChip = (label, key) => {
                                chips.push(
                                    <span key={key} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full ml-2 mb-2">
                                        <span>{label}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-blue-700 hover:text-blue-900"
                                            onClick={() => {
                                                const resetValue = initialSelectedFilters[key];
                                                setSelectedFilters(prev => ({ ...prev, [key]: resetValue }));
                                            }}
                                            aria-label="حذف فیلتر"
                                        >
                                            ×
                                        </button>
                                    </span>
                                );
                            };

                            // Add known filters as chips if active and different from initial
                            if (selectedFilters?.categories && selectedFilters.categories !== initialSelectedFilters.categories) {
                                addChip(String(selectedFilters.categories), 'categories');
                            }
                            if (selectedFilters?.target_audience && selectedFilters.target_audience !== initialSelectedFilters.target_audience) {
                                addChip(String(selectedFilters.target_audience), 'target_audience');
                            }
                            if (selectedFilters?.badge && selectedFilters.badge !== initialSelectedFilters.badge) {
                                addChip(String(selectedFilters.badge), 'badge');
                            }
                            if (selectedFilters?.sortOptions && selectedFilters.sortOptions !== initialSelectedFilters.sortOptions) {
                                addChip(`مرتب‌سازی: ${selectedFilters.sortOptions}`, 'sortOptions');
                            }

                            return chips.length > 0 ? (
                                <div className="flex flex-wrap items-center">
                                    <span className="text-sm text-gray-600 ml-2">فیلترهای فعال:</span>
                                    {chips}
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:text-red-800 ml-2"
                                        onClick={() => setSelectedFilters(initialSelectedFilters)}
                                    >
                                        حذف همه
                                    </button>
                                </div>
                            ) : null;
                        })()}
                    </div>
                    {/* Mobile Filters - Original Design */}
                    <div className="xl:hidden mb-6">
                        <FiltersPanel
                            config={config}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            isMobile={false}
                        />
                    </div>

                    {loading && <LoadingState />}
                    {error && <ErrorState />}
                    {!loading && !error && (
                        currentData && currentData.length > 0 ? (
                            <>
                                <ListComponent
                                    {...filtersProps}
                                    data={currentData}
                                    selectedFilters={selectedFilters}
                                />
                                <div className="mt-6">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={goToPage}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="relative overflow-hidden flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                                        <circle cx="11" cy="11" r="7" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">موردی یافت نشد</h3>
                                <p className="text-gray-600 text-sm mt-1 text-center">هیچ موردی با فیلترهای فعلی پیدا نشد. لطفاً فیلترها را تغییر دهید یا حذف کنید.</p>
                                <div className="mt-5 flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        onClick={() => {
                                            setSelectedFilters(initialSelectedFilters);
                                            try {
                                                if (scrollToElement) {
                                                    scrollToElement.scrollIntoView({ behavior: 'smooth' });
                                                } else if (scrollToTop) {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                            } catch (e) {}
                                        }}
                                    >
                                        حذف همه فیلترها
                                    </button>
                                </div>
                                <div className="pointer-events-none absolute -z-10 inset-0 opacity-40" aria-hidden="true">
                                    <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-100 blur-3xl"></div>
                                    <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-indigo-100 blur-3xl"></div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
