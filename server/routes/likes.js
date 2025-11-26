// likes.js
const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likesController");

// Get all likes (optional)
router.get("/", async (req, res) => {
  try {
    const [rows] = await require("../db").query("SELECT * FROM Likes");
    res.json({ count: rows.length, likes: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get likes for a specific post
router.get("/:postId", likesCtrl.getLikes);

// Add like
router.post("/", likesCtrl.addLike);

module.exports = router;