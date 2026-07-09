import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function CreateQuiz() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "Easy",
  });

  const [questions, setQuestions] = useState([
    { tempId: crypto.randomUUID(), question: "", options: ["", "", "", ""], correctIndex: null },
  ]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { tempId: crypto.randomUUID(), question: "", options: ["", "", "", ""], correctIndex: null },
    ]);
  };

  const removeQuestion = (tempId) => {
    setQuestions(questions.filter((q) => q.tempId !== tempId));
  };

  const updateQuestionText = (tempId, value) => {
    setQuestions(
      questions.map((q) => (q.tempId === tempId ? { ...q, question: value } : q))
    );
  };

  const updateOption = (tempId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.tempId !== tempId) return q;
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  };

  const updateCorrectIndex = (tempId, index) => {
    setQuestions(
      questions.map((q) => (q.tempId === tempId ? { ...q, correctIndex: index } : q))
    );
  };

  const validateQuestions = () => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctIndex === null) {
        return `Please select a correct answer for Question ${i + 1}.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateQuestions();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const payload = {
      title: formData.title,
      category: formData.category,
      difficulty: formData.difficulty,
      questions: questions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctIndex],
      })),
    };

    try {
      const response = await fetch("https://quiz-maker-backend-l596.onrender.com/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create quiz.");
        return;
      }

      navigate("/quizzes");
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create a Quiz</h2>
        <p className="text-gray-500 text-sm mb-8">
          Build your own quiz and share it with others.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Python Basics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Programming"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {questions.map((q, qIndex) => (
            <div key={q.tempId} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-700">Question {qIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeQuestion(q.tempId)}
                  disabled={questions.length === 1}
                  className="text-red-500 text-sm font-medium hover:underline disabled:opacity-30 disabled:cursor-not-allowed disabled:no-underline"
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestionText(q.tempId, e.target.value)}
                placeholder="Enter the question text"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <p className="text-xs text-gray-500 mb-2">Options (select the correct one):</p>
              <div className="space-y-2">
                {q.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`correct-${q.tempId}`}
                      checked={q.correctIndex === idx}
                      onChange={() => updateCorrectIndex(q.tempId, idx)}
                      className="accent-indigo-600"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(q.tempId, idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      required
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full border-2 border-dashed border-gray-300 text-gray-500 py-3 rounded-lg font-medium hover:border-indigo-400 hover:text-indigo-600 transition"
          >
            + Add Another Question
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Quiz..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;