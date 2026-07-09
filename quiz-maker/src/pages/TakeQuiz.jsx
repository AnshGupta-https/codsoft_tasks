import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const QUIZ_TIME = 60;

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://quiz-maker-backend-l596.onrender.com/api/quizzes/${id}`);
        if (!response.ok) {
          throw new Error("Quiz not found");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError("Quiz not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async () => {
  if (!quiz) return;

  let score = 0;
  const breakdown = quiz.questions.map((q) => {
    const userAnswer = answers[q.id] || null;
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) score++;
    return {
      question: q.question,
      options: q.options,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
    };
  });

  if (token) {
    try {
      await fetch("https://quiz-maker-backend-l596.onrender.com/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz._id,
          quizTitle: quiz.title,
          score,
          total: quiz.questions.length,
        }),
      });
    } catch (err) {
      console.error("Failed to save result:", err);
    }
  }

  navigate("/result", {
    state: {
      score,
      total: quiz.questions.length,
      quizTitle: quiz.title,
      breakdown,
    },
  });
};

  useEffect(() => {
    if (loading || !quiz) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, quiz]);

  useEffect(() => {
    if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading quiz...</p>;
  }

  if (error || !quiz) {
    return <p className="text-center mt-10 text-gray-600">Quiz not found.</p>;
  }

  const currentQuestion = quiz.questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const timerColor = timeLeft <= 10
    ? "text-red-500 animate-pulse"
    : "text-indigo-600";

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const goNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
        <div className={`text-xl font-mono font-bold ${timerColor}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <p className="text-gray-500 mb-6">
        Question {currentIndex + 1} of {quiz.questions.length}
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {currentQuestion.question}
        </h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`border rounded-md px-4 py-2 cursor-pointer transition ${
                selectedOption === option
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-md font-medium text-gray-600 border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={goNext}
            className="px-4 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;