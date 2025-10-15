// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchExamDetails } from "../../features/user/quiz/examDetailsSlice";
// import { submitExam, getExamResult } from "../../features/user/quiz/examResultSlice";
// import { HiHome } from "react-icons/hi";

// import ProgressBar from "../../features/user/quiz/components/ProgressPercent";
// import FinishExam from "../../features/user/quiz/pages/FinishExam";
// import ExamQuestionsList from "../../features/user/quiz/pages/ExamQuestionsList";
// import ExamResult from "../../features/user/quiz/components/ExamResult";
// import TreeProgress from "../../features/user/tests/components/TreeProgress";
// import translate from "../../locale/translate";
// import LoadingState from "../../components/ui/LoadingState";
// import ErrorState from "../../components/ui/ErrorState";
// import ConfirmModal from "../../components/shared/ConfirmModal";

// export default function TestQuestions() {
//     const { testId } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const id = Number(testId);

//     const [showConfirm, setShowConfirm] = useState(false);
//     const handleReturnClick = () => {
//         setShowConfirm(true);
//     };
//     const onConfirm = () => {
//         setShowConfirm(false);
//         navigate("/");
//     };
//     const onCancel = () => {
//         setShowConfirm(false);
//     };

//     const examState = useSelector(
//         (store) =>
//             store.examDetails.byTestId[id] || {
//                 questions: [],
//                 loading: false,
//                 error: null,
//             }
//     );
//     const { questions, loading, error } = examState;

//     const examResultState = useSelector(
//         (store) =>
//             store.examResult.byTestId[id] || {
//                 completed: false,
//                 loading: false,
//                 error: null,
//             }
//     );
//     const { completed: examCompleted, loading: resultLoading, error: resultError } = examResultState;

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);

//     useEffect(() => {
//         dispatch(fetchExamDetails(id));
//         // فقط اگر کاربر قبلاً در آزمون شرکت کرده، نتیجه را بخوان
//         // dispatch(getExamResult(id));
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (questions.length > 0) {
//             setCurrentIndex(0);
//             setAnswers(Array(questions.length).fill(null));
//         }
//     }, [questions.length]);

//     if (loading || resultLoading) return <LoadingState />;
//     if (error) return <ErrorState />;
//     if (!questions.length) return <div>سوالاتی برای این آزمون وجود ندارد.</div>;
    
//     // اگر خطا در دریافت نتیجه آزمون باشد، فقط در کنسول نمایش بده
//     if (resultError) {
//         console.log('خطا در دریافت نتیجه آزمون:', resultError);
//     }
    
//     // اگر آزمون قبلاً تکمیل شده، نتیجه را نمایش بده
//     if (examCompleted && examResultState.result) {
//         return (
//             <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50 flex flex-col justify-center items-center py-4 px-2 overflow-hidden">
//                 <div className="absolute inset-0 z-[100] pointer-events-none opacity-20 px-4 sm:px-6 py-44">
//                     <div style={{ filter: 'brightness(1.2) contrast(1.1)' }} className="w-full h-full">
//                         <TreeProgress progress={1} style={{ width: '100%', height: '100%' }} />
//                     </div>
//                 </div>
//                 <div className="w-full md:max-w-[50rem] mx-auto z-10">
//                     <ExamResult 
//                         result={examResultState} 
//                         onRestart={() => {
//                             // Clear exam result and restart
//                             dispatch({ type: 'examResult/clearExamResult', payload: id });
//                             restart();
//                         }} 
//                     />
//                 </div>
//             </div>
//         );
//     }

//     const answeredCount = answers.filter((a) => a !== null).length;
//     const isFinished = answeredCount === questions.length;

//     const progress = questions.length === 0 ? 0 : answeredCount / questions.length;
//     const progressPercent = Math.round(progress * 100);

//     const restart = () => {
//         setAnswers(Array(questions.length).fill(null));
//         setCurrentIndex(0);
//     };

//     const handleSubmitExam = async () => {
//         try {
//             // محاسبه زمان صرف شده (می‌توانید از زمان شروع آزمون محاسبه کنید)
//             const timeSpent = 0; // TODO: محاسبه زمان واقعی
            
//             // تبدیل answers از آرایه به object با question ID ها
//             const answersObject = {};
//             questions.forEach((question, index) => {
//                 if (answers[index] !== null && answers[index] !== undefined) {
//                     // تبدیل question.id به number
//                     answersObject[parseInt(question.id)] = answers[index];
//                 }
//             });
            
//             console.log('Submitting exam with answers:', answersObject);
            
//             await dispatch(submitExam({
//                 testId: id,
//                 examData: { 
//                     answers: answersObject,
//                     timeSpent 
//                 }
//             })).unwrap();
//         } catch (error) {
//             console.error('Error submitting exam:', error);
//         }
//     };

//     return (
//         <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50 flex flex-col justify-between items-center py-4 px-2 overflow-hidden">
//             {/* بک‌گراند درخت تمام صفحه */}
//             <div className="absolute inset-0 z-[100] pointer-events-none opacity-20 px-4 sm:px-6 py-44">
//                 <div style={{ filter: 'brightness(1.2) contrast(1.1)' }} className="w-full h-full">
//                     <TreeProgress progress={progress} style={{ width: '100%', height: '100%' }} />
//                 </div>
//             </div>

//             <div className="w-full md:max-w-[50rem] mx-auto my-auto rounded-none md:rounded-lg flex flex-col md:flex-row gap-4 md:gap-6 px-2 md:p-6 min-h-[570px] md:min-h-[500px] bg-transparent"
//                 style={{
//                     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
//                 }}>

//                 {/* کارت سوالات شیشه‌ای */}
//                 <div className="flex-grow min-h-full z-10 bg-white/20 backdrop-blur-lg rounded-lg p-6">
//                     {isFinished ? (
//                         <FinishExam 
//                             totalQuestions={questions.length} 
//                             onRestart={restart}
//                             onSubmit={handleSubmitExam}
//                         />
//                     ) : (
//                         <ExamQuestionsList
//                             questions={questions}
//                             currentIndex={currentIndex}
//                             setCurrentIndex={setCurrentIndex}
//                             answers={answers}
//                             setAnswers={setAnswers}
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* ProgressBar */}
//             <div className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 px-4 md:px-6 py-2 md:py-3 shadow-xl flex flex-col items-end space-y-1 z-[110]">
//                 <button
//                     onClick={handleReturnClick}
//                     className="mt-2 flex items-center px-4 py-1 rounded text-lightBlue text-sm hover:bg-darkBlue hover:text-white transition"
//                     style={{ zIndex: 111 }}
//                 >
//                     <HiHome className="text-[18px]" />  {translate.returnhome}
//                 </button>
//                 <span className="text-[10px] md:text-xs text-white/80 font-light">{translate.progress}: {progressPercent}٪</span>
//                 <ProgressBar progressPercent={progressPercent} />
//             </div>
//             {showConfirm && (
//                 <ConfirmModal
//                     message="آیا مطمئن هستید که می‌خواهید آزمون را ترک کنید؟"
//                     onConfirm={onConfirm}
//                     onCancel={onCancel}
//                 />
//             )}
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExamDetails } from "../../features/user/quiz/examDetailsSlice";
import { submitExam, getExamResult } from "../../features/user/quiz/examResultSlice";
import { HiHome } from "react-icons/hi";

