import { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from '../../../../components/shared/Pagination';

export default function PaginatedStoreList({ products, itemsPerPage = 12, onItemsPerPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination data
    const paginationData = useMemo(() => {
        const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = products.slice(startIndex, endIndex);

        return {
            totalItems,
            totalPages,
            currentItems,
            startIndex,
            endIndex
        };
    }, [products, currentPage, itemsPerPage]);

    // Reset to first page when products change (e.g., when filters are applied)
    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of the product list
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-600">لطفاً فیلترهای خود را تغییر دهید یا عبارت جستجوی دیگری امتحان کنید.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginationData.currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination Controls */}
            {paginationData.totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={paginationData.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

