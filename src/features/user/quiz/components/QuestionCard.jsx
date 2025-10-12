export default function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
    // Transform the question data to match the expected structure
    const questionTitle = question.title || question.question;
    const questionOptions = question.items || question.options || [];
    
    return (
        <div className="w-full max-w-xl mx-auto p-4 rounded-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">{questionTitle}</h2>
            <div className="flex flex-col gap-3">
                {questionOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectAnswer(idx+1)}
                        className={`p-3 rounded-md border transition-colors duration-200 font-semibold text-right ${
                            selectedAnswer === idx+1
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}