import { useState, useEffect } from 'react';
import { testsApi } from '../../../services/testsApi';
import { useSelector } from 'react-redux';
import { FaTimes, FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import ConfirmModal from '../../../components/shared/ConfirmModal';

export default function QuestionsManagementModal({ test, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (test) {
      fetchQuestions();
    }
  }, [test]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await testsApi.getTestQuestions(test.id, token);
      setQuestions(response.data || response);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('خطا در دریافت سوالات: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowAddModal(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowAddModal(true);
  };

  const handleDeleteQuestion = (question) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;
    
    try {
      // Note: You'll need to implement deleteQuestion API method
      // await testsApi.deleteQuestion(test.id, questionToDelete.id, token);
      
      // For now, just remove from local state
      setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
      setShowDeleteModal(false);
      setQuestionToDelete(null);
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('خطا در حذف سوال: ' + error.message);
    }
  };

  const handleQuestionSaved = () => {
    setShowAddModal(false);
    setEditingQuestion(null);
    fetchQuestions();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">مدیریت سوالات</h2>
            <p className="text-gray-600 mt-1">{test?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">سوالات آزمون</h3>
              <p className="text-gray-600">تعداد سوالات: {questions.length}</p>
            </div>
            <button
              onClick={handleAddQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              افزودن سوال جدید
            </button>
          </div>

          {/* Questions List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">در حال بارگذاری...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">هیچ سوالی برای این آزمون وجود ندارد.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        سوال {index + 1}
                      </span>
                      <span className="text-sm text-gray-600">
                        نوع: {question.type === 'multiple_choice' ? 'چندگزینه‌ای' : 'تشریحی'}
                      </span>
                      <span className="text-sm text-gray-600">
                        امتیاز: {question.points || 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="ویرایش"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-900 font-medium">{question.question_text}</p>
                  </div>

                  {question.type === 'multiple_choice' && question.options && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">گزینه‌ها:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correct_answer
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            <span className="font-medium">
                              {String.fromCharCode(65 + optionIndex)}:
                            </span>
                            <span className="mr-2">{option}</span>
                            {optionIndex === question.correct_answer && (
                              <span className="text-green-600 font-medium">(پاسخ صحیح)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {question.explanation && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-700 mb-1">توضیح:</p>
                      <p className="text-sm text-gray-600">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <QuestionFormModal
            test={test}
            question={editingQuestion}
            onClose={() => setShowAddModal(false)}
            onSave={handleQuestionSaved}
          />
        )}

        {showDeleteModal && (
          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDeleteQuestion}
            title="حذف سوال"
            message={`آیا از حذف این سوال اطمینان دارید؟`}
            confirmText="حذف"
            cancelText="انصراف"
          />
        )}
      </div>
    </div>
  );
}
