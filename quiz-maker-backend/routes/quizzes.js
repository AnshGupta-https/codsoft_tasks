const express = require("express");
const Quiz = require("../models/Quiz");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET all quizzes — public
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single quiz by ID — public
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("createdBy", "name");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new quiz — protected
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, difficulty, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      category,
      difficulty,
      questions,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;