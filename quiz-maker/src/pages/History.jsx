import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function History() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("Failed to load your quiz history.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Quiz History</h2>
        <p className="text-gray-500 mb-8">Your past quiz attempts</p>

        {loading && (
          <p className="text-center text-gray-500 mt-10">Loading history...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-10">{error}</p>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">
              You haven't taken any quizzes yet.
            </p>
            <Link
              to="/quizzes"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Browse Quizzes
            </Link>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result._id}
                className="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {result.quizTitle}
                  </h4>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {formatDate(result.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-bold ${getScoreColor(
                      result.score,
                      result.total
                    )}`}
                  >
                    {result.score}/{result.total}
                  </p>
                  <p className="text-sm text-gray-400">
                    {Math.round((result.score / result.total) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;