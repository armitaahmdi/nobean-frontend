import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaSpinner, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../../services/notificationsApi';
import moment from 'moment-jalaali';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetchNotifications({ limit: 10, unread_only: false });
      setNotifications(response.notifications || []);
      setUnreadCount(response.unreadCount || 0);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // بارگذاری اولیه
    loadNotifications();

    // Polling هر 30 ثانیه
    const interval = setInterval(() => {
      loadNotifications();
    }, 30000); // 30 ثانیه

    return () => clearInterval(interval);
  }, []);

  // بستن dropdown با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleNotificationClick = async (notification) => {
    // mark as read
    if (!notification.is_read) {
      try {
        await markNotificationAsRead(notification.id);
        setNotifications(prev => 
          prev.map(n => n.id === notification.id ? { ...n, is_read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }

    // هدایت به صفحه کامنت‌ها
    navigate('/admin/comments');
    setShowDropdown(false);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.is_read);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        title="اعلان‌ها"
      >
        <FaBell className="text-xl text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">اعلان‌ها</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <FaCheck className="text-xs" />
                <span>همه را خوانده شده علامت بزن</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <FaSpinner className="text-2xl text-blue-500 animate-spin" />
              </div>
            ) : unreadNotifications.length === 0 && notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                هیچ اعلان جدیدی وجود ندارد
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.is_read ? 'bg-blue-50/50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        !notification.is_read ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {moment(notification.createdAt).format('jYYYY/jMM/jDD HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  navigate('/admin/comments');
                  setShowDropdown(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                مشاهده همه اعلان‌ها
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