import ProgressBar from "../../features/user/quiz/components/ProgressPercent";
import FinishExam from "../../features/user/quiz/pages/FinishExam";
import ExamQuestionsList from "../../features/user/quiz/pages/ExamQuestionsList";
import ExamResult from "../../features/user/quiz/components/ExamResult";
import TreeProgress from "../../features/user/tests/components/TreeProgress";
import translate from "../../locale/translate";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TestQuestions() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = Number(testId);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleReturnClick = () => setShowConfirm(true);
  const onConfirm = () => {
    setShowConfirm(false);
    navigate("/");
  };
  const onCancel = () => setShowConfirm(false);

  // بررسی وضعیت authentication
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const examState = useSelector(
    (store) =>
      store.examDetails.byTestId[id] || {
        questions: [],
        loading: false,
        error: null,
      }
  );
  const { questions, loading, error } = examState;

  const examResultState = useSelector(
    (store) =>
      store.examResult.byTestId[id] || {
        completed: false,
        loading: false,
        error: null,
      }
  );
  const { completed: examCompleted, loading: resultLoading, error: resultError } = examResultState;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // به جای آرایه، از object استفاده می‌کنیم

  useEffect(() => {
    // اگر کاربر لاگین نکرده، به صفحه لاگین هدایت کن
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchExamDetails(id));
    // اگر کاربر قبلاً در آزمون شرکت کرده، نتیجه را بخوان
    // dispatch(getExamResult(id));
  }, [dispatch, id, isAuthenticated, token, navigate]);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentIndex(0);
      // ایجاد object خالی با کلید question.id
      const initialAnswers = {};
      questions.forEach(q => {
        initialAnswers[q.id] = null;
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  // اگر کاربر لاگین نکرده، loading نمایش بده تا هدایت شود
  if (!isAuthenticated || !token) {
    return <LoadingState />;
  }

  if (loading || resultLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!questions.length) return <div>سوالاتی برای این آزمون وجود ندارد.</div>;
  if (resultError) console.log("خطا در دریافت نتیجه آزمون:", resultError);

  if (examCompleted && examResultState.result) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50 flex flex-col justify-center items-center py-4 px-2 overflow-hidden">
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-20 px-4 sm:px-6 py-44">
          <div style={{ filter: "brightness(1.2) contrast(1.1)" }} className="w-full h-full">
            <TreeProgress progress={1} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <div className="w-full md:max-w-[50rem] mx-auto z-10">
          <ExamResult
            result={examResultState}
            onRestart={() => {
              dispatch({ type: "examResult/clearExamResult", payload: id });
              restart();
            }}
          />
        </div>
      </div>
    );
  }

  // شمردن تعداد سوالات پاسخ داده شده
  const answeredCount = Object.values(answers).filter(a => a !== null && a !== undefined).length;
  const isFinished = answeredCount === questions.length;

  const progress = questions.length === 0 ? 0 : answeredCount / questions.length;
  const progressPercent = Math.round(progress * 100);

  const restart = () => {
    const resetAnswers = {};
    questions.forEach(q => {
      resetAnswers[q.id] = null;
    });
    setAnswers(resetAnswers);
    setCurrentIndex(0);
  };

