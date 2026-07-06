const express = require("express");
const Result = require("../models/Result");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { quizId, quizTitle, score, total } = req.body;

    const result = await Result.create({
      user: req.user.id,
      quizId,
      quizTitle,
      score,
      total,
    });

    res.status(201).json({ message: "Result saved", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;