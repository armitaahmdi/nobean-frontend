import translate from "../../locale/translate";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    // Show only a subset of pages on mobile
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;
        
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        
        const visiblePages = [];
        if (start > 1) {
            visiblePages.push(1);
            if (start > 2) visiblePages.push('...');
        }
        
        for (let i = start; i <= end; i++) {
            visiblePages.push(i);
        }
        
        if (end < totalPages) {
            if (end < totalPages - 1) visiblePages.push('...');
            visiblePages.push(totalPages);
        }
        
        return visiblePages;
    };

    return (
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 px-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-200 rounded text-xs sm:text-sm disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
                {translate.previous}
            </button>

            <div className="flex gap-1 sm:gap-2">
                {getVisiblePages().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500 text-xs sm:text-sm">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${
                                page === currentPage 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-200 rounded text-xs sm:text-sm disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
                {translate.next}
            </button>
        </div>
    );
}
