// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import translate from "../../../../locale/translate";
import Button from "../../../../components/shared/Button";

export default function ExamQuestionsList(props) {
    const { questions, currentIndex, setCurrentIndex, answers, setAnswers } = props;

    const currentQuestion = questions[currentIndex];
    const selectedAnswer = answers[currentIndex];

    const handleAnswerSelect = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = answer;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

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
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onSelectAnswer={handleAnswerSelect}
                />

                <div className="flex justify-between mt-4">
                    <Button
                        size="medium" color="blue"
                        onClick={prevQuestion}
                        disabled={currentIndex === 0}
                    >
                        {translate.previousQuestion}
                    </Button>

                    <Button
                        size="medium" color="blue"
                        onClick={nextQuestion}
                        disabled={currentIndex === questions.length - 1 || !selectedAnswer}
                    >
                        {translate.nextQuestion}
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}