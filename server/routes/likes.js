const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likesController");

router.get("/", async (req, res) => {
  try {
    const [rows] = await require("../db").query("SELECT * FROM Likes");
    res.json({ count: rows.length, likes: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:postId", likesCtrl.getLikes);
router.post("/", likesCtrl.addLike);
module.exports = router;
