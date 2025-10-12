import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { createUser, updateUser, clearError } from '../slices/userManagementSlice';
import { canAddAdmins } from '../utils/adminUtils';

export default function UserFormModal({ user, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userManagement);
  const currentUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    role: 'student',
    age: '',
    birthDate: '',
    isParent: false,
    childPhone: '',
    isFather: false,
    motherId: '',
    fatherId: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        userName: user.userName || '',
        phone: user.phone || '',
        email: user.email || '',
        role: user.role || 'student',
        age: user.age || '',
        birthDate: user.birthDate || '',
        isParent: user.isParent || false,
        childPhone: user.childPhone || '',
        isFather: user.isFather || false,
        motherId: user.motherId || '',
        fatherId: user.fatherId || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تلفن اجباری است';
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'سن باید بین 1 تا 120 باشد';
    }

    if (formData.childPhone && !/^09\d{9}$/.test(formData.childPhone)) {
      newErrors.childPhone = 'شماره تلفن فرزند باید با 09 شروع شود و 11 رقم باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (user) {
        await dispatch(updateUser({ id: user.id, userData: formData }));
        
        // If this is the current user and role changed, refresh the page
        if (currentUser && currentUser.id === user.id && formData.role !== user.role) {
          // Show notification
          toast.info('نقش شما تغییر کرد. صفحه در حال به‌روزرسانی است...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        await dispatch(createUser(formData));
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'superadmin': return 'سوپر ادمین';
      case 'admin': return 'مدیر';
      case 'teacher': return 'معلم';
      case 'student': return 'دانش‌آموز';
      case 'parent': return 'والدین';
      default: return role;
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
              {user ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
              <button
                onClick={() => dispatch(clearError())}
                className="float-right text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <FaUser />
                اطلاعات پایه
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام خانوادگی"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام کاربری"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    شماره تلفن *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="09123456789"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نقش
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="student">دانش‌آموز</option>
                    <option value="teacher">معلم</option>
                    <option value="parent">والدین</option>
                    {canAddAdmins(currentUser) && (
                      <option value="admin">مدیر</option>
                    )}
                    {canAddAdmins(currentUser) && (
                      <option value="superadmin">سوپر ادمین</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <FaCalendarAlt />
                اطلاعات تکمیلی
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    سن
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25"
                    min="1"
                    max="120"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاریخ تولد
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="17.11.1383"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">
                اطلاعات والدین
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isParent"
                    checked={formData.isParent}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="mr-2 text-sm text-gray-700">
                    والدین است
                  </label>
                </div>

                {formData.isParent && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        شماره تلفن فرزند
                      </label>
                      <input
                        type="tel"
                        name="childPhone"
                        value={formData.childPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="09123456789"
                      />
                      {errors.childPhone && (
                        <p className="text-red-500 text-xs mt-1">{errors.childPhone}</p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isFather"
                        checked={formData.isFather}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-sm text-gray-700">
                        پدر است
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <FaSave />
                {loading ? 'در حال ذخیره...' : (user ? 'بروزرسانی' : 'ایجاد')}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
