import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExamAttempts } from '../../features/admin/slices/adminExamResultsSlice';
import { adminAuth } from '../../services/adminAuth';
import { FaChartBar, FaUser, FaPhone, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';

export default function ExamResults() {
  const dispatch = useDispatch();
  const { attempts = [], pagination = {}, loading, error } = useSelector((s) => s.adminExamResults.allAttempts || {});
  
  // Check admin access
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = adminAuth.validateAdminAccess(user);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getAllExamAttempts({ page: 1, limit: 50 }));
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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  // Calculate statistics
  const stats = {
    total: attempts.length,
    completed: attempts.filter(a => a.status === 'completed').length,
    averageScore: attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) : 0,
    todayAttempts: attempts.filter(a => {
      const today = new Date().toDateString();
      const attemptDate = new Date(a.completedAt).toDateString();
      return today === attemptDate;
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">لیست آزمون‌های انجام‌شده</h1>
              <p className="text-gray-600 text-lg">مشاهده و تحلیل نتایج آزمون‌های کاربران</p>
            </div>
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
                  <p className="text-sm font-medium text-gray-600">تکمیل شده</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">میانگین نمره</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.averageScore}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaUser className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">امروز</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.todayAttempts}</p>
                  <p className="text-xs text-gray-500">آزمون</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FaCalendarAlt className="text-orange-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attempts Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">لیست آزمون‌های انجام‌شده</h3>
            <p className="text-gray-600 mt-1">نمایش تمام آزمون‌هایی که توسط کاربران انجام شده است</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">کاربر</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">شماره تماس</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">آزمون</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">نمره</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">امتیاز وزنی</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">تاریخ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attempts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <FaChartBar className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ آزمونی انجام نشده</h3>
                        <p className="text-gray-600">هنوز هیچ کاربری آزمونی انجام نداده است.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  attempts.map(attempt => (
                    <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {attempt.user?.firstName} {attempt.user?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {attempt.user?.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FaPhone className="h-4 w-4 text-gray-400 mr-2" />
                          {attempt.user?.phone || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {attempt.examTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {attempt.examId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            attempt.score >= 80 ? 'bg-green-100 text-green-800' :
                            attempt.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {attempt.score}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FaChartBar className="h-4 w-4 text-gray-400 mr-2" />
                          {attempt.weightedSum} / {attempt.maxWeightedSum}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                          {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString('fa-IR') : '-'}
                        </div>
                        {attempt.completedAt && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <FaClock className="h-3 w-3 text-gray-400 mr-1" />
                            {new Date(attempt.completedAt).toLocaleTimeString('fa-IR')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          attempt.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {attempt.status === 'completed' ? 'تکمیل شده' : 'ناتمام'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
