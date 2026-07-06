import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        QuizMaker
      </Link>

      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-indigo-600">Home</Link>
        </li>
        <li>
          <Link to="/quizzes" className="hover:text-indigo-600">Quizzes</Link>
        </li>

        {user ? (
  <>
    <li>
      <Link to="/create" className="hover:text-indigo-600">Create Quiz</Link>
    </li>
    <li>
      <Link to="/history" className="hover:text-indigo-600">History</Link>
    </li>
    <li className="text-gray-600 text-sm">
      Hi, <span className="font-semibold text-gray-800">{user.name}</span>
    </li>
    <li>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </li>
  </>
) : (
          <>
            <li>
              <Link to="/login" className="hover:text-indigo-600">Login</Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;