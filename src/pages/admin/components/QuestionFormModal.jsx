import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { testsApi } from '../../../services/testsApi';
import { useSelector } from 'react-redux';
import { FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

export default function QuestionFormModal({ test, question, onClose, onSave }) {
  const [formData, setFormData] = useState({
    question_text: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    correct_answer: 0,
    points: 1,
    explanation: '',
    difficulty: 'medium',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (question) {
      setFormData({
        question_text: question.question_text || '',
        type: question.type || 'multiple_choice',
        options: question.options || ['', '', '', ''],
        correct_answer: question.correct_answer || 0,
        points: question.points || 1,
        explanation: question.explanation || '',
        difficulty: question.difficulty || 'medium',
        category: question.category || '',
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correct_answer: prev.correct_answer >= index ? prev.correct_answer - 1 : prev.correct_answer
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.question_text.trim()) {
      newErrors.question_text = 'متن سوال الزامی است';
    }
    
    if (formData.type === 'multiple_choice') {
      const validOptions = formData.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        newErrors.options = 'حداقل 2 گزینه الزامی است';
      }
      
      if (formData.correct_answer >= validOptions.length) {
        newErrors.correct_answer = 'پاسخ صحیح باید از گزینه‌های موجود انتخاب شود';
      }
    }
    
    if (formData.points < 1) {
      newErrors.points = 'امتیاز باید بیشتر از 0 باشد';
    }

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
        options: formData.type === 'multiple_choice' ? formData.options.filter(opt => opt.trim()) : [],
        points: parseInt(formData.points),
        correct_answer: parseInt(formData.correct_answer),
      };

      if (question) {
        // Update existing question
        // await testsApi.updateQuestion(test.id, question.id, submitData, token);
        console.log('Update question:', submitData);
      } else {
        // Create new question
        await testsApi.addQuestionToTest(test.id, submitData, token);
      }

      onSave();
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error('خطا در ذخیره سوال: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {question ? 'ویرایش سوال' : 'افزودن سوال جدید'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن سوال *
            </label>
            <textarea
              name="question_text"
              value={formData.question_text}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.question_text ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="متن سوال را وارد کنید"
            />
            {errors.question_text && <p className="text-red-500 text-sm mt-1">{errors.question_text}</p>}
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع سوال
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="multiple_choice">چندگزینه‌ای</option>
              <option value="true_false">صحیح/غلط</option>
              <option value="short_answer">پاسخ کوتاه</option>
              <option value="essay">تشریحی</option>
            </select>
          </div>

          {/* Multiple Choice Options */}
          {formData.type === 'multiple_choice' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                گزینه‌ها *
              </label>
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct_answer"
                        value={index}
                        checked={formData.correct_answer === index}
                        onChange={handleChange}
                        className="text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}:
                      </span>
                    </div>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`گزینه ${String.fromCharCode(65 + index)}`}
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                {formData.options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm"
                  >
                    <FaPlus />
                    افزودن گزینه
                  </button>
                )}
              </div>
              {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options}</p>}
              {errors.correct_answer && <p className="text-red-500 text-sm mt-1">{errors.correct_answer}</p>}
            </div>
          )}

          {/* True/False Options */}
          {formData.type === 'true_false' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                پاسخ صحیح
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="correct_answer"
                    value="0"
                    checked={formData.correct_answer === 0}
                    onChange={handleChange}
                    className="ml-2"
                  />
                  <span>صحیح</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="correct_answer"
                    value="1"
                    checked={formData.correct_answer === 1}
                    onChange={handleChange}
                    className="ml-2"
                  />
                  <span>غلط</span>
                </label>
              </div>
            </div>
          )}

          {/* Question Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                امتیاز سوال *
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.points ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              دسته‌بندی سوال
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="دسته‌بندی سوال (اختیاری)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیح پاسخ
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="توضیح پاسخ صحیح (اختیاری)"
            />
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
              {loading ? 'در حال ذخیره...' : (question ? 'ویرایش' : 'افزودن')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
