const pool = require("../db");

// Get likes for a post
exports.getLikes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM likes WHERE post_id = ?",
      [req.params.postId]
    );
    res.json({ count: rows.length, likes: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add like
exports.addLike = async (req, res) => {
  const { post_id, user_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO likes (post_id, user_id) VALUES (?, ?)",
      [post_id, user_id]
    );

    res.json({ message: "Liked!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};