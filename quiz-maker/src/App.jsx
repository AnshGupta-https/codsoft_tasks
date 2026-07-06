import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";
import ResultPage from "./pages/ResultPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import History from "./pages/History";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quiz/:id" element={<TakeQuiz />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/create" element={<CreateQuiz />} />
    </Routes>
  );
}

export default App;