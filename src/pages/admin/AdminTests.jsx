import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests } from '../../features/user/tests/testsSlice';
import { testsApi } from '../../services/testsApi';
import { adminAuth } from '../../services/adminAuth';
import { FaPlus, FaEdit, FaTrash, FaEye, FaQuestionCircle } from 'react-icons/fa';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import ConfirmModal from '../../components/shared/ConfirmModal';

export default function AdminTests() {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((state) => state.tests);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check admin access
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = adminAuth.validateAdminAccess(user);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchTests());
    }
  }, [dispatch, isAdmin]);

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
    setEditingTest(null);
    setShowAddModal(true);
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setShowAddModal(true);
  };

  const handleDeleteTest = (test) => {
    setTestToDelete(test);
    setShowDeleteModal(true);
  };

  const handleManageQuestions = (test) => {
    setSelectedTest(test);
    setShowQuestionsModal(true);
  };

  const confirmDelete = async () => {
    if (!testToDelete) return;
    
    setActionLoading(true);
    try {
      const token = useSelector((state) => state.auth?.token);
      await testsApi.deleteTest(testToDelete.id, token);
      
      // Refresh tests list
      dispatch(fetchTests());
      setShowDeleteModal(false);
      setTestToDelete(null);
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('خطا در حذف آزمون: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleTestSaved = () => {
    setShowAddModal(false);
    setEditingTest(null);
    dispatch(fetchTests());
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت آزمون‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت و ویرایش آزمون‌های موجود</p>
        </div>
        <button
          onClick={handleAddTest}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          افزودن آزمون جدید
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaQuestionCircle className="text-blue-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm text-gray-600">کل آزمون‌ها</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaEye className="text-green-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm text-gray-600">آزمون‌های فعال</p>
              <p className="text-2xl font-bold text-gray-900">
                {tests.filter(test => test.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaEdit className="text-yellow-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm text-gray-600">آزمون‌های در انتظار</p>
              <p className="text-2xl font-bold text-gray-900">
                {tests.filter(test => test.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">لیست آزمون‌ها</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عنوان آزمون
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  دسته‌بندی
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ ایجاد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={test.image || '/default-test.png'}
                          alt={test.title}
                        />
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">
                          {test.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {test.description?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {test.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      test.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(test.created_at).toLocaleDateString('fa-IR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleManageQuestions(test)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="مدیریت سوالات"
                      >
                        <FaQuestionCircle />
                      </button>
                      <button
                        onClick={() => handleEditTest(test)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="ویرایش"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test)}
                        className="text-red-600 hover:text-red-900 p-1"
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

      {/* Modals */}
      {showAddModal && (
        <TestFormModal
          test={editingTest}
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
          message={`آیا از حذف آزمون "${testToDelete?.title}" اطمینان دارید؟`}
          confirmText="حذف"
          cancelText="انصراف"
          loading={actionLoading}
        />
      )}

      {showQuestionsModal && (
        <QuestionsManagementModal
          test={selectedTest}
          onClose={() => setShowQuestionsModal(false)}
        />
      )}
    </div>
  );
}
