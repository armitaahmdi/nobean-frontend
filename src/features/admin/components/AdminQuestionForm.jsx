import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createQuestion, fetchTestQuestions, updateQuestion, deleteQuestion, clearError as clearQuestionsError } from '../slices/adminQuestionsSlice';
import { 
    FaTimes, 
    FaSave, 
    FaPlus, 
    FaTrash, 
    FaQuestionCircle,
    FaCheckCircle,
    FaExclamationCircle,
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';

export default function AdminQuestionForm({ test, onClose, onSave }) {
    const dispatch = useDispatch();
    const { 
        createLoading, 
        createError, 
        questions: existingQuestions, 
        loading: questionsLoading,
        updateLoading,
        updateError,
        deleteLoading,
        deleteError
    } = useSelector((state) => state.adminQuestions);
    
    const [questions, setQuestions] = useState([]);
    const [domains, setDomains] = useState([]);
    const [componentsByDomain, setComponentsByDomain] = useState({});
    const [metaLoading, setMetaLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [errors, setErrors] = useState({});
    const [resolvedOnce, setResolvedOnce] = useState(false);

    useEffect(() => {
        // Load existing questions when component mounts
        if (test?.id) {
            dispatch(fetchTestQuestions(test.id));
        }
    }, [test?.id, dispatch]);

    useEffect(() => {
        // Initialize questions with existing ones or add one empty question
        if (existingQuestions[test?.id] && existingQuestions[test.id].length > 0) {
            // Ensure weights exist for each question based on items length
            const prepared = existingQuestions[test.id].map(q => {
                const items = q.items || [];
                const weights = Array.isArray(q.weights) && q.weights.length === items.length
                    ? q.weights
                    : items.map(() => 1);
                return { ...q, weights };
            });
            setQuestions(prepared);
            setCurrentQuestionIndex(0);
            // Prefetch components for any domain already set on existing questions
            const domainIds = Array.from(new Set(prepared.map(q => q.domainId).filter(Boolean)));
            (async () => {
                for (const dId of domainIds) {
                    if (dId) await loadComponentsForDomain(dId);
                }
            })();
        } else if (questions.length === 0) {
            // Add one empty question if no existing questions
            addNewQuestion();
        }
    }, [existingQuestions, test?.id]);

    // Ensure components are loaded when switching between questions with a domainId
    useEffect(() => {
        const q = questions[currentQuestionIndex];
        const dId = q?.domainId;
        if (dId && !componentsByDomain[dId]) {
            loadComponentsForDomain(dId);
        }
    }, [currentQuestionIndex, questions, componentsByDomain]);

    // Load domains list
    useEffect(() => {
        const load = async () => {
            if (!test?.id) return;
            setMetaLoading(true);
            try {
                const { testsApi } = await import('../../../services/testsApi');
                const token = (await import('../../../app/store')).default.getState().auth?.token;
                const res = await testsApi.getDomains(test.id, token);
                const list = (res?.data || res) || [];
                setDomains(list);
            } catch (e) {
                console.error('Error loading domains:', e);
            } finally {
                setMetaLoading(false);
            }
        };
        load();
    }, [test?.id]);

    const loadComponentsForDomain = async (domainId) => {
        if (!domainId) return;
        try {
            const { testsApi } = await import('../../../services/testsApi');
            const token = (await import('../../../app/store')).default.getState().auth?.token;
            const res = await testsApi.getComponents(domainId, token);
            const list = (res?.data || res) || [];
            setComponentsByDomain(prev => ({ ...prev, [domainId]: list }));
        } catch (e) {
            console.error('Error loading components:', e);
        }
    };

    // Resolve missing domainId for questions that only have componentId
    useEffect(() => {
        const needsResolve = (questions || []).some(q => q.componentId && !q.domainId);
        if (!needsResolve || resolvedOnce || domains.length === 0) return;

        (async () => {
            try {
                // Ensure all domains' components are loaded once
                await Promise.all(domains.map(d => {
                    if (!componentsByDomain[d.id]) {
                        return loadComponentsForDomain(d.id);
                    }
                    return Promise.resolve();
                }));

                // After loading, map componentId -> domainId
                setQuestions(prev => prev.map(q => {
                    if (q.domainId || !q.componentId) return q;
                    for (const d of domains) {
                        const comps = componentsByDomain[d.id] || [];
                        if (comps.some(c => c.id === q.componentId)) {
                            return { ...q, domainId: d.id };
                        }
                    }
                    return q;
                }));
            } finally {
                setResolvedOnce(true);
            }
        })();
    }, [questions, domains, componentsByDomain, resolvedOnce]);

    // Prefetch components when current question has a domainId
    useEffect(() => {
        const q = questions[currentQuestionIndex];
        const domainId = q?.domainId;
        if (domainId && !componentsByDomain[domainId]) {
            loadComponentsForDomain(domainId);
        }
    }, [currentQuestionIndex, questions, componentsByDomain]);

    useEffect(() => {
        if (createError) {
            const timer = setTimeout(() => {
                dispatch(clearQuestionsError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [createError, dispatch]);

    const addNewQuestion = () => {
        const newQuestion = {
            id: Date.now() + Math.random(), // Temporary ID (large number to distinguish from real IDs)
            title: '',
            items: ['', '', '', ''], // Default 4 options
            weights: [1, 1, 1, 1]
        };
        setQuestions(prev => [...prev, newQuestion]);
        setCurrentQuestionIndex(questions.length);
    };

    const isNewQuestion = (questionId) => {
        return questionId > 1000000; // Temporary IDs are large numbers
    };

    const removeQuestion = (questionId) => {
        if (questions.length <= 1) {
            toast.warning('حداقل یک سوال باید وجود داشته باشد');
            return;
        }
        
        setQuestions(prev => prev.filter(q => q.id !== questionId));
        
        // Adjust current index if needed
        if (currentQuestionIndex >= questions.length - 1) {
            setCurrentQuestionIndex(Math.max(0, questions.length - 2));
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        if (isNewQuestion(questionId)) {
            // Just remove from local state
            removeQuestion(questionId);
        } else {
            // Delete from backend
            try {
                await dispatch(deleteQuestion({
                    testId: test.id,
                    questionId: questionId
                })).unwrap();
                
                // Remove from local state
                removeQuestion(questionId);
                toast.success('سوال با موفقیت حذف شد!');
            } catch (error) {
                console.error('Error deleting question:', error);
                toast.error('خطا در حذف سوال!');
            }
        }
    };

    const handleUpdateQuestion = async (questionId) => {
        if (isNewQuestion(questionId)) {
            return; // Don't update new questions
        }

        const question = questions.find(q => q.id === questionId);
        if (!question) return;

        const validItems = question.items.filter(item => item.trim().length > 0);
                const questionData = {
                    title: question.title.trim(),
                    description: (question.description || '').trim() || null,
                    componentId: question.componentId || null,
                    questionNumber: question.questionNumber || null,
                    items: validItems,
                    weights: (question.weights || []).slice(0, validItems.length).map(w => {
                        const v = parseInt(w, 10);
                        return isNaN(v) ? 1 : Math.max(-1, Math.min(10, v));
                    })
                };

        try {
            console.log('Updating existing question:', questionData);
            const result = await dispatch(updateQuestion({
                testId: test.id,
                questionId: questionId,
                questionData
            })).unwrap();
            console.log('Update result:', result);
            toast.success('سوال با موفقیت ویرایش شد!');
        } catch (error) {
            console.error('Error updating question:', error);
            toast.error('خطا در ویرایش سوال!');
        }
    };

    const updateQuestionLocal = (questionId, field, value) => {
        setQuestions(prev => prev.map(q => 
            q.id === questionId ? { ...q, [field]: value } : q
        ));
        
        // Clear error when user starts typing
        if (errors[questionId]) {
            setErrors(prev => ({
                ...prev,
                [questionId]: ''
            }));
        }
    };

    const updateQuestionItem = (questionId, itemIndex, value) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                const newItems = [...q.items];
                newItems[itemIndex] = value;
                return { ...q, items: newItems };
            }
            return q;
        }));
    };

    const addQuestionItem = (questionId) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                const nextWeights = Array.isArray(q.weights) ? [...q.weights, 1] : [...q.items.map(() => 1), 1];
                return { ...q, items: [...q.items, ''], weights: nextWeights };
            }
            return q;
        }));
    };

    const removeQuestionItem = (questionId, itemIndex) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                if (q.items.length <= 2) {
                    toast.warning('حداقل دو گزینه باید وجود داشته باشد');
                    return q;
                }
                
                const newItems = q.items.filter((_, index) => index !== itemIndex);
                const newWeights = (q.weights || []).filter((_, index) => index !== itemIndex);
                
                return { ...q, items: newItems, weights: newWeights };
            }
            return q;
        }));
    };

    const updateQuestionWeight = (questionId, itemIndex, weight) => {
        const clamped = Math.max(-1, Math.min(10, parseInt(weight || 1, 10)));
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                const currentWeights = Array.isArray(q.weights) && q.weights.length === q.items.length
                    ? [...q.weights]
                    : q.items.map(() => 1);
                currentWeights[itemIndex] = clamped;
                return { ...q, weights: currentWeights };
            }
            return q;
        }));
    };

    const validateQuestions = () => {
        const newErrors = {};
        let isValid = true;

        questions.forEach((question, index) => {
            if (!question.title || question.title.trim().length < 5) {
                newErrors[question.id] = `سوال ${index + 1}: متن سوال باید حداقل 5 کاراکتر باشد`;
                isValid = false;
            }

            const validItems = question.items.filter(item => item.trim().length > 0);
            
            if (validItems.length < 2) {
                newErrors[question.id] = `سوال ${index + 1}: حداقل دو گزینه معتبر باید وجود داشته باشد`;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateQuestions()) {
            return;
        }

        try {
            // Only process new questions (create them)
            const newQuestions = questions.filter(q => isNewQuestion(q.id));
            
            for (const question of newQuestions) {
                const validItems = question.items.filter(item => item.trim().length > 0);
                
                const questionData = {
                    title: question.title.trim(),
                    description: (question.description || '').trim() || null,
                    componentId: question.componentId || null,
                    questionNumber: question.questionNumber || null,
                    items: validItems,
                    weights: (question.weights || []).slice(0, validItems.length).map(w => {
                        const v = parseInt(w, 10);
                        return isNaN(v) ? 1 : Math.max(-1, Math.min(10, v));
                    })
                };

                console.log('Creating new question:', questionData);
                const result = await dispatch(createQuestion({
                    testId: test.id,
                    questionData
                })).unwrap();
                console.log('Create result:', result);
                toast.success('سوال با موفقیت ایجاد شد!');
            }
            
            onSave();
        } catch (error) {
            console.error('Error saving questions:', error);
            toast.error('خطا در ایجاد سوالات!');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {questions.length > 0 && !isNewQuestion(questions[0].id) ? 'ویرایش سوالات آزمون' : 'افزودن سوالات به آزمون'}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                {test?.title || 'آزمون بدون عنوان'}
                            </p>
                            {questions.length > 0 && (
                                <p className="text-sm text-blue-600 mt-1">
                                    {questions.length} سوال موجود است
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Error Messages */}
                {(createError || updateError || deleteError) && (
                    <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <FaExclamationCircle className="text-red-500 ml-2" />
                            <p className="text-red-700">
                                {createError || updateError || deleteError}
                            </p>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {questionsLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="mr-3 text-gray-600">در حال بارگذاری سوالات...</span>
                        </div>
                    ) : (
                        <div>
                            {/* Question Navigation */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        سوال {currentQuestionIndex + 1} از {questions.length}
                                    </h3>
                                    <button
                                        onClick={addNewQuestion}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <FaPlus />
                                        افزودن سوال جدید
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                        disabled={currentQuestionIndex === 0}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaArrowRight />
                                    </button>
                                    <button
                                        onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                                        disabled={currentQuestionIndex === questions.length - 1}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaArrowLeft />
                                    </button>
                                </div>
                            </div>

                            {/* Question List */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {questions.map((question, index) => (
                                        <button
                                            key={question.id}
                                            onClick={() => setCurrentQuestionIndex(index)}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                index === currentQuestionIndex
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                            }`}
                                        >
                                            سوال {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {currentQuestion && (
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {/* Question Title */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <FaQuestionCircle className="inline ml-2" />
                                                متن سوال *
                                            </label>
                                            <textarea
                                                value={currentQuestion.title}
                                                onChange={(e) => updateQuestionLocal(currentQuestion.id, 'title', e.target.value)}
                                                rows={4}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors[currentQuestion.id] ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="متن سوال را وارد کنید..."
                                            />
                                            {errors[currentQuestion.id] && (
                                                <p className="text-red-500 text-sm mt-1">{errors[currentQuestion.id]}</p>
                                            )}
                                        </div>

                                        {/* Optional Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                توضیحات (اختیاری)
                                            </label>
                                            <textarea
                                                value={currentQuestion.description || ''}
                                                onChange={(e) => updateQuestionLocal(currentQuestion.id, 'description', e.target.value)}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="در صورت نیاز، توضیحی برای سوال بنویسید..."
                                            />
                                        </div>

                                        {/* Question Options */}
                                        <div>
                                            {/* Domain and Component selectors */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">حیطه</label>
                                                    <select
                                                        value={currentQuestion.domainId || ''}
                                                        onChange={async (e) => {
                                                            const val = e.target.value ? parseInt(e.target.value, 10) : '';
                                                            updateQuestionLocal(currentQuestion.id, 'domainId', val);
                                                            if (val) await loadComponentsForDomain(val);
                                                            // Reset componentId if domain changes
                                                            updateQuestionLocal(currentQuestion.id, 'componentId', null);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        title="انتخاب حیطه سوال"
                                                    >
                                                        <option value="">— انتخاب حیطه —</option>
                                                        {domains.map(d => (
                                                            <option key={d.id} value={d.id}>{d.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">مولفه</label>
                                                    <select
                                                        value={currentQuestion.componentId || ''}
                                                        onChange={(e) => updateQuestionLocal(currentQuestion.id, 'componentId', e.target.value ? parseInt(e.target.value, 10) : null)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        title="انتخاب مولفه سوال"
                                                        disabled={!currentQuestion.domainId}
                                                    >
                                                        <option value="">— انتخاب مولفه —</option>
                                                        {/* Ensure current selection is visible even before options load */}
                                                        {currentQuestion.componentId && !(componentsByDomain[currentQuestion.domainId] || []).some(c => c.id === currentQuestion.componentId) && (
                                                            <option value={currentQuestion.componentId}>مولفه انتخاب‌شده</option>
                                                        )}
                                                        {(componentsByDomain[currentQuestion.domainId] || []).map(c => (
                                                            <option key={c.id} value={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {/* Show current selection names */}
                                            {(() => {
                                                let domainName = '';
                                                let componentName = '';
                                                const selectedDomain = currentQuestion.domainId ? domains.find(d => d.id === currentQuestion.domainId) : null;
                                                if (selectedDomain) domainName = selectedDomain.name;
                                                if (currentQuestion.componentId) {
                                                    // Try current domain first
                                                    const comps = currentQuestion.domainId ? (componentsByDomain[currentQuestion.domainId] || []) : [];
                                                    let comp = comps.find(c => c.id === currentQuestion.componentId);
                                                    if (!comp) {
                                                        // Fallback: search all loaded domains
                                                        for (const [dId, list] of Object.entries(componentsByDomain)) {
                                                            const found = list.find(c => c.id === currentQuestion.componentId);
                                                            if (found) {
                                                                comp = found;
                                                                const d = domains.find(x => x.id === Number(dId));
                                                                if (d && !domainName) domainName = d.name;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    componentName = comp?.name || '';
                                                }
                                                if (domainName || componentName) {
                                                    return (
                                                        <div className="text-xs text-gray-600 mb-2">
                                                            {domainName && (
                                                                <span>حیطه فعلی: <span className="font-medium">{domainName}</span></span>
                                                            )}
                                                            {componentName && (
                                                                <span className="mr-4">مولفه فعلی: <span className="font-medium">{componentName}</span></span>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })()}
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    گزینه‌ها *
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => addQuestionItem(currentQuestion.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                >
                                                    <FaPlus />
                                                    افزودن گزینه
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                {currentQuestion.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-sm text-gray-600 font-medium">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                        
                                                        <input
                                                            type="text"
                                                            value={item}
                                                            onChange={(e) => updateQuestionItem(currentQuestion.id, index, e.target.value)}
                                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder={`گزینه ${index + 1}`}
                                                        />

                                                        <select
                                                            value={(currentQuestion.weights || [])[index] ?? 1}
                                                            onChange={(e) => updateQuestionWeight(currentQuestion.id, index, e.target.value)}
                                                            className="w-28 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            title="ضریب گزینه (1- تا 10)"
                                                        >
                                                            {Array.from({ length: 12 }, (_, i) => i - 1).map(v => (
                                                                <option key={v} value={v}>{`ضریب ${v}`}</option>
                                                            ))}
                                                        </select>
                                                        
                                                        <button
                                                            type="button"
                                                            onClick={() => removeQuestionItem(currentQuestion.id, index)}
                                                            disabled={currentQuestion.items.length <= 2}
                                                            className="text-red-600 hover:text-red-800 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <p className="text-xs text-gray-500 mt-2">
                                                ضریب هر گزینه را انتخاب کنید (مقدار بالاتر = امتیاز بیشتر)
                                            </p>
                                        </div>

                                        {/* Question Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteQuestion(currentQuestion.id)}
                                            disabled={deleteLoading}
                                            className="text-red-600 hover:text-red-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deleteLoading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                            ) : (
                                                <FaTrash />
                                            )}
                                            {isNewQuestion(currentQuestion.id) ? 'حذف این سوال' : 'حذف سوال از سرور'}
                                        </button>
                                            
                                            <div className="text-sm text-gray-600">
                                                {currentQuestion.items.filter(item => item.trim().length > 0).length} گزینه معتبر
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            انصراف
                                        </button>
                                        
                                        <div className="flex gap-3">
                                            {!isNewQuestion(currentQuestion.id) && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateQuestion(currentQuestion.id)}
                                                    disabled={updateLoading}
                                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {updateLoading ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                            در حال ویرایش...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaSave />
                                                            ذخیره تغییرات این سوال
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                            
                                            <button
                                                type="submit"
                                                disabled={createLoading}
                                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {createLoading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        در حال ذخیره...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaSave />
                                                        ذخیره سوالات جدید ({questions.filter(q => isNewQuestion(q.id)).length})
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
