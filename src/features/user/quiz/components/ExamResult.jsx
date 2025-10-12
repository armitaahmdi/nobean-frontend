import { motion } from "framer-motion";
import { FaTrophy, FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";
import Button from "../../../../components/shared/Button";

export default function ExamResult({ result, onRestart }) {
    const { score, correctAnswers, totalQuestions, completedAt } = result || {};
    
    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };
    
    const getScoreMessage = (score) => {
        if (score >= 90) return "عالی! عملکرد فوق‌العاده‌ای داشتید!";
        if (score >= 80) return "خوب! عملکرد خوبی داشتید!";
        if (score >= 60) return "قابل قبول! نیاز به تلاش بیشتر دارید.";
        return "نیاز به مطالعه بیشتر دارید.";
    };
    
    const getScoreIcon = (score) => {
        if (score >= 80) return <FaTrophy className="text-yellow-500" />;
        if (score >= 60) return <FaCheckCircle className="text-green-500" />;
        return <FaTimesCircle className="text-red-500" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center"
        >
            {/* Header */}
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                    {getScoreIcon(score)}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    آزمون تکمیل شد!
                </h2>
                <p className="text-gray-600">
                    {new Date(completedAt).toLocaleDateString('fa-IR')}
                </p>
            </div>

            {/* Score Display */}
            <div className="mb-8">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
                    {score}%
                </div>
                <p className="text-lg text-gray-600 mb-4">
                    {getScoreMessage(score)}
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                        {correctAnswers}
                    </div>
                    <div className="text-sm text-green-700">
                        پاسخ صحیح
                    </div>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                        {totalQuestions - correctAnswers}
                    </div>
                    <div className="text-sm text-red-700">
                        پاسخ نادرست
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>پیشرفت</span>
                    <span>{correctAnswers} از {totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-3 rounded-full ${
                            score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                            'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    size="large"
                    color="blue"
                    onClick={onRestart}
                    className="flex items-center gap-2"
                >
                    <FaRedo />
                    آزمون مجدد
                </Button>
                <Button
                    size="large"
                    color="gray"
                    onClick={() => window.location.href = '/tests'}
                >
                    بازگشت به آزمون‌ها
                </Button>
            </div>
        </motion.div>
    );
}
