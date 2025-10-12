import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, fetchTestQuestions } from '../slices/adminQuestionsSlice';

// Test component to verify question creation functionality
export default function TestQuestionIntegration() {
    const dispatch = useDispatch();
    const { createLoading, createError, questions } = useSelector((state) => state.adminQuestions);
    const [testId, setTestId] = useState('');
    const [questionTitle, setQuestionTitle] = useState('');
    const [options, setOptions] = useState(['گزینه 1', 'گزینه 2', 'گزینه 3', 'گزینه 4']);
    const [correctIndex, setCorrectIndex] = useState(0);

    const handleCreateQuestion = async () => {
        if (!testId || !questionTitle) {
            alert('لطفاً شناسه آزمون و متن سوال را وارد کنید');
            return;
        }

        const questionData = {
            title: questionTitle,
            items: options,
            correctIndex: correctIndex
        };

        try {
            await dispatch(createQuestion({ testId, questionData }));
            alert('سوال با موفقیت ایجاد شد!');
            setQuestionTitle('');
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    const handleFetchQuestions = async () => {
        if (!testId) {
            alert('لطفاً شناسه آزمون را وارد کنید');
            return;
        }

        try {
            await dispatch(fetchTestQuestions(testId));
            alert('سوالات با موفقیت دریافت شدند!');
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">تست افزودن سوالات</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">شناسه آزمون:</label>
                    <input
                        type="text"
                        value={testId}
                        onChange={(e) => setTestId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="شناسه آزمون را وارد کنید"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">متن سوال:</label>
                    <textarea
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="متن سوال را وارد کنید"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">گزینه صحیح:</label>
                    <select
                        value={correctIndex}
                        onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={index}>
                                گزینه {index + 1}: {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleCreateQuestion}
                        disabled={createLoading}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {createLoading ? 'در حال ایجاد...' : 'ایجاد سوال'}
                    </button>
                    
                    <button
                        onClick={handleFetchQuestions}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                        دریافت سوالات
                    </button>
                </div>

                {createError && (
                    <div className="text-red-600 text-sm">
                        خطا: {createError}
                    </div>
                )}

                {questions[testId] && (
                    <div className="mt-4">
                        <h3 className="font-medium mb-2">سوالات موجود:</h3>
                        <div className="text-sm text-gray-600">
                            {questions[testId].length} سوال یافت شد
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
