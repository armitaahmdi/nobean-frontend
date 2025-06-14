export default function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
    return (
        <div className="w-full max-w-xl mx-auto p-4 rounded-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold">{question.question}</h2>
            <div className="flex flex-col gap-3">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectAnswer(option)}
                        className={`p-3 rounded-md border transition-colors duration-200 ${selectedAnswer === option
                                ? "bg-lightBlue text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}