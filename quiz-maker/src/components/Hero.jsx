import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Test Your Knowledge, One Quiz at a Time
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Create, share, and take quizzes on any topic — track your scores and challenge yourself.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/quizzes"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Browse Quizzes
        </Link>
        <Link
          to="/create"
          className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
        >
          Create a Quiz
        </Link>
      </div>
    </section>
  );
}

export default Hero;