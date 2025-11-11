import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown, FaReply, FaFlag, FaUser, FaSpinner } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import {
  fetchComments,
  createComment,
  likeComment,
  dislikeComment,
  reportComment
} from '../../services/commentsApi';

// Helper function برای تولید رنگ پاستلی ترتیبی بر اساس index
const getPastelColor = (index) => {
  const pastelColors = [
    { bg: 'from-pink-200 to-pink-300', text: 'text-pink-700' },
    { bg: 'from-blue-200 to-blue-300', text: 'text-blue-700' },
    { bg: 'from-purple-200 to-purple-300', text: 'text-purple-700' },
    { bg: 'from-green-200 to-green-300', text: 'text-green-700' },
    { bg: 'from-yellow-200 to-yellow-300', text: 'text-yellow-700' },
    { bg: 'from-orange-200 to-orange-300', text: 'text-orange-700' },
    { bg: 'from-cyan-200 to-cyan-300', text: 'text-cyan-700' },
    { bg: 'from-indigo-200 to-indigo-300', text: 'text-indigo-700' },
    { bg: 'from-teal-200 to-teal-300', text: 'text-teal-700' },
    { bg: 'from-rose-200 to-rose-300', text: 'text-rose-700' },
  ];
  if (index === undefined || index === null || isNaN(index)) {
    return pastelColors[0]; // رنگ پیش‌فرض
  }
  return pastelColors[index % pastelColors.length];
};

// Helper function برای گرفتن حرف اول اسم
const getInitials = (user) => {
  if (!user) return 'ن';
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const userName = user.userName || '';
  
  if (firstName) {
    return firstName.charAt(0).toUpperCase();
  }
  if (lastName) {
    return lastName.charAt(0).toUpperCase();
  }
  if (userName) {
    return userName.charAt(0).toUpperCase();
  }
  return 'ن';
};

// Helper function برای گرفتن نام کامل
const getFullName = (user) => {
  if (!user) return 'کاربر ناشناس';
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const userName = user.userName || '';
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  if (lastName) {
    return lastName;
  }
  if (userName) {
    return userName;
  }
  return 'کاربر ناشناس';
};

