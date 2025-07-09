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
    filtersProps = {}
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
    } = usePagination(filteredItems, 12);

    return (
        <>
            <HelmetSeo title={title} description={description} keywords={keywords} />
            <div className="flex flex-col lg:flex-row gap-6 p-4">
                <div className="lg:w-1/4 w-full">
                    <FiltersPanel
                        config={config}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                </div>

                <div className="lg:w-3/4 w-full">
                    {loading && <LoadingState />}
                    {error && <ErrorState />}
                    {!loading && !error && (
                        <>
                            <ListComponent
                                {...filtersProps}
                                data={currentData}
                                selectedFilters={selectedFilters}
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
    );
}