//   const handleSubmitExam = async () => {
//     try {
//         const timeSpent = 0; // TODO: زمان واقعی
//         const answersObject = {};
//         // فقط کلیدهایی که پاسخ داده شده اند
//         Object.keys(answers).forEach(qId => {
//             if (answers[qId] !== null) answersObject[qId] = answers[qId];
//         });

//         console.log("Submitting exam with answers:", answersObject);

//         await dispatch(submitExam({
//             testId: id,
//             examData: { answers: answersObject, timeSpent }
//         })).unwrap();
//     } catch (error) {
//         // console.error("Error submitting exam:", error);
//         console.error("Error submitting exam:", error.response?.data || error.message);
//     }
// };

const handleSubmitExam = async () => {
    try {
        const timeSpent = 0; // TODO: زمان واقعی محاسبه شود
        const answersObject = {};

        // فقط کلیدهایی که پاسخ داده شده‌اند را اضافه کن و کلیدها را string کن
        Object.keys(answers).forEach(qId => {
            const answer = answers[qId];
            if (answer !== null && answer !== undefined) {
                answersObject[String(qId)] = answer;
            }
        });

        console.log("Submitting exam with answers:", answersObject);

        const payload = {
            answers: answersObject,
            timeSpent
        };

        // Dispatch با asyncThunk
        await dispatch(submitExam({
            testId: id,
            examData: payload
        })).unwrap();

        console.log("Exam submitted successfully");
        
        // نمایش پیام موفقیت
        setShowSuccessMessage(true);
        
        // بعد از 2 ثانیه به صفحه آزمون‌ها هدایت کن
        setTimeout(() => {
            navigate("/tests");
        }, 2000);

    } catch (error) {
        // نمایش خطای واقعی از سرور (اگر وجود داشته باشد)
        console.error("Error submitting exam:", error.response?.data || error.message);
    }
};

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50 flex flex-col justify-between items-center py-4 px-2 overflow-hidden">
      <div className="absolute inset-0 z-[100] pointer-events-none opacity-20 px-4 sm:px-6 py-44">
        <div style={{ filter: "brightness(1.2) contrast(1.1)" }} className="w-full h-full">
          <TreeProgress progress={progress} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="w-full md:max-w-[50rem] mx-auto my-auto rounded-none md:rounded-lg flex flex-col md:flex-row gap-4 md:gap-6 px-2 md:p-6 min-h-[570px] md:min-h-[500px] bg-transparent"
        style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}>
        <div className="flex-grow min-h-full z-10 bg-white/20 backdrop-blur-lg rounded-lg p-6">
          {isFinished ? (
            <FinishExam totalQuestions={questions.length} onRestart={restart} onSubmit={handleSubmitExam} />
          ) : (
            <ExamQuestionsList
              questions={questions}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 px-4 md:px-6 py-2 md:py-3 shadow-xl flex flex-col items-end space-y-1 z-[110]">
        <button
          onClick={handleReturnClick}
          className="mt-2 flex items-center px-4 py-1 rounded text-lightBlue text-sm hover:bg-darkBlue hover:text-white transition"
          style={{ zIndex: 111 }}
        >
          <HiHome className="text-[18px]" /> {translate.returnhome}
        </button>
        <span className="text-[10px] md:text-xs text-white/80 font-light">{translate.progress}: {progressPercent}٪</span>
        <ProgressBar progressPercent={progressPercent} />
      </div>

      {showConfirm && <ConfirmModal message="آیا مطمئن هستید که می‌خواهید آزمون را ترک کنید؟" onConfirm={onConfirm} onCancel={onCancel} />}
      
      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-xl">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تبریک!</h3>
            <p className="text-gray-600 mb-4">آزمون با موفقیت انجام شد</p>
            <p className="text-sm text-gray-500">در حال انتقال به صفحه آزمون‌ها...</p>
          </div>
        </div>
      )}
    </div>
  );
}
