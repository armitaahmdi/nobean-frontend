import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
    fetchAdminTests, 
    deleteAdminTest, 
    clearError 
} from '../slices/adminTestsSlice';
import { fetchTestDetails } from '../../user/tests/testDetailsSlice';
import { fetchTestQuestions } from '../slices/adminQuestionsSlice';
import ExamResultsModal from './ExamResultsModal';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import { adminAuth } from '../../../services/adminAuth';
import { testsApi } from '../../../services/testsApi';
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
    FaArrowDown,
    FaQuestionCircle,
  FaFileAlt,
  FaArrowLeft,
  FaLayerGroup
} from 'react-icons/fa';
import LoadingState from '../../../components/ui/LoadingState';
import ErrorState from '../../../components/ui/ErrorState';
import AdminTestForm from './AdminTestForm';
import AdminQuestionForm from './AdminQuestionForm';

export default function AdminTestsManager() {
    const dispatch = useDispatch();
    const { tests, loading, error } = useSelector((state) => state.adminTests);
    const { byTestId, loading: detailsLoading, error: detailsError } = useSelector((state) => state.testDetails);
    const { questions, loading: questionsLoading } = useSelector((state) => state.adminQuestions);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [selectedTestForQuestions, setSelectedTestForQuestions] = useState(null);
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'questions'
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedTestForResults, setSelectedTestForResults] = useState(null);
  // Domains/Components modal state
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [selectedTestForDomains, setSelectedTestForDomains] = useState(null);
  const [domainInputs, setDomainInputs] = useState([]); // [{name, order}]
  const [componentsByDomain, setComponentsByDomain] = useState({}); // {idx: [{name, order}]}
  const [domainModalStep, setDomainModalStep] = useState(1); // 1=domains, 2=components
  const [existingDomains, setExistingDomains] = useState([]); // [{id,name,order,components:[{id,name,order}]}]
  const [existingDomainsLoading, setExistingDomainsLoading] = useState(false);
  const [editingDomainId, setEditingDomainId] = useState(null);
  const [editingComponentId, setEditingComponentId] = useState(null);
  const [draftDomainEdits, setDraftDomainEdits] = useState({}); // {id:{name,order}}
  const [draftComponentEdits, setDraftComponentEdits] = useState({}); // {id:{name,order}}
  const [createInputByDomainId, setCreateInputByDomainId] = useState({}); // {domainId:{name,order}}
    
    // Confirm modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmData, setConfirmData] = useState(null);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterTargetAudience, setFilterTargetAudience] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

    // Check admin access
    const user = useSelector((state) => state.auth?.user);
    const token = useSelector((state) => state.auth?.token);
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
        dispatch(fetchTestQuestions(test.id));
    };

    const handleDetailsModalClose = () => {
        setShowDetailsModal(false);
        setSelectedTestId(null);
        setActiveTab('info');
        setExpandedQuestion(null);
    };

    const handleAddQuestions = (test) => {
        setSelectedTestForQuestions(test);
        setShowQuestionModal(true);
    };

    const handleViewResults = (test) => {
        setSelectedTestForResults(test);
        setShowResultsModal(true);
    };

  const handleOpenDomainModal = (test) => {
    setSelectedTestForDomains(test);
    setDomainInputs([]);
    setComponentsByDomain({});
    setShowDomainModal(true);
    setDomainModalStep(1);
    // Load existing domains/components for this test
    (async () => {
      try {
        setExistingDomainsLoading(true);
        const token = (await import('../../../app/store')).default.getState().auth?.token;
        const domainsRes = await testsApi.getDomains(test.id, token);
        const domainsList = (domainsRes?.data || domainsRes) || [];
        const enriched = [];
        for (const d of domainsList) {
          try {
            const compsRes = await testsApi.getComponents(d.id, token);
            const comps = (compsRes?.data || compsRes) || [];
            enriched.push({ ...d, components: comps });
          } catch (e) {
            enriched.push({ ...d, components: [] });
          }
        }
        setExistingDomains(enriched);
      } catch (e) {
        setExistingDomains([]);
      } finally {
        setExistingDomainsLoading(false);
      }
    })();
  };

  const reloadExistingDomains = async (examId) => {
    try {
      setExistingDomainsLoading(true);
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      const domainsRes = await testsApi.getDomains(examId, token);
      const domainsList = (domainsRes?.data || domainsRes) || [];
      const enriched = [];
      for (const d of domainsList) {
        try {
          const compsRes = await testsApi.getComponents(d.id, token);
          const comps = (compsRes?.data || compsRes) || [];
          enriched.push({ ...d, components: comps });
        } catch (e) {
          enriched.push({ ...d, components: [] });
        }
      }
      setExistingDomains(enriched);
    } finally {
      setExistingDomainsLoading(false);
    }
  };

  const onSaveDomainEdit = async (domain) => {
    try {
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      const draft = draftDomainEdits[domain.id] || {};
      await testsApi.updateDomain(domain.id, {
        name: draft.name ?? domain.name,
        order: draft.order ?? domain.order
      }, token);
      setEditingDomainId(null);
      setDraftDomainEdits(prev => ({ ...prev, [domain.id]: undefined }));
      if (selectedTestForDomains?.id) await reloadExistingDomains(selectedTestForDomains.id);
      toast.success('حیطه به‌روزرسانی شد');
    } catch (e) {
      toast.error('ویرایش حیطه ناموفق بود');
    }
  };

  const onDeleteDomain = async (domainId) => {
    try {
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      await testsApi.deleteDomain(domainId, token);
      if (selectedTestForDomains?.id) await reloadExistingDomains(selectedTestForDomains.id);
      toast.success('حیطه حذف شد');
    } catch (e) {
      toast.error('حذف حیطه ناموفق بود');
    }
  };

  const onSaveComponentEdit = async (component) => {
    try {
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      const draft = draftComponentEdits[component.id] || {};
      await testsApi.updateComponent(component.id, {
        name: draft.name ?? component.name,
        order: draft.order ?? component.order
      }, token);
      setEditingComponentId(null);
      setDraftComponentEdits(prev => ({ ...prev, [component.id]: undefined }));
      if (selectedTestForDomains?.id) await reloadExistingDomains(selectedTestForDomains.id);
      toast.success('مولفه به‌روزرسانی شد');
    } catch (e) {
      toast.error('ویرایش مولفه ناموفق بود');
    }
  };

  const onDeleteComponent = async (componentId) => {
    try {
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      await testsApi.deleteComponent(componentId, token);
      if (selectedTestForDomains?.id) await reloadExistingDomains(selectedTestForDomains.id);
      toast.success('مولفه حذف شد');
    } catch (e) {
      toast.error('حذف مولفه ناموفق بود');
    }
  };

  const onAddComponent = async (domainId) => {
    try {
      const token = (await import('../../../app/store')).default.getState().auth?.token;
      const draft = createInputByDomainId[domainId] || {};
      const name = (draft.name || '').trim();
      const order = draft.order ?? 0;
      if (!name) { toast.warn('نام مولفه را وارد کنید'); return; }
      await testsApi.createComponent({ domainId, name, order }, token);
      setCreateInputByDomainId(prev => ({ ...prev, [domainId]: { name: '', order: 0 } }));
      if (selectedTestForDomains?.id) await reloadExistingDomains(selectedTestForDomains.id);
      toast.success('مولفه اضافه شد');
    } catch (e) {
      toast.error('افزودن مولفه ناموفق بود');
    }
  };

  const handleCloseDomainModal = () => {
    setShowDomainModal(false);
    setSelectedTestForDomains(null);
    setDomainInputs([]);
    setComponentsByDomain({});
    setDomainModalStep(1);
  };

    const handleQuestionModalClose = () => {
        setShowQuestionModal(false);
        setSelectedTestForQuestions(null);
    };

    const handleQuestionsSaved = () => {
        setShowQuestionModal(false);
        setSelectedTestForQuestions(null);
        // Refresh the tests list to show updated question counts
        dispatch(fetchAdminTests());
    };

    const handleToggleStatus = async (test) => {
        const newStatus = test.status === 'active' ? 'inactive' : 'active';
        const statusText = newStatus === 'active' ? 'فعال' : 'غیرفعال';
        
        setConfirmAction(() => async () => {
            setShowConfirmModal(false);
            setActionLoading(true);
            try {
                await testsApi.updateTestStatus(test.id, newStatus, token);
                
                // Refresh the tests list
                dispatch(fetchAdminTests());
                
                toast.success(`آزمون "${test.title}" با موفقیت ${statusText} شد`);
            } catch (error) {
                console.error('Error toggling test status:', error);
                toast.error('خطا در تغییر وضعیت آزمون: ' + error.message);
            } finally {
                setActionLoading(false);
            }
        });
        
        // Store test info for modal message
        setConfirmData({ test, newStatus, statusText });
        setShowConfirmModal(true);
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
        const matchesStatus = !filterStatus || test.status === filterStatus;
        
        return matchesSearch && matchesCategory && matchesTargetAudience && matchesStatus;
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
        'attention_disorder': 'اختلال توجه',
        'learning_style' : 'سبک یادگیری'
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
        draft: tests.filter(test => test.status === 'draft').length,
        inactive: tests.filter(test => test.status === 'inactive').length,
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
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                                    <p className="text-sm font-medium text-gray-600">پیش‌نویس</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <FaEdit className="text-yellow-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">غیرفعال</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
                                </div>
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <FaTimes className="text-red-600 text-xl" />
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
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">همه وضعیت‌ها</option>
                                <option value="draft">پیش‌نویس</option>
                                <option value="active">فعال</option>
                                <option value="inactive">غیرفعال</option>
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
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                                                {test.title}
                                            </h3>
                                                <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${
                                                    test.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    test.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {test.status === 'active' ? 'فعال' : test.status === 'draft' ? 'پیش‌نویس' : 'غیرفعال'}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm line-clamp-2 break-words max-w-full">
                                                {test.ShortDescription || test.shortDescription || test.description || 'توضیحات کوتاه در دسترس نیست'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quick facts */}
                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-2"><FaTag className="text-purple-500" /><span>{categoryMapping[test.category] || test.category || 'عمومی'}</span></div>
                                        <div className="flex items-center gap-2"><FaUsers className="text-green-500" /><span>{test.target_audience || 'عمومی'}</span></div>
                                        <div className="flex items-center gap-2"><FaClock className="text-orange-500" /><span>{test.time || 30} دقیقه</span></div>
                                        <div className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /><span>{formatDate(test.createdAt)}</span></div>
                                    </div>

                                    {/* Action toolbar */}
                                    <div className="mt-5 border-t border-gray-200 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleViewDetails(test)}
                                                className="px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm flex items-center gap-2"
                                                title="مشاهده جزئیات"
                                            >
                                                <FaEye />
                                                <span>جزئیات</span>
                                            </button>
                                            <button
                                                onClick={() => handleOpenDomainModal(test)}
                                                className="px-3 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-sm flex items-center gap-2"
                                                title="افزودن حیطه/مولفه"
                                            >
                                                <FaLayerGroup />
                                                <span>حیطه/مولفه</span>
                                            </button>
                                            <button
                                                onClick={() => handleAddQuestions(test)}
                                                className="px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm flex items-center gap-2"
                                                title="افزودن سوالات"
                                            >
                                                <FaPlus />
                                                <span>افزودن سوال</span>
                                            </button>
                                            <button
                                                onClick={() => handleViewResults(test)}
                                                className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm flex items-center gap-2"
                                                title="مشاهده نتایج"
                                            >
                                                <FaChartBar />
                                                <span>نتایج</span>
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(test)}
                                                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                                                    test.status === 'active' 
                                                        ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                                                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                }`}
                                                title={test.status === 'active' ? 'غیرفعال کردن' : 'فعال کردن'}
                                            >
                                                {test.status === 'active' ? <FaTimes /> : <FaCheckCircle />}
                                                <span>{test.status === 'active' ? 'غیرفعال کن' : 'فعال کن'}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTest(test)}
                                                className="px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm flex items-center gap-2"
                                                title="حذف آزمون"
                                            >
                                                <FaTrash />
                                                <span>حذف</span>
                                            </button>
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
                                            وضعیت
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    test.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    test.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {test.status === 'active' ? 'فعال' :
                                                     test.status === 'draft' ? 'پیش‌نویس' : 'غیرفعال'}
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
                                                        onClick={() => handleAddQuestions(test)}
                                                        className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="افزودن سوالات"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewDetails(test)}
                                                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="مشاهده جزئیات"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(test)}
                                                        className={`p-2 rounded-lg transition-colors ${
                                                            test.status === 'active' 
                                                                ? 'text-red-600 hover:text-red-900 hover:bg-red-50' 
                                                                : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                                                        }`}
                                                        title={test.status === 'active' ? 'غیرفعال کردن' : 'فعال کردن'}
                                                    >
                                                        {test.status === 'active' ? <FaTimes /> : <FaCheckCircle />}
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

                {/* Question Form Modal */}
                {showQuestionModal && selectedTestForQuestions && (
                    <AdminQuestionForm
                        test={selectedTestForQuestions}
                        onClose={handleQuestionModalClose}
                        onSave={handleQuestionsSaved}
                    />
                )}

                {/* Results Modal */}
                <ExamResultsModal
                    isOpen={showResultsModal}
                    onClose={() => setShowResultsModal(false)}
                    testId={selectedTestForResults?.id}
                    testTitle={selectedTestForResults?.title}
                />

                {/* Domains/Components Modal */}
                {showDomainModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">افزودن حیطه و مولفه برای: {selectedTestForDomains?.title}</h2>
                                <button onClick={handleCloseDomainModal} className="text-gray-400 hover:text-gray-600">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                        {/* Existing domains/components display */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">حیطه‌ها و مولفه‌های ثبت‌شده</h3>
                            {existingDomainsLoading && (
                              <span className="text-xs text-gray-500">در حال بارگذاری...</span>
                            )}
                          </div>
                          {(!existingDomains || existingDomains.length === 0) ? (
                            <p className="text-xs text-gray-500">موردی ثبت نشده است.</p>
                          ) : (
                            <div className="space-y-3">
                              {existingDomains.map((d) => (
                                <div key={d.id} className="bg-white border border-gray-200 rounded p-3">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      {editingDomainId === d.id ? (
                                        <>
                                          <input className="px-2 py-1 border rounded text-sm" defaultValue={d.name}
                                            onChange={(e)=> setDraftDomainEdits(prev=>({ ...prev, [d.id]: { ...(prev[d.id]||{}), name: e.target.value } }))} />
                                          <input type="number" className="w-20 px-2 py-1 border rounded text-sm" defaultValue={d.order ?? 0}
                                            onChange={(e)=> setDraftDomainEdits(prev=>({ ...prev, [d.id]: { ...(prev[d.id]||{}), order: parseInt(e.target.value||'0',10) } }))} />
                                          <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs" onClick={()=> onSaveDomainEdit(d)}>ذخیره</button>
                                          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs" onClick={()=> setEditingDomainId(null)}>انصراف</button>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-sm font-medium text-gray-900">{d.name}</div>
                                          <span className="text-[10px] text-gray-500">ترتیب: {d.order ?? 0}</span>
                                        </>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs" onClick={()=> setEditingDomainId(d.id)}>ویرایش</button>
                                      <button className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs" onClick={()=> onDeleteDomain(d.id)}>حذف</button>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {(d.components || []).length > 0 ? (
                                      d.components.map(c => (
                                        <span key={c.id} className="px-2 py-1 rounded-full text-[11px] bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-2">
                                          {editingComponentId === c.id ? (
                                            <>
                                              <input className="px-1 py-0.5 border rounded text-xs" defaultValue={c.name}
                                                onChange={(e)=> setDraftComponentEdits(prev=>({ ...prev, [c.id]: { ...(prev[c.id]||{}), name: e.target.value } }))} />
                                              <input type="number" className="w-16 px-1 py-0.5 border rounded text-xs" defaultValue={c.order ?? 0}
                                                onChange={(e)=> setDraftComponentEdits(prev=>({ ...prev, [c.id]: { ...(prev[c.id]||{}), order: parseInt(e.target.value||'0',10) } }))} />
                                              <button className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px]" onClick={()=> onSaveComponentEdit(c)}>ذخیره</button>
                                              <button className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]" onClick={()=> setEditingComponentId(null)}>انصراف</button>
                                            </>
                                          ) : (
                                            <>
                                              <span>{c.name}</span>
                                              <span className="text-[10px] text-gray-500">({c.order ?? 0})</span>
                                              <button className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded text-[10px]" onClick={()=> setEditingComponentId(c.id)}>ویرایش</button>
                                              <button className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-[10px]" onClick={()=> onDeleteComponent(c.id)}>حذف</button>
                                            </>
                                          )}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[11px] text-gray-500">مولفه‌ای ثبت نشده</span>
                                    )}
                                  </div>
                                  {/* Add new component inline */}
                                  <div className="mt-3 flex items-center gap-2">
                                    <input className="flex-1 px-2 py-1 border rounded text-sm" placeholder="نام مولفه جدید"
                                      value={createInputByDomainId[d.id]?.name || ''}
                                      onChange={(e)=> setCreateInputByDomainId(prev=>({ ...prev, [d.id]: { ...(prev[d.id]||{}), name: e.target.value } }))} />
                                    <input type="number" className="w-24 px-2 py-1 border rounded text-sm" placeholder="ترتیب"
                                      value={createInputByDomainId[d.id]?.order ?? 0}
                                      onChange={(e)=> setCreateInputByDomainId(prev=>({ ...prev, [d.id]: { ...(prev[d.id]||{}), order: parseInt(e.target.value||'0',10) } }))} />
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={()=> onAddComponent(d.id)}>افزودن مولفه</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                                {/* Step indicator */}
                                <div className="text-sm text-gray-600">مرحله {domainModalStep} از 2</div>

                                {/* Step 1: Domains */}
                                {domainModalStep === 1 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">حیطه‌ها</h3>
                                        <div className="space-y-3">
                                            {domainInputs.map((d, idx) => (
                                                <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                                                    <input className="col-span-8 px-3 py-2 border rounded" placeholder={`نام حیطه ${idx+1}`}
                                                        value={d.name || ''}
                                                        onChange={(e)=>{
                                                            const next=[...domainInputs];
                                                            next[idx] = { ...(next[idx]||{}), name: e.target.value };
                                                            setDomainInputs(next);
                                                        }} />
                                                    <input type="number" className="col-span-2 px-3 py-2 border rounded" placeholder="ترتیب"
                                                        value={d.order ?? idx}
                                                        onChange={(e)=>{
                                                            const next=[...domainInputs];
                                                            next[idx] = { ...(next[idx]||{}), order: parseInt(e.target.value||'0',10) };
                                                            setDomainInputs(next);
                                                        }} />
                                                    <button type="button" className="col-span-2 px-3 py-2 bg-red-100 text-red-700 rounded"
                                                        onClick={()=> setDomainInputs(domainInputs.filter((_,i)=>i!==idx))}>حذف</button>
                                                </div>
                                            ))}
                                            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded"
                                                onClick={()=> setDomainInputs([...(domainInputs||[]), { name: '', order: domainInputs.length }])}>افزودن حیطه</button>
                                        </div>
                                        <div className="mt-4">
                                            <button type="button" className="px-4 py-2 bg-green-600 text-white rounded"
                                                onClick={()=> setDomainModalStep(2)}>ادامه به مولفه‌ها</button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Components */}
                                {domainModalStep === 2 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">مولفه‌ها</h3>
                                        {domainInputs.length === 0 && (
                                            <p className="text-sm text-gray-600">ابتدا در مرحله قبل حیطه اضافه کنید.</p>
                                        )}
                                        {domainInputs.map((d, dIdx) => (
                                            <div key={dIdx} className="border rounded p-4 space-y-3">
                                                <div className="font-semibold">{d.name || `حیطه ${dIdx+1}`}</div>
                                                {(componentsByDomain[dIdx] || []).map((c, cIdx) => (
                                                    <div key={cIdx} className="grid grid-cols-12 gap-3 items-center">
                                                        <input className="col-span-8 px-3 py-2 border rounded" placeholder={`نام مولفه ${cIdx+1}`}
                                                            value={c.name || ''}
                                                            onChange={(e)=>{
                                                                const next = { ...(componentsByDomain) };
                                                                const list = [...(next[dIdx] || [])];
                                                                list[cIdx] = { ...(list[cIdx]||{}), name: e.target.value };
                                                                next[dIdx] = list; setComponentsByDomain(next);
                                                            }} />
                                                        <input type="number" className="col-span-2 px-3 py-2 border rounded" placeholder="ترتیب"
                                                            value={c.order ?? cIdx}
                                                            onChange={(e)=>{
                                                                const next = { ...(componentsByDomain) };
                                                                const list = [...(next[dIdx] || [])];
                                                                list[cIdx] = { ...(list[cIdx]||{}), order: parseInt(e.target.value||'0',10) };
                                                                next[dIdx] = list; setComponentsByDomain(next);
                                                            }} />
                                                        <button type="button" className="col-span-2 px-3 py-2 bg-red-100 text-red-700 rounded"
                                                            onClick={()=>{
                                                                const next = { ...(componentsByDomain) };
                                                                next[dIdx] = (next[dIdx] || []).filter((_, i) => i !== cIdx);
                                                                setComponentsByDomain(next);
                                                            }}>حذف</button>
                                                    </div>
                                                ))}
                                                <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded"
                                                    onClick={()=>{
                                                        const next = { ...(componentsByDomain) };
                                                        next[dIdx] = [...(next[dIdx] || []), { name: '', order: (next[dIdx]?.length || 0) }];
                                                        setComponentsByDomain(next);
                                                    }}>افزودن مولفه</button>
                                            </div>
                                        ))}
                                        <div className="mt-4 flex gap-3">
                                            <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded"
                                                onClick={()=> setDomainModalStep(1)}>بازگشت به حیطه‌ها</button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button type="button" className="px-4 py-2 bg-green-600 text-white rounded"
                                        onClick={async ()=>{
                                            try{
                                                if(!selectedTestForDomains) return;
                                                const token = (await import('../../../app/store')).default.getState().auth?.token;
                                                const { testsApi } = await import('../../../services/testsApi');
                                                // 1) ایجاد حیطه‌ها و ساخت نگاشت نام→شناسه از پاسخ‌ها
                                                const nameToId = new Map();
                                                for(const d of domainInputs.filter(x=>x.name && x.name.trim())){
                                                    const res = await testsApi.createDomain({ examId: selectedTestForDomains.id, name: d.name.trim(), order: d.order ?? 0 }, token);
                                                    const created = res?.data?.domain || res?.domain || res;
                                                    if (created?.name && created?.id) {
                                                        nameToId.set(created.name, created.id);
                                                    }
                                                }
                                                // 3) ایجاد مولفه‌ها
                                                for(const [idx, comps] of Object.entries(componentsByDomain)){
                                                    const dName = domainInputs[idx]?.name;
                                                    const domainId = dName ? nameToId.get(dName) : null;
                                                    if(!domainId) continue;
                                                    for(const c of (comps||[]).filter(x=>x.name && x.name.trim())){
                                                        await testsApi.createComponent({ domainId, name: c.name.trim(), order: c.order ?? 0 }, token);
                                                    }
                                                }
                                                toast.success('حیطه‌ها و مولفه‌ها ثبت شدند');
                                                // Refresh lists and test details so new domains/components show up
                                                dispatch(fetchAdminTests());
                                                if (selectedTestForDomains?.id) {
                                                  dispatch(fetchTestDetails(selectedTestForDomains.id));
                                                }
                                                handleCloseDomainModal();
                                            }catch(e){
                                                console.error(e);
                                                toast.error('خطا در ثبت حیطه‌ها/مولفه‌ها');
                                            }
                                        }}>ثبت همه</button>
                                    <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded"
                                        onClick={handleCloseDomainModal}>بستن</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Test Details Modal */}
                {showDetailsModal && selectedTestId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl">
                            {/* Header */}
                            <div className="bg-white border-b border-gray-200 p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                <h2 className="text-2xl font-bold text-gray-900">جزئیات آزمون</h2>
                                        <p className="text-gray-600 mt-1">
                                            {byTestId[selectedTestId]?.testDetails?.title || 'در حال بارگذاری...'}
                                        </p>
                                    </div>
                                <button
                                    onClick={handleDetailsModalClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                                {/* Tabs */}
                                <div className="flex mt-6 border-b border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('info')}
                                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'info'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <FaFileAlt className="inline ml-2" />
                                        اطلاعات آزمون
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('questions')}
                                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'questions'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <FaQuestionCircle className="inline ml-2" />
                                        سوالات ({questions[selectedTestId]?.length || 0})
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
                            {detailsLoading ? (
                                    <div className="flex justify-center items-center py-12">
                                <LoadingState />
                                    </div>
                            ) : detailsError ? (
                                    <div className="flex justify-center items-center py-12">
                                <ErrorState message={detailsError} />
                                    </div>
                            ) : byTestId[selectedTestId]?.testDetails ? (
                                    <>
                                        {/* Info Tab */}
                                        {activeTab === 'info' && (
                                <div className="space-y-6">
                                                {/* Stats Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                                        <div className="flex items-center">
                                                            <FaTag className="text-blue-500 text-xl ml-3" />
                                        <div>
                                                                <p className="text-sm text-blue-600">دسته‌بندی</p>
                                                                <p className="font-semibold text-blue-900">
                                                                    {categoryMapping[byTestId[selectedTestId].testDetails.category] || byTestId[selectedTestId].testDetails.category || 'عمومی'}
                                                                </p>
                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                        <div className="flex items-center">
                                                            <FaQuestionCircle className="text-green-500 text-xl ml-3" />
                                                <div>
                                                                <p className="text-sm text-green-600">سوالات</p>
                                                                <p className="font-semibold text-green-900">
                                                                    {byTestId[selectedTestId].testDetails.question_count || 0}
                                                                </p>
                                                </div>
                                                </div>
                                                </div>

                                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                                        <div className="flex items-center">
                                                            <FaUsers className="text-purple-500 text-xl ml-3" />
                                                <div>
                                                                <p className="text-sm text-purple-600">شرکت‌کنندگان</p>
                                                                <p className="font-semibold text-purple-900">
                                                                    {byTestId[selectedTestId].testDetails.participantCount || 0}
                                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                                        <div className="flex items-center">
                                                            <FaClock className="text-orange-500 text-xl ml-3" />
                                                <div>
                                                                <p className="text-sm text-orange-600">زمان</p>
                                                                <p className="font-semibold text-orange-900">
                                                                    {byTestId[selectedTestId].testDetails.time || 30} دقیقه
                                                                </p>
                                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                                {/* Test Details */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">اطلاعات کلی</h3>
                                            <div className="space-y-3">
                                                <div>
                                                                    <span className="text-sm font-medium text-gray-600">گروه هدف:</span>
                                                                    <p className="text-gray-900">{byTestId[selectedTestId].testDetails.target_audience || 'عمومی'}</p>
                                                </div>
                                                <div>
                                                        <span className="text-sm font-medium text-gray-600">حیطه‌ها و مولفه‌ها:</span>
                                                        {(() => {
                                                            const testDetails = byTestId[selectedTestId].testDetails || {};
                                                            const domains = Array.isArray(testDetails.domains)
                                                                ? testDetails.domains
                                                                : (Array.isArray(testDetails.Domains) ? testDetails.Domains : []);
                                                            if (!domains.length) {
                                                                return (
                                                                    <p className="text-gray-500 mt-1 text-sm">تعریف نشده</p>
                                                                );
                                                            }
                                                            return (
                                                                <div className="mt-2 space-y-2">
                                                                    {domains.map((d) => (
                                                                        <div key={d.id} className="border border-gray-200 rounded-lg p-3">
                                                                            <div className="text-gray-900 font-semibold mb-2">{d.name}</div>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {Array.isArray(d.components) && d.components.length > 0
                                                                                    ? d.components.map((c) => (
                                                                                        <span key={c.id} className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">{c.name}</span>
                                                                                    ))
                                                                                    : (Array.isArray(d.Components) && d.Components.length > 0
                                                                                        ? d.Components.map((c) => (
                                                                                            <span key={c.id} className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">{c.name}</span>
                                                                                        ))
                                                                                        : <span className="text-gray-500 text-xs">مولفه‌ای ثبت نشده</span>)
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        })()}
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
                                    
                                                    <div className="space-y-4">
                                    <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">توضیحات</h3>
                                                            <div className="space-y-4">
                                    <div>
                                                                    <span className="text-sm font-medium text-gray-600">توضیحات کوتاه:</span>
                                                                    <p className="text-gray-700 mt-1">
                                            {byTestId[selectedTestId].testDetails.ShortDescription || 'توضیحات کوتاه در دسترس نیست'}
                                        </p>
                                    </div>
                                    <div>
                                                                    <span className="text-sm font-medium text-gray-600">توضیحات کامل:</span>
                                                                    <p className="text-gray-700 mt-1">
                                            {byTestId[selectedTestId].testDetails.mainDescription || 'توضیحات کامل در دسترس نیست'}
                                        </p>
                                    </div>
                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Questions Tab */}
                                        {activeTab === 'questions' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold text-gray-900">سوالات آزمون</h3>
                                                    <button
                                                        onClick={() => {
                                                            const test = tests.find(t => t.id === selectedTestId);
                                                            if (test) {
                                                                handleAddQuestions(test);
                                                            }
                                                        }}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                    >
                                                        <FaPlus />
                                                        افزودن سوال
                                                    </button>
                                                </div>

                                                {questionsLoading ? (
                                                    <div className="flex justify-center items-center py-8">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                    </div>
                                                ) : questions[selectedTestId] && questions[selectedTestId].length > 0 ? (
                                                    <div className="space-y-3">
                                                        {questions[selectedTestId].map((question, index) => (
                                                            <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                                                                    className="w-full p-4 text-right hover:bg-gray-50 transition-colors flex items-center justify-between"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                                                                            {index + 1}
                                                                        </span>
                                                                        <span className="text-gray-900 font-medium">
                                                                            {question.title}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm text-gray-500">
                                                                            {question.items?.length || 0} گزینه
                                                                        </span>
                                                                        <FaArrowLeft className={`text-gray-400 transition-transform ${
                                                                            expandedQuestion === question.id ? 'rotate-90' : ''
                                                                        }`} />
                                                                    </div>
                                                                </button>
                                                                
                                                                {expandedQuestion === question.id && (
                                                                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                                                                        {/* Domain & Component badges */}
                                                                        {(() => {
                                                                            const testDetails = byTestId[selectedTestId]?.testDetails || {};
                                                                            const domains = Array.isArray(testDetails.domains)
                                                                                ? testDetails.domains
                                                                                : (Array.isArray(testDetails.Domains) ? testDetails.Domains : []);
                                                                            let domainName = '';
                                                                            let componentName = '';
                                                                            if (question.domainId) {
                                                                                const d = domains.find(x => x.id === question.domainId);
                                                                                domainName = d?.name || '';
                                                                                if (question.componentId && d) {
                                                                                    const comp = (d.components || d.Components || []).find(c => c.id === question.componentId);
                                                                                    componentName = comp?.name || '';
                                                                                }
                                                                            }
                                                                            if (!domainName && question.componentId && domains.length) {
                                                                                for (const d of domains) {
                                                                                    const comp = (d.components || d.Components || []).find(c => c.id === question.componentId);
                                                                                    if (comp) {
                                                                                        domainName = d.name;
                                                                                        componentName = comp.name;
                                                                                        break;
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (domainName || componentName) {
                                                                                return (
                                                                                    <div className="mb-3 flex flex-wrap gap-2">
                                                                                        {domainName && (
                                                                                            <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">حیطه: {domainName}</span>
                                                                                        )}
                                                                                        {componentName && (
                                                                                            <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 border border-indigo-200">مولفه: {componentName}</span>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })()}
                                                                        <div className="space-y-2">
                                                                            {question.items && question.items.map((item, itemIndex) => (
                                                                                <div
                                                                                    key={itemIndex}
                                                                                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200"
                                                                                >
                                                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium bg-gray-300 text-gray-600">
                                                                                        {itemIndex + 1}
                                                                                    </div>
                                                                                    <span className="flex-1 text-gray-700">
                                                                                        {item}
                                                                                    </span>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-sm text-gray-500">ضریب:</span>
                                                                                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                                                                                            (question.weights && question.weights[itemIndex]) > 0 
                                                                                                ? 'bg-green-100 text-green-800' 
                                                                                                : (question.weights && question.weights[itemIndex]) < 0 
                                                                                                    ? 'bg-red-100 text-red-800'
                                                                                                    : 'bg-gray-100 text-gray-800'
                                                                                        }`}>
                                                                                            {question.weights && question.weights[itemIndex] !== undefined 
                                                                                                ? question.weights[itemIndex] 
                                                                                                : 1}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                </div>
                            ) : (
                                                    <div className="text-center py-12">
                                                        <FaQuestionCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                        <h4 className="text-lg font-medium text-gray-900 mb-2">هیچ سوالی ثبت نشده</h4>
                                                        <p className="text-gray-600 mb-4">برای این آزمون هنوز سوالی ایجاد نشده است.</p>
                                                        <button
                                                            onClick={() => {
                                                                const test = tests.find(t => t.id === selectedTestId);
                                                                if (test) {
                                                                    handleAddQuestions(test);
                                                                }
                                                            }}
                                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                                                        >
                                                            <FaPlus />
                                                            افزودن اولین سوال
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                    <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">اطلاعات یافت نشد</h3>
                                    <p className="text-gray-600">جزئیات این آزمون در دسترس نیست.</p>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmAction}
                title="تأیید تغییر وضعیت"
                message={confirmData ? `آیا می‌خواهید آزمون "${confirmData.test.title}" را ${confirmData.statusText} کنید؟` : "آیا می‌خواهید وضعیت این آزمون را تغییر دهید؟"}
                confirmText="تأیید"
                cancelText="انصراف"
                type="warning"
            />
        </div>
    );
}