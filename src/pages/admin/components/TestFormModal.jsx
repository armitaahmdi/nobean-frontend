import { useState, useEffect } from 'react';
import { testsApi } from '../../services/testsApi';
import { useSelector } from 'react-redux';
import { FaTimes, FaSave } from 'react-icons/fa';

export default function TestFormModal({ test, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    target_audience: '',
    duration: 30,
    difficulty: 'medium',
    status: 'active',
    image: '',
    tags: '',
    instructions: '',
    passing_score: 60,
    max_attempts: 3,
    is_public: true,
    requires_login: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (test) {
      setFormData({
        title: test.title || '',
        description: test.description || '',
        category: test.category || '',
        target_audience: test.target_audience || '',
        duration: test.duration || 30,
        difficulty: test.difficulty || 'medium',
        status: test.status || 'active',
        image: test.image || '',
        tags: test.tags?.join(', ') || '',
        instructions: test.instructions || '',
        passing_score: test.passing_score || 60,
        max_attempts: test.max_attempts || 3,
        is_public: test.is_public !== undefined ? test.is_public : true,
        requires_login: test.requires_login !== undefined ? test.requires_login : true,
      });
    }
  }, [test]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'عنوان آزمون الزامی است';
    if (!formData.description.trim()) newErrors.description = 'توضیحات آزمون الزامی است';
    if (!formData.category.trim()) newErrors.category = 'دسته‌بندی الزامی است';
    if (!formData.target_audience.trim()) newErrors.target_audience = 'گروه هدف الزامی است';
    if (formData.duration < 1) newErrors.duration = 'مدت زمان باید بیشتر از 0 باشد';
    if (formData.passing_score < 0 || formData.passing_score > 100) {
      newErrors.passing_score = 'نمره قبولی باید بین 0 تا 100 باشد';
    }
    if (formData.max_attempts < 1) newErrors.max_attempts = 'حداکثر تلاش باید بیشتر از 0 باشد';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        duration: parseInt(formData.duration),
        passing_score: parseInt(formData.passing_score),
        max_attempts: parseInt(formData.max_attempts),
      };

      if (test) {
        // Update existing test
        await testsApi.updateTest(test.id, submitData, token);
      } else {
        // Create new test
        await testsApi.createTest(submitData, token);
      }

      onSave();
    } catch (error) {
      console.error('Error saving test:', error);
      alert('خطا در ذخیره آزمون: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {test ? 'ویرایش آزمون' : 'افزودن آزمون جدید'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان آزمون *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="عنوان آزمون را وارد کنید"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">انتخاب دسته‌بندی</option>
                <option value="learning_disability">اختلال یادگیری</option>
                <option value="attention_disorder">اختلال توجه</option>
                <option value="behavioral">رفتاری</option>
                <option value="cognitive">شناختی</option>
                <option value="developmental">تکاملی</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="توضیحات آزمون را وارد کنید"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                گروه هدف *
              </label>
              <select
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.target_audience ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">انتخاب گروه هدف</option>
                <option value="children">کودکان</option>
                <option value="parents">والدین</option>
                <option value="family">خانواده</option>
                <option value="teachers">معلمان</option>
                <option value="professionals">متخصصان</option>
              </select>
              {errors.target_audience && <p className="text-red-500 text-sm mt-1">{errors.target_audience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                سطح دشواری
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">آسان</option>
                <option value="medium">متوسط</option>
                <option value="hard">سخت</option>
              </select>
            </div>
          </div>

          {/* Test Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مدت زمان (دقیقه) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نمره قبولی (%) *
              </label>
              <input
                type="number"
                name="passing_score"
                value={formData.passing_score}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.passing_score ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.passing_score && <p className="text-red-500 text-sm mt-1">{errors.passing_score}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداکثر تلاش *
              </label>
              <input
                type="number"
                name="max_attempts"
                value={formData.max_attempts}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.max_attempts ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.max_attempts && <p className="text-red-500 text-sm mt-1">{errors.max_attempts}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              برچسب‌ها
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="برچسب‌ها را با کاما جدا کنید"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              دستورالعمل آزمون
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="دستورالعمل آزمون را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              آدرس تصویر
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="آدرس تصویر آزمون"
            />
          </div>

          {/* Status and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
                <option value="draft">پیش‌نویس</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleChange}
                  className="ml-2"
                />
                <span className="text-sm font-medium text-gray-700">آزمون عمومی</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="requires_login"
                  checked={formData.requires_login}
                  onChange={handleChange}
                  className="ml-2"
                />
                <span className="text-sm font-medium text-gray-700">نیاز به ورود</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <FaSave />
              {loading ? 'در حال ذخیره...' : (test ? 'ویرایش' : 'افزودن')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
