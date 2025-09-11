import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePagination(data = [], pageSize = 6, scrollToTop = true, scrollToElement = null) {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const totalPages = Math.ceil(data.length / pageSize);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    }, [data, currentPage, pageSize]);


    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            searchParams.set("page", page);
            setSearchParams(searchParams);
        }
    };

    useEffect(() => {
        if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (scrollToElement) {
            scrollToElement.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentPage, scrollToTop, scrollToElement]);

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
    };
}
