import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaComments, FaSpinner } from 'react-icons/fa';
import { moderateComment as moderateCommentApi } from '../../services/commentsApi';
import { fetchRecentComments, selectRecentComments, selectCommentsStats, selectDashboardLoading } from '../../features/admin/slices/dashboardSlice';
import moment from 'moment-jalaali';

export default function Comments() {
  const dispatch = useDispatch();
  const comments = useSelector(selectRecentComments);
  const stats = useSelector(selectCommentsStats);
  const loading = useSelector((state) => state.dashboard.loading.recentComments);
  const token = useSelector((state) => state.auth?.token);
  const [moderating, setModerating] = useState({});

  useEffect(() => {
    if (token) {
      dispatch(fetchRecentComments({ token, limit: 50, days: 30 }));
    }
  }, [dispatch, token]);

  const handleModerate = async (commentId, action) => {
    setModerating({ ...moderating, [commentId]: true });
    try {
      await moderateCommentApi(commentId, action);
      // بارگذاری مجدد کامنت‌ها
      dispatch(fetchRecentComments({ token, limit: 50, days: 30 }));
    } catch (error) {
      console.error('Error moderating comment:', error);
      alert('خطا در تایید/رد کامنت');
    } finally {
      setModerating({ ...moderating, [commentId]: false });
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'در انتظار تایید', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      approved: { label: 'تایید شده', color: 'bg-green-100 text-green-700 border-green-300' },
      rejected: { label: 'رد شده', color: 'bg-red-100 text-red-700 border-red-300' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getEntityTypeLabel = (type) => {
    const map = {
      'article': 'مقاله',
      'test': 'آزمون',
      'course': 'دوره',
      'product': 'محصول',
      'podcast': 'پادکست',
      'webinar': 'وبینار',
      'consultant': 'مشاور'
    };
    return map[type] || type;
  };

  const getUserName = (user) => {
    if (!user) return 'کاربر ناشناس';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const userName = user.userName || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    if (userName) return userName;
    return 'کاربر ناشناس';
  };

  const pendingComments = comments.filter(c => c.status === 'pending');
  const approvedComments = comments.filter(c => c.status === 'approved');
  const rejectedComments = comments.filter(c => c.status === 'rejected');

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <FaComments className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">مدیریت نظرات</h1>
        </div>
        
        {/* آمار */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-500">کل نظرات</div>
            <div className="text-2xl font-bold text-gray-800">{stats?.total || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-500">در انتظار تایید</div>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-500">تایید شده</div>
            <div className="text-2xl font-bold text-green-600">{approvedComments.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="text-sm text-gray-500">رد شده</div>
            <div className="text-2xl font-bold text-red-600">{rejectedComments.length}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* کامنت‌های در انتظار تایید */}
          {pendingComments.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                در انتظار تایید ({pendingComments.length})
              </h2>
              <div className="bg-white rounded-lg shadow divide-y">
                {pendingComments.map((comment) => (
                  <div key={comment.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-800">
                            {getUserName(comment.user)}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {moment(comment.createdAt).format('jYYYY/jMM/jDD HH:mm')}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-blue-600">
                            {getEntityTypeLabel(comment.section_type)} #{comment.section_id}
                          </span>
                          {getStatusBadge(comment.status)}
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap mb-3">{comment.text}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>👍 {comment.likes_count || 0}</span>
                          <span>👎 {comment.dislikes_count || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleModerate(comment.id, 'approve')}
                          disabled={moderating[comment.id]}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {moderating[comment.id] ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaCheck />
                          )}
                          <span>تایید</span>
                        </button>
                        <button
                          onClick={() => handleModerate(comment.id, 'reject')}
                          disabled={moderating[comment.id]}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {moderating[comment.id] ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTimes />
                          )}
                          <span>رد</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* کامنت‌های تایید شده */}
          {approvedComments.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                تایید شده ({approvedComments.length})
              </h2>
              <div className="bg-white rounded-lg shadow divide-y">
                {approvedComments.slice(0, 10).map((comment) => (
                  <div key={comment.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-800">
                            {getUserName(comment.user)}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {moment(comment.createdAt).format('jYYYY/jMM/jDD HH:mm')}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-blue-600">
                            {getEntityTypeLabel(comment.section_type)} #{comment.section_id}
                          </span>
                          {getStatusBadge(comment.status)}
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* کامنت‌های رد شده */}
          {rejectedComments.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                رد شده ({rejectedComments.length})
              </h2>
              <div className="bg-white rounded-lg shadow divide-y">
                {rejectedComments.map((comment) => (
                  <div key={comment.id} className="p-4 hover:bg-gray-50 transition-colors border-l-4 border-red-400">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-800">
                            {getUserName(comment.user)}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {moment(comment.createdAt).format('jYYYY/jMM/jDD HH:mm')}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-blue-600">
                            {getEntityTypeLabel(comment.section_type)} #{comment.section_id}
                          </span>
                          {getStatusBadge(comment.status)}
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap mb-3 line-through opacity-70">{comment.text}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>👍 {comment.likes_count || 0}</span>
                          <span>👎 {comment.dislikes_count || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleModerate(comment.id, 'approve')}
                          disabled={moderating[comment.id]}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {moderating[comment.id] ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaCheck />
                          )}
                          <span>تایید مجدد</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pendingComments.length === 0 && approvedComments.length === 0 && rejectedComments.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FaComments className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">هیچ کامنتی برای بررسی وجود ندارد.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

