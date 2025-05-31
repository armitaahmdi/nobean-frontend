import { useState, useMemo, useEffect } from "react";

export default function usePagination(data = [], pageSize = 6) {
    const [currentPage, setCurrentPage] = useState(1);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    }, [data, currentPage, pageSize]);

    const totalPages = Math.ceil(data.length / pageSize);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
    };
}
