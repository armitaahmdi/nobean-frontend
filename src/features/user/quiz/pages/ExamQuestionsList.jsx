import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import translate from "../../../../locale/translate";
import Button from "../../../../components/shared/Button";

export default function ExamQuestionsList({ questions, currentIndex, setCurrentIndex, answers, setAnswers }) {
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = answers[currentQuestion.id];

    const handleAnswerSelect = (optionIndex) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
    };

    const nextQuestion = () => { if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1); };
    const prevQuestion = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
            >
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        سوال {currentIndex + 1} از {questions.length}
                    </div>
                </div>


                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onSelectAnswer={handleAnswerSelect}
                />

                {currentQuestion.description && (
                    <div className="mt-4 mb-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-900 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold">توضیحات سوال</span>
                            <span className="text-[11px] text-amber-700/80">راهنما</span>
                        </div>
                        <p className="text-[13px] leading-7 whitespace-pre-line">{currentQuestion.description}</p>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <Button size="medium" color="blue" onClick={prevQuestion} disabled={currentIndex === 0}>
                        {translate.previousQuestion}
                    </Button>

                    <Button size="medium" color="blue" onClick={nextQuestion} disabled={currentIndex === questions.length - 1 || selectedAnswer === undefined || selectedAnswer === null}>
                        {translate.nextQuestion}
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}



// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import QuestionCard from "../components/QuestionCard";
// import translate from "../../../../locale/translate";
// import Button from "../../../../components/shared/Button";

// export default function ExamQuestionsList(props) {
//     const { questions, currentIndex, setCurrentIndex, answers, setAnswers } = props;

//     const currentQuestion = questions[currentIndex];
//     // const selectedAnswer = answers[currentIndex];
//     const selectedAnswer = answers[currentQuestion.id]; 

//     const handleAnswerSelect = (optionIndex) => {
//         setAnswers(prev => ({
//             ...prev,
//             [currentQuestion.id]: optionIndex
//         }));
//     };

//     const nextQuestion = () => {
//         if (currentIndex + 1 < questions.length) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     const prevQuestion = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };


//     return (
//         <AnimatePresence mode="wait">
//             <motion.div
//                 key={currentQuestion.id}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full"
//             >
//                 {/* Question Header */}
//                 <div className="mb-6 text-center">
//                     <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                         سوال {currentIndex + 1} از {questions.length}
//                     </div>
//                 </div>

//                 <QuestionCard
//                     question={currentQuestion}
//                     selectedAnswer={selectedAnswer}
//                     onSelectAnswer={handleAnswerSelect}
//                 />

//                 <div className="flex justify-between mt-6">
//                     <Button
//                         size="medium" color="blue"
//                         onClick={prevQuestion}
//                         disabled={currentIndex === 0}
//                     >
//                         {translate.previousQuestion}
//                     </Button>

//                     <Button
//                         size="medium" color="blue"
//                         onClick={nextQuestion}
//                         disabled={currentIndex === questions.length - 1 || !selectedAnswer}
//                     >
//                         {translate.nextQuestion}
//                     </Button>
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// }