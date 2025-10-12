import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChartBar, FaUsers, FaTrophy, FaClock, FaSearch, FaDownload } from "react-icons/fa";
import { getExamResults, getExamStatistics } from "../slices/adminExamResultsSlice";
import LoadingState from "../../../components/ui/LoadingState";

export default function ExamResultsModal({ isOpen, onClose, testId, testTitle }) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("results");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const { byTestId, loading, error, statistics, statisticsLoading } = useSelector(
        (store) => store.adminExamResults
    );

    const examData = byTestId[testId] || { results: [], pagination: {} };
    const examStatistics = statistics[testId] || {};

    useEffect(() => {
        if (isOpen && testId) {
            dispatch(getExamResults({ testId, params: { page: currentPage, limit: pageSize } }));
            dispatch(getExamStatistics(testId));
        }
    }, [isOpen, testId, currentPage, pageSize, dispatch]);

    const handleSearch = () => {
        dispatch(getExamResults({ 
            testId, 
            params: { 
                page: 1, 
                limit: pageSize, 
                search: searchTerm 
            } 
        }));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        dispatch(getExamResults({ 
            testId, 
            params: { 
                page, 
                limit: pageSize, 
                search: searchTerm 
            } 
        }));
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600 bg-green-50";
        if (score >= 60) return "text-yellow-600 bg-yellow-50";
        return "text-red-600 bg-red-50";
    };

    const getScoreIcon = (score) => {
        if (score >= 80) return <FaTrophy className="text-yellow-500" />;
        if (score >= 60) return <FaChartBar className="text-green-500" />;
        return <FaClock className="text-red-500" />;
    };

    if (!isOpen) return null;

    console.log(examData.results);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">نتایج آزمون</h2>
                                <p className="text-blue-100">{testTitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("results")}
                                className={`px-6 py-4 font-medium transition-colors ${
                                    activeTab === "results"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <FaUsers className="inline mr-2" />
                                نتایج آزمون
                            </button>
                            <button
                                onClick={() => setActiveTab("statistics")}
                                className={`px-6 py-4 font-medium transition-colors ${
                                    activeTab === "statistics"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <FaChartBar className="inline mr-2" />
                                آمار کلی
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        {activeTab === "results" && (
                            <div>
                                {/* Search */}
                                <div className="mb-6 flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="جستجو بر اساس نام یا شماره تلفن..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        جستجو
                                    </button>
                                </div>

                                {/* Results Table */}
                                {loading ? (
                                    <LoadingState />
                                ) : error ? (
                                    <div className="text-center text-red-600 py-8">
                                        خطا در بارگذاری نتایج: {error}
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        نام کاربر
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        شماره تماس
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        شماره تلاش
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        نمره
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        امتیاز وزنی
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        تاریخ تکمیل
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                                        وضعیت
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {examData.results.map((result, index) => {
                                                    // محاسبه شماره تلاش برای هر کاربر
                                                    const userAttempts = examData.results.filter(r => r.userId === result.userId);
                                                    const attemptNumber = userAttempts.findIndex(r => r.id === result.id) + 1;
                                                    
                                                    return (
                                                        <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50">
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {result.user.firstName} {result.user.lastName}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                                {result.userPhone || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    تلاش {attemptNumber}
                                                                </span>
                                                            </td>
                                                        <td className="px-4 py-3">
                                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.score)}`}>
                                                                {getScoreIcon(result.score)}
                                                                <span className="mr-2">{result.score}%</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">
                                                            {(result.weightedSum ?? 0)} / {(result.maxWeightedSum ?? 0)}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {new Date(result.completedAt).toLocaleDateString('fa-IR')}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                result.status === 'completed' 
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {result.status === 'completed' ? 'تکمیل شده' : 'ناتمام'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        {/* Pagination */}
                                        {examData.pagination.totalPages > 1 && (
                                            <div className="mt-6 flex justify-center">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={!examData.pagination.hasPrev}
                                                        className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                    >
                                                        قبلی
                                                    </button>
                                                    {Array.from({ length: examData.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                                        <button
                                                            key={page}
                                                            onClick={() => handlePageChange(page)}
                                                            className={`px-3 py-2 border rounded-md ${
                                                                page === currentPage
                                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                                    : 'border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={!examData.pagination.hasNext}
                                                        className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                    >
                                                        بعدی
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "statistics" && (
                            <div>
                                {statisticsLoading ? (
                                    <LoadingState />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* Total Attempts */}
                                        <div className="bg-blue-50 p-6 rounded-xl">
                                            <div className="flex items-center">
                                                <FaUsers className="text-blue-600 text-2xl" />
                                                <div className="mr-4">
                                                    <p className="text-sm text-blue-600 font-medium">کل شرکت‌کنندگان</p>
                                                    <p className="text-2xl font-bold text-blue-900">
                                                        {examStatistics.totalAttempts || 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Completed Attempts */}
                                        <div className="bg-green-50 p-6 rounded-xl">
                                            <div className="flex items-center">
                                                <FaTrophy className="text-green-600 text-2xl" />
                                                <div className="mr-4">
                                                    <p className="text-sm text-green-600 font-medium">تکمیل شده</p>
                                                    <p className="text-2xl font-bold text-green-900">
                                                        {examStatistics.completedAttempts || 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Average Score */}
                                        <div className="bg-yellow-50 p-6 rounded-xl">
                                            <div className="flex items-center">
                                                <FaChartBar className="text-yellow-600 text-2xl" />
                                                <div className="mr-4">
                                                    <p className="text-sm text-yellow-600 font-medium">میانگین نمره</p>
                                                    <p className="text-2xl font-bold text-yellow-900">
                                                        {examStatistics.averageScore || 0}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Completion Rate */}
                                        <div className="bg-purple-50 p-6 rounded-xl">
                                            <div className="flex items-center">
                                                <FaClock className="text-purple-600 text-2xl" />
                                                <div className="mr-4">
                                                    <p className="text-sm text-purple-600 font-medium">نرخ تکمیل</p>
                                                    <p className="text-2xl font-bold text-purple-900">
                                                        {examStatistics.completionRate || 0}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
