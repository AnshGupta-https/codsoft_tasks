import { useLocation, Link } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-10 text-center">
        <p className="text-gray-600 mb-4">No result data found.</p>
        <Link to="/quizzes" className="text-indigo-600 font-medium hover:underline">
          Browse Quizzes
        </Link>
      </div>
    );
  }

  const { score, total, quizTitle, breakdown } = result;
  const percentage = Math.round((score / total) * 100);

  let message = "Keep practicing!";
  if (percentage >= 80) message = "Excellent work!";
  else if (percentage >= 50) message = "Good effort!";

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Quiz Complete!</h2>
        <p className="text-gray-500 mb-8">{quizTitle}</p>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <p className="text-5xl font-bold text-indigo-600 mb-2">{percentage}%</p>
          <p className="text-gray-600 mb-4">
            You scored {score} out of {total}
          </p>
          <p className="text-lg font-medium text-gray-800">{message}</p>
        </div>
      </div>

      {breakdown && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-gray-800">Answer Review</h3>
          {breakdown.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-5 ${
                item.isCorrect
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="font-medium text-gray-800">
                  {idx + 1}. {item.question}
                </p>
                <span
                  className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                    item.isCorrect
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Your answer:{" "}
                <span className={item.isCorrect ? "text-green-700 font-medium" : "text-red-600 font-medium"}>
                  {item.userAnswer || "No answer selected"}
                </span>
              </p>

              {!item.isCorrect && (
                <p className="text-sm text-gray-600 mt-1">
                  Correct answer:{" "}
                  <span className="text-green-700 font-medium">{item.correctAnswer}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          to="/quizzes"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Back to Quizzes
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;