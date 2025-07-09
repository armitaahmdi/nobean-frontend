import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExamDetails } from "../features/quiz/examDetailsSlice";
import { HiHome } from "react-icons/hi";

import ProgressBar from "../features/quiz/components/ProgressPercent";
import FinishExam from "../features/quiz/pages/FinishExam";
import ExamQuestionsList from "../features/quiz/pages/ExamQuestionsList";
import TreeProgress from "../components/test/TreeProgress";
import translate from "../locale/translate";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import ConfirmModal from "../components/shared/ConfirmModal";

export default function TestQuestions() {
    const { testId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = Number(testId);

    const [showConfirm, setShowConfirm] = useState(false);
    const handleReturnClick = () => {
        setShowConfirm(true);
    };
    const onConfirm = () => {
        setShowConfirm(false);
        navigate("/");
    };
    const onCancel = () => {
        setShowConfirm(false);
    };

    const examState = useSelector(
        (store) =>
            store.examDetails.byTestId[id] || {
                questions: [],
                loading: false,
                error: null,
            }
    );
    const { questions, loading, error } = examState;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        dispatch(fetchExamDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentIndex(0);
            setAnswers(Array(questions.length).fill(null));
        }
    }, [questions.length]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;
    if (!questions.length) return <div>سوالاتی برای این آزمون وجود ندارد.</div>;

    const answeredCount = answers.filter((a) => a !== null).length;
    const isFinished = answeredCount === questions.length;

    const progress = questions.length === 0 ? 0 : answeredCount / questions.length;
    const progressPercent = Math.round(progress * 100);

    const restart = () => {
        setAnswers(Array(questions.length).fill(null));
        setCurrentIndex(0);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50 flex flex-col justify-between items-center py-4 px-2 overflow-hidden">
            {/* بک‌گراند درخت تمام صفحه */}
            <div className="absolute inset-0 z-[100] pointer-events-none opacity-20 px-4 sm:px-6 py-44">
                <div style={{ filter: 'brightness(1.2) contrast(1.1)' }} className="w-full h-full">
                    <TreeProgress progress={progress} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <div className="w-full md:max-w-[50rem] mx-auto my-auto rounded-none md:rounded-lg flex flex-col md:flex-row gap-4 md:gap-6 px-2 md:p-6 min-h-[570px] md:min-h-[500px] bg-transparent"
                style={{
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                }}>

                {/* کارت سوالات شیشه‌ای */}
                <div className="flex-grow min-h-full z-10 bg-white/20 backdrop-blur-lg rounded-lg p-6">
                    {isFinished ? (
                        <FinishExam totalQuestions={questions.length} onRestart={restart} />
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

            {/* ProgressBar */}
            <div className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 px-4 md:px-6 py-2 md:py-3 shadow-xl flex flex-col items-end space-y-1 z-[110]">
                <button
                    onClick={handleReturnClick}
                    className="mt-2 flex items-center px-4 py-1 rounded text-lightBlue text-sm hover:bg-darkBlue hover:text-white transition"
                    style={{ zIndex: 111 }}
                >
                    <HiHome className="text-[18px]" />  {translate.returnhome}
                </button>
                <span className="text-[10px] md:text-xs text-white/80 font-light">{translate.progress}: {progressPercent}٪</span>
                <ProgressBar progressPercent={progressPercent} />
            </div>
            {showConfirm && (
                <ConfirmModal
                    message="آیا مطمئن هستید که می‌خواهید آزمون را ترک کنید؟"
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            )}
        </div>
    )
}