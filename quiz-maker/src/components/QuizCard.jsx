import { Link } from "react-router-dom";

function QuizCard({ quiz }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <span className="text-xs font-medium text-indigo-600 uppercase">{quiz.category}</span>
      <h4 className="text-lg font-semibold text-gray-800 mt-1 mb-2">{quiz.title}</h4>
      <p className="text-sm text-gray-500 mb-4">{quiz.questions.length} Questions · {quiz.difficulty}</p>
      <Link
        to={`/quiz/${quiz._id}`}
        className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default QuizCard;