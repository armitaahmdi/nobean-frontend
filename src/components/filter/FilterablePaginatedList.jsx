/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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

    const [selectedFilters, setSelectedFilters] = useState(
        getInitialSelectedFilters(config)
    );

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
                    )}
                </div>
            </div>
        </div>
    );
}
