export const quizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    category: "Programming",
    numQuestions: 3,
    difficulty: "Easy",
    questions: [
      {
        id: 1,
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctAnswer: "const",
      },
      {
        id: 2,
        question: "What does '===' check in JavaScript?",
        options: ["Value only", "Type only", "Value and type", "Neither"],
        correctAnswer: "Value and type",
      },
      {
        id: 3,
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
      },
    ],
  },
  {
    id: 2,
    title: "World Geography",
    category: "General Knowledge",
    numQuestions: 3,
    difficulty: "Medium",
    questions: [
      {
        id: 1,
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctAnswer: "Nile",
      },
      {
        id: 2,
        question: "Which country has the largest population?",
        options: ["USA", "India", "China", "Indonesia"],
        correctAnswer: "India",
      },
      {
        id: 3,
        question: "Mount Everest is located in which mountain range?",
        options: ["Andes", "Alps", "Himalayas", "Rockies"],
        correctAnswer: "Himalayas",
      },
    ],
  },
  {
    id: 3,
    title: "React Fundamentals",
    category: "Programming",
    numQuestions: 3,
    difficulty: "Hard",
    questions: [
      {
        id: 1,
        question: "Which hook lets you run code after a component renders?",
        options: ["useState", "useEffect", "useRef", "useMemo"],
        correctAnswer: "useEffect",
      },
      {
        id: 2,
        question: "What do you call data passed from a parent to a child component?",
        options: ["State", "Props", "Context", "Hooks"],
        correctAnswer: "Props",
      },
      {
        id: 3,
        question: "Which hook reads dynamic segments from the URL?",
        options: ["useParams", "useNavigate", "useState", "useRoutes"],
        correctAnswer: "useParams",
      },
    ],
  },
];