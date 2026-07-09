import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import QuizCard from "../components/QuizCard";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("https://quiz-maker-backend-l596.onrender.com/api/quizzes");
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const categories = ["All", ...new Set(quizzes.map((q) => q.category))];

  const filtered =
    selectedCategory === "All"
      ? quizzes
      : quizzes.filter((q) => q.category === selectedCategory);

  return (
    <div>
      <Navbar />
      <div className="px-8 py-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Quizzes</h2>

        {loading && (
          <p className="text-center text-gray-500 mt-10">Loading quizzes...</p>
        )}

        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex gap-3 mb-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No quizzes found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((quiz) => (
                  <QuizCard key={quiz._id} quiz={quiz} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuizList;