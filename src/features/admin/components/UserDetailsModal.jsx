import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'مدیر';
      case 'teacher': return 'معلم';
      case 'student': return 'دانش‌آموز';
      case 'parent': return 'والدین';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'parent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              جزئیات کاربر
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.firstName?.charAt(0) || user.userName?.charAt(0) || '?'}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-gray-600">
                  {user.userName || 'نام کاربری ندارد'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                    {getRoleText(user.role)}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? <FaToggleOn /> : <FaToggleOff />}
                    {user.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h5 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <FaPhone />
                اطلاعات تماس
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    شماره تلفن
                  </label>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    ایمیل
                  </label>
                  <p className="text-gray-900">{user.email || 'ثبت نشده'}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h5 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <FaUser />
                اطلاعات شخصی
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    سن
                  </label>
                  <p className="text-gray-900">{user.age || 'ثبت نشده'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    تاریخ تولد
                  </label>
                  <p className="text-gray-900">{user.birthDate || 'ثبت نشده'}</p>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            {user.isParent && (
              <div className="space-y-4">
                <h5 className="text-md font-medium text-gray-900 flex items-center gap-2">
                  <FaUser />
                  اطلاعات والدین
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      شماره تلفن فرزند
                    </label>
                    <p className="text-gray-900">{user.childPhone || 'ثبت نشده'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      نوع والدین
                    </label>
                    <p className="text-gray-900">
                      {user.isFather ? 'پدر' : 'مادر'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="space-y-4">
              <h5 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <FaCalendarAlt />
                اطلاعات حساب
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    تاریخ ثبت نام
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    آخرین بروزرسانی
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.updatedAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
