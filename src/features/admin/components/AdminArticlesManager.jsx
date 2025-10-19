import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
    fetchAdminArticles, 
    deleteAdminArticle, 
    clearError 
} from '../slices/adminArticlesSlice';
import { adminAuth } from '../../../services/adminAuth';
import { 
    FaPlus, 
    FaTrash, 
    FaEye, 
    FaEdit,
    FaSearch, 
    FaFilter, 
    FaSort,
    FaCalendarAlt,
    FaClock,
    FaTag,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaThLarge,
    FaList,
    FaArrowUp,
    FaArrowDown,
    FaFileAlt
} from 'react-icons/fa';
import LoadingState from '../../../components/ui/LoadingState';
import ErrorState from '../../../components/ui/ErrorState';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import AdminArticleForm from './AdminArticleForm';

export default function AdminArticlesManager() {
    const dispatch = useDispatch();
    const { articles, loading, error, deleteLoading } = useSelector((state) => state.adminArticles);
    
    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

    // Check admin access
    const user = useSelector((state) => state.auth?.user);
    const isAdmin = user ? adminAuth.validateAdminAccess(user) : false;

    useEffect(() => {
        if (isAdmin) {
            dispatch(fetchAdminArticles());
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

    const handleAddArticle = () => {
        setShowAddModal(true);
    };

    const handleEditArticle = (article) => {
        setSelectedArticle(article);
        setShowEditModal(true);
    };

    const handleDeleteArticle = (article) => {
        setSelectedArticle(article);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (selectedArticle) {
            try {
                await dispatch(deleteAdminArticle(selectedArticle.id)).unwrap();
                toast.success('مقاله با موفقیت حذف شد');
                setShowConfirmModal(false);
                setSelectedArticle(null);
            } catch (error) {
                toast.error(error || 'خطا در حذف مقاله');
            }
        }
    };

    const handleArticleSaved = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedArticle(null);
        dispatch(fetchAdminArticles()); // Refresh the list
    };

    // Filter and sort articles
    const filteredArticles = articles
        .filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !filterCategory || article.category === filterCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (sortBy === 'createdAt' || sortBy === 'date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const getContentSectionsCount = (article) => {
        return article.contentSections?.length || 0;
    };

    const getContentTypes = (article) => {
        const types = article.contentSections?.map(section => section.type) || [];
        return [...new Set(types)];
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                مدیریت مقالات
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">ایجاد، ویرایش و مدیریت مقالات</p>
                        </div>
                        <button
                            onClick={handleAddArticle}
                            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="font-medium">مقاله جدید</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">کل مقالات</p>
                                <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                <FaFileAlt className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">منتشر شده</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {articles.filter(a => a.status === 'published').length}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                                <FaCheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">پیش‌نویس</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {articles.filter(a => a.status === 'draft').length}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                                <FaExclamationTriangle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">کل بازدید</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {articles.reduce((sum, a) => sum + (a.views || 0), 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                                <FaEye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="جستجو در مقالات..."
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="lg:w-48">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">همه دسته‌ها</option>
                                <option value="روانشناسی">روانشناسی</option>
                                <option value="تربیت">تربیت</option>
                                <option value="مهارت">مهارت</option>
                                <option value="هوش">هوش</option>
                                <option value="تحصیل">تحصیل</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="lg:w-48">
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('-');
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="createdAt-desc">جدیدترین</option>
                                <option value="createdAt-asc">قدیمی‌ترین</option>
                                <option value="title-asc">عنوان (الف-ی)</option>
                                <option value="title-desc">عنوان (ی-الف)</option>
                                <option value="readingTime-asc">کمترین زمان مطالعه</option>
                                <option value="readingTime-desc">بیشترین زمان مطالعه</option>
                            </select>
                        </div>

                        {/* View Mode */}
                        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    viewMode === 'cards' 
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                                        : 'text-gray-600 hover:bg-white hover:shadow-md'
                                }`}
                            >
                                <FaThLarge className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    viewMode === 'table' 
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                                        : 'text-gray-600 hover:bg-white hover:shadow-md'
                                }`}
                            >
                                <FaList className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Articles List */}
                {filteredArticles.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaFileAlt className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">مقاله‌ای یافت نشد</h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            {searchTerm || filterCategory ? 'با فیلترهای انتخابی مقاله‌ای یافت نشد' : 'هنوز مقاله‌ای ایجاد نشده است'}
                        </p>
                        {!searchTerm && !filterCategory && (
                            <button
                                onClick={handleAddArticle}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                            >
                                اولین مقاله را ایجاد کنید
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={viewMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'}>
                        {filteredArticles.map((article) => (
                            viewMode === 'cards' ? (
                                // Card View
                                <div key={article.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    {article.image && (
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={article.image} 
                                                alt={article.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    article.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {article.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="flex gap-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button
                                                    onClick={() => handleEditArticle(article)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <FaEdit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteArticle(article)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center gap-3 text-sm mb-4">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                                                <FaTag className="w-3 h-3 text-blue-600" />
                                                <span className="text-blue-700 font-medium">{article.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                                <FaClock className="w-3 h-3 text-green-600" />
                                                <span className="text-green-700 font-medium">{article.readingTime} دقیقه</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full">
                                                <FaEye className="w-3 h-3 text-purple-600" />
                                                <span className="text-purple-700 font-medium">{article.views || 0}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1 flex-wrap">
                                                {getContentTypes(article).map((type, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(article.date).toLocaleDateString('fa-IR')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Table View
                                <div key={article.id} className="group border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200">
                                    <div className="px-6 py-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4">
                                                    {article.image && (
                                                        <div className="relative overflow-hidden rounded-xl">
                                                            <img 
                                                                src={article.image} 
                                                                alt={article.title}
                                                                className="w-16 h-16 object-cover"
                                                            />
                                                            <div className="absolute top-1 right-1">
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                                    article.status === 'published' 
                                                                        ? 'bg-green-100 text-green-800' 
                                                                        : 'bg-amber-100 text-amber-800'
                                                                }`}>
                                                                    {article.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                            {article.excerpt}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                                                                <FaTag className="w-3 h-3 text-blue-600" />
                                                                <span className="text-blue-700 text-sm font-medium">{article.category}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                                                <FaClock className="w-3 h-3 text-green-600" />
                                                                <span className="text-green-700 text-sm font-medium">{article.readingTime} دقیقه</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full">
                                                                <FaEye className="w-3 h-3 text-purple-600" />
                                                                <span className="text-purple-700 text-sm font-medium">{article.views || 0}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                                                                <FaCalendarAlt className="w-3 h-3 text-gray-600" />
                                                                <span className="text-gray-700 text-sm font-medium">{new Date(article.date).toLocaleDateString('fa-IR')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button
                                                    onClick={() => handleEditArticle(article)}
                                                    className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteArticle(article)}
                                                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                        <AdminArticleForm
                            onClose={() => setShowAddModal(false)}
                            onSave={handleArticleSaved}
                        />
                    </div>
                </div>
            )}

            {showEditModal && selectedArticle && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                        <AdminArticleForm
                            article={selectedArticle}
                            onClose={() => setShowEditModal(false)}
                            onSave={handleArticleSaved}
                        />
                    </div>
                </div>
            )}

            {showConfirmModal && selectedArticle && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
                        <ConfirmModal
                            isOpen={showConfirmModal}
                            onClose={() => setShowConfirmModal(false)}
                            onConfirm={confirmDelete}
                            title="حذف مقاله"
                            message={`آیا از حذف مقاله "${selectedArticle.title}" اطمینان دارید؟`}
                            confirmText="حذف"
                            cancelText="انصراف"
                            isLoading={deleteLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
