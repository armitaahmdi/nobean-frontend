import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAdminTests, 
    deleteAdminTest, 
    clearError 
} from '../slices/adminTestsSlice';
import { fetchTestDetails } from '../../user/tests/testDetailsSlice';
import { adminAuth } from '../../../services/adminAuth';
import { 
    FaPlus, 
    FaTrash, 
    FaEye, 
    FaChartBar, 
    FaSearch, 
    FaFilter, 
    FaSort,
    FaCalendarAlt,
    FaUsers,
    FaClock,
    FaTag,
    FaEdit,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaThLarge,
    FaList,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import LoadingState from '../../../components/ui/LoadingState';
import ErrorState from '../../../components/ui/ErrorState';
import ConfirmModal from '../../../components/shared/ConfirmModal';
import AdminTestForm from './AdminTestForm';

export default function AdminTestsManager() {
    const dispatch = useDispatch();
    const { tests, loading, error } = useSelector((state) => state.adminTests);
    const { byTestId, loading: detailsLoading, error: detailsError } = useSelector((state) => state.testDetails);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterTargetAudience, setFilterTargetAudience] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

    // Check admin access
    const user = useSelector((state) => state.auth?.user);
    const isAdmin = adminAuth.validateAdminAccess(user);

    useEffect(() => {
        if (isAdmin) {
            dispatch(fetchAdminTests());
        }
    }, [dispatch, isAdmin]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">دسترسی غیرمجاز</h1>
                    <p className="text-gray-600">شما دسترسی لازم برای مشاهده این صفحه را ندارید.</p>
                </div>
            </div>
        );
    }

    const handleAddTest = () => {
        setShowAddModal(true);
    };

    const handleTestSaved = () => {
        setShowAddModal(false);
        dispatch(fetchAdminTests());
    };

    const handleDeleteTest = (test) => {
        setTestToDelete(test);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!testToDelete) return;
        
        setActionLoading(true);
        try {
            await dispatch(deleteAdminTest(testToDelete.id));
            setShowDeleteModal(false);
            setTestToDelete(null);
            dispatch(fetchAdminTests());
        } catch (error) {
            console.error('Error deleting test:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleViewDetails = async (test) => {
        setSelectedTestId(test.id);
        setShowDetailsModal(true);
        dispatch(fetchTestDetails(test.id));
    };

    const handleDetailsModalClose = () => {
        setShowDetailsModal(false);
        setSelectedTestId(null);
    };

    // Helper function to format date safely
    const formatDate = (dateString) => {
        if (!dateString) return 'تاریخ نامشخص';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'تاریخ نامشخص';
            }
            return date.toLocaleDateString('fa-IR');
        } catch (error) {
            return 'تاریخ نامشخص';
        }
    };

    // Filter and search functions
    const filteredTests = tests.filter(test => {
        const matchesSearch = test.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             test.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             test.ShortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             test.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !filterCategory || test.category === filterCategory;
        const matchesTargetAudience = !filterTargetAudience || test.target_audience === filterTargetAudience;
        
        return matchesSearch && matchesCategory && matchesTargetAudience;
    });

    const sortedTests = [...filteredTests].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'createdAt') {
            // Handle invalid dates by treating them as very old dates
            aValue = aValue ? new Date(aValue) : new Date(0);
            bValue = bValue ? new Date(bValue) : new Date(0);
            
            // If either date is invalid, put it at the end
            if (isNaN(aValue.getTime())) aValue = new Date(0);
            if (isNaN(bValue.getTime())) bValue = new Date(0);
        }
        
        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Category mapping from English to Persian
    const categoryMapping = {
        'learning_disability': 'اختلال یادگیری',
        'reading_disorder': 'اختلال خواندن',
        'writing_disorder': 'اختلال نوشتن',
        'math_disorder': 'اختلال ریاضی',
        'attention_disorder': 'اختلال توجه'
    };

    // Get unique categories and convert to Persian labels
    const uniqueCategories = [...new Set(tests.map(test => test.category).filter(Boolean))];
    const categories = uniqueCategories.map(category => ({
        value: category,
        label: categoryMapping[category] || category
    }));
    
    // Fixed target audience options
    const targetAudienceOptions = [
        'ویژه فرزندان',
        'ویژه والدین', 
        'ویژه والدین و فرزندان',
        'ویژه خانواده'
    ];
    
    // Use fixed options instead of dynamic ones
    const targetAudiences = targetAudienceOptions;

    // Statistics
    const stats = {
        total: tests.length,
        active: tests.filter(test => test.status === 'active').length,
        categories: categories.length,
        avgTime: tests.reduce((sum, test) => sum + (test.time || 0), 0) / tests.length || 0
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">مدیریت آزمون‌ها</h1>
                            <p className="text-gray-600 text-lg">مدیریت و نظارت بر آزمون‌های سیستم</p>
                        </div>
                        <button
                            onClick={handleAddTest}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <FaPlus className="text-lg" />
                            <span className="font-semibold">افزودن آزمون جدید</span>
                        </button>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">کل آزمون‌ها</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <FaChartBar className="text-blue-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">آزمون‌های فعال</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <FaCheckCircle className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">دسته‌بندی‌ها</p>
                                    <p className="text-3xl font-bold text-purple-600">{stats.categories}</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <FaTag className="text-purple-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">میانگین زمان</p>
                                    <p className="text-3xl font-bold text-orange-600">{Math.round(stats.avgTime)}</p>
                                    <p className="text-xs text-gray-500">دقیقه</p>
                                </div>
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <FaClock className="text-orange-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="جستجو در آزمون‌ها..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">همه دسته‌بندی‌ها</option>
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>{category.label}</option>
                                ))}
                            </select>

                            <select
                                value={filterTargetAudience}
                                onChange={(e) => setFilterTargetAudience(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">همه گروه‌های هدف</option>
                                {targetAudiences.map(audience => (
                                    <option key={audience} value={audience}>{audience}</option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="createdAt">تاریخ ایجاد</option>
                                <option value="title">عنوان</option>
                                <option value="time">زمان</option>
                            </select>

                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                                ترتیب
                            </button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`px-4 py-3 transition-colors ${
                                    viewMode === 'cards' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <FaThLarge />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-4 py-3 transition-colors ${
                                    viewMode === 'table' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tests Display */}
                {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedTests.map((test) => (
                            <div key={test.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {test.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {test.ShortDescription || test.shortDescription || test.description || 'توضیحات کوتاه در دسترس نیست'}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(test)}
                                                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="مشاهده جزئیات"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTest(test)}
                                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaTag className="text-purple-500" />
                                            <span>{categoryMapping[test.category] || test.category || 'عمومی'}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaUsers className="text-green-500" />
                                            <span>{test.target_audience || 'عمومی'}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaClock className="text-orange-500" />
                                            <span>{test.time || 30} دقیقه</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaCalendarAlt className="text-blue-500" />
                                            <span>{formatDate(test.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            عنوان آزمون
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            دسته‌بندی
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            گروه هدف
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            زمان
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            تاریخ ایجاد
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedTests.map((test) => (
                                        <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {test.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                    {test.ShortDescription || test.shortDescription || test.description || 'توضیحات کوتاه در دسترس نیست'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    {categoryMapping[test.category] || test.category || 'عمومی'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {test.target_audience || 'عمومی'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {test.time || 30} دقیقه
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(test.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewDetails(test)}
                                                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="مشاهده جزئیات"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTest(test)}
                                                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="حذف"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {sortedTests.length === 0 && (
                    <div className="text-center py-12">
                        <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">آزمونی یافت نشد</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || filterCategory || filterTargetAudience 
                                ? 'با فیلترهای انتخاب شده آزمونی یافت نشد.'
                                : 'هنوز آزمونی ایجاد نشده است.'
                            }
                        </p>
                        {!searchTerm && !filterCategory && !filterTargetAudience && (
                            <button
                                onClick={handleAddTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                            >
                                <FaPlus />
                                افزودن اولین آزمون
                            </button>
                        )}
                    </div>
                )}

                {/* Modals */}
                {showAddModal && (
                    <AdminTestForm
                        onClose={() => setShowAddModal(false)}
                        onSave={handleTestSaved}
                    />
                )}

                {showDeleteModal && (
                    <ConfirmModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                        title="حذف آزمون"
                        message={`آیا از حذف آزمون "${testToDelete?.title}" اطمینان دارید؟ این عمل قابل بازگشت نیست.`}
                        confirmText="حذف"
                        cancelText="انصراف"
                        loading={actionLoading}
                    />
                )}

                {/* Test Details Modal */}
                {showDetailsModal && selectedTestId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">جزئیات آزمون</h2>
                                <button
                                    onClick={handleDetailsModalClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                            {detailsLoading ? (
                                <LoadingState />
                            ) : detailsError ? (
                                <ErrorState message={detailsError} />
                            ) : byTestId[selectedTestId]?.testDetails ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">اطلاعات کلی</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">عنوان:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.title}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">دسته‌بندی:</span>
                                                    <p className="text-gray-900">{categoryMapping[byTestId[selectedTestId].testDetails.category] || byTestId[selectedTestId].testDetails.category || 'عمومی'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">گروه هدف:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.target_audience || 'عمومی'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">زمان:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.time || 30} دقیقه</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">آمار</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">تعداد سوالات:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.question_count || 0}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">تعداد شرکت‌کنندگان:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.participantCount || 0}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">قیمت:</span>
                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.price || 0} تومان</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">تاریخ ایجاد:</span>
                                                    <p className="text-gray-900">{formatDate(byTestId[selectedTestId].testDetails.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات کوتاه</h3>
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {byTestId[selectedTestId].testDetails.ShortDescription || 'توضیحات کوتاه در دسترس نیست'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات کامل</h3>
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {byTestId[selectedTestId].testDetails.mainDescription || 'توضیحات کامل در دسترس نیست'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">اطلاعات یافت نشد</h3>
                                    <p className="text-gray-600">جزئیات این آزمون در دسترس نیست.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}