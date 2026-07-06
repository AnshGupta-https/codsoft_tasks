const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");
const User = require("./models/User");

const quizzesData = [
  {
    title: "JavaScript Basics",
    category: "Programming",
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
    title: "World Geography",
    category: "General Knowledge",
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
    title: "React Fundamentals",
    category: "Programming",
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

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const user = await User.findOne();
    if (!user) {
      console.log("No users found in the database. Register a user first, then re-run this script.");
      process.exit(1);
    }

    await Quiz.deleteMany({});
    console.log("Cleared existing quizzes");

    const quizzesWithCreator = quizzesData.map((quiz) => ({
      ...quiz,
      createdBy: user._id,
    }));

    await Quiz.insertMany(quizzesWithCreator);
    console.log(`Seeded ${quizzesWithCreator.length} quizzes, created by ${user.name}`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();