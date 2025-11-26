const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsController");

router.get("/", async (req, res) => {
  try {
    const [rows] = await require("../db").query("SELECT * FROM Comments");
    res.json({ count: rows.length, comments: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:postId", commentsCtrl.getComments);
router.post("/", commentsCtrl.addComment);
module.exports = router;