const CommentItem = ({ comment, onReply, onLike, onDislike, onReport, isReply = false, index = 0, currentUser = null }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyText.trim());
      setReplyText('');
      setShowReply(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'همین الان';
    if (diffMins < 60) return `${diffMins} دقیقه پیش`;
    if (diffHours < 24) return `${diffHours} ساعت پیش`;
    if (diffDays < 7) return `${diffDays} روز پیش`;
    return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const user = comment.user || null;
  const initials = getInitials(user);
  const fullName = getFullName(user);
  const colorScheme = getPastelColor(index) || { bg: 'from-blue-200 to-blue-300', text: 'text-blue-700' };
  
  // بررسی اینکه آیا این کامنت pending هست و کاربر فعلی صاحبش هست
  const isPending = comment.status === 'pending';
  const isOwner = currentUser && (currentUser.id === comment.user_id || currentUser.id === user?.id);

  return (
    <div className={`${isReply ? 'mr-6' : ''} bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 ${isPending && isOwner ? 'border-yellow-300 bg-yellow-50/30' : ''}`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorScheme?.bg || 'from-blue-200 to-blue-300'} flex items-center justify-center ${colorScheme?.text || 'text-blue-700'} font-bold shadow-lg flex-shrink-0 text-base`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-gray-800">{fullName}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
            {isPending && isOwner && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full border border-yellow-300">
                در انتظار تایید
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-7 whitespace-pre-wrap mb-4">{comment.text}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95 group"
        >
          <FaThumbsUp className="text-sm group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{comment.likes_count || 0}</span>
        </button>
        
        <button
          onClick={() => onDislike(comment.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-105 active:scale-95 group"
        >
          <FaThumbsDown className="text-sm group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{comment.dislikes_count || 0}</span>
        </button>

        <button
          onClick={() => setShowReply(!showReply)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 active:scale-95 group"
        >
          <FaReply className="text-sm group-hover:scale-110 transition-transform" />
          <span className="text-sm">پاسخ</span>
        </button>

        <button
          onClick={() => onReport(comment.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 group"
        >
          <FaFlag className="text-xs group-hover:scale-110 transition-transform" />
          <span className="text-xs">گزارش</span>
        </button>
      </div>

      {/* Reply Input */}
      {showReply && (
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSubmitReply();
              }
            }}
            className="w-full rounded-lg border border-blue-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white shadow-sm min-h-[100px] leading-6"
            placeholder="پاسخ خود را بنویسید... (Ctrl+Enter برای ارسال)"
            rows="6"
          />
          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              onClick={() => {
                setShowReply(false);
                setReplyText('');
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={handleSubmitReply}
              disabled={!replyText.trim() || isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>در حال ارسال...</span>
                </>
              ) : (
                <>
                  <FaReply />
                  <span>ارسال پاسخ</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {(comment.Replies || []).length > 0 && (
        <div className="mt-4 pr-4 border-r-2 border-blue-200 space-y-4">
          {comment.Replies.map((r, replyIndex) => (
            <CommentItem
              key={r.id}
              comment={r}
              onReply={onReply}
              onLike={onLike}
              onDislike={onDislike}
              onReport={onReport}
              isReply={true}
              index={index * 10 + replyIndex + 1}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ entityType, entityId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // دریافت اطلاعات کاربر از Redux
  const { profile } = useSelector((state) => state.profile || {});
  const { user } = useSelector((state) => state.auth || {});
  const currentUser = profile || user?.user || user || null;

  const query = useMemo(() => ({ entityType, entityId }), [entityType, entityId]);
  
  // محاسبه آواتار و نام کاربر فعلی
  const currentUserInitials = getInitials(currentUser);
  const currentUserFullName = getFullName(currentUser);
  // استفاده از تعداد کامنت‌ها برای تعیین رنگ بعدی (ترتیبی)
  const currentUserColorScheme = getPastelColor(items.length) || { bg: 'from-blue-200 to-blue-300', text: 'text-blue-700' };

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchComments(query);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'خطا در دریافت نظرات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId]);

  const onSubmit = async () => {
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createComment({ text: text.trim(), entityType, entityId });
      setText('');
      await load();
    } catch (e) {
      setError(e.message || 'ارسال نظر ناموفق بود');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId, replyText) => {
    try {
      await createComment({ text: replyText, entityType, entityId, parentId });
      await load();
    } catch (e) {
      setError(e.message || 'ارسال پاسخ ناموفق بود');
    }
  };

  const handleLike = async (id) => {
    try {
      await likeComment(id);
      await load();
    } catch (e) {
      setError(e.message || 'خطا در لایک');
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeComment(id);
      await load();
    } catch (e) {
      setError(e.message || 'خطا در دیسلایک');
    }
  };

  const handleReport = async (id) => {
    const reason = window.prompt('دلیل گزارش را وارد کنید (اختیاری):') || '';
    try {
      await reportComment(id, reason.trim() || null);
      alert('گزارش ارسال شد. متشکریم');
    } catch (e) {
      setError(e.message || 'خطا در گزارش');
    }
  };

  const totalComments = items.reduce((sum, item) => sum + 1 + (item.Replies?.length || 0), 0);

  return (
    <div className="mt-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
          <HiOutlineChatBubbleLeftRight className="text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            نظرات
            {totalComments > 0 && (
              <span className="text-base font-normal text-gray-500">({totalComments})</span>
            )}
          </h3>
          <p className="text-sm text-gray-500 mt-1">نظرات و دیدگاه‌های شما</p>
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentUserColorScheme?.bg || 'from-blue-200 to-blue-300'} flex items-center justify-center ${currentUserColorScheme?.text || 'text-blue-700'} font-bold shadow-md flex-shrink-0 text-base`}>
            {currentUserInitials}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                onSubmit();
              }
            }}
            placeholder="نظر خود را بنویسید... (Ctrl+Enter برای ارسال)"
            className="flex-1 rounded-lg border border-blue-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white shadow-sm min-h-[120px] leading-6"
            rows="8"
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onSubmit}
            disabled={!text.trim() || isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>در حال ارسال...</span>
              </>
            ) : (
              <>
                <HiOutlineChatBubbleLeftRight />
                <span>ارسال نظر</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="text-4xl text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500">در حال بارگذاری نظرات...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((c, mainIndex) => (
              <CommentItem
                key={c.id}
                comment={c}
                onReply={handleReply}
                onLike={handleLike}
                onDislike={handleDislike}
                onReport={handleReport}
                index={mainIndex}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <HiOutlineChatBubbleLeftRight className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">هنوز نظری ثبت نشده است.</p>
              <p className="text-sm text-gray-400 mt-2">اولین نفری باشید که نظر می‌دهد!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;


