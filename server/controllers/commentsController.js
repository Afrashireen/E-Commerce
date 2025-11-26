const pool = require("../db");

// Get comments for a specific post
exports.getComments = async (req, res) => {
  const postId = parseInt(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT comment_id, post_id, name, comment, profile_pic, created_at
       FROM Comments
       WHERE post_id = ?
       ORDER BY created_at ASC`,
      [postId]
    );

    res.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new comment
exports.addComment = async (req, res) => {
  const { post_id, name, comment, profile_pic } = req.body;

  if (!post_id || !name || !comment) {
    return res.status(400).json({ message: "post_id, name, and comment are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Comments (post_id, name, comment, profile_pic) VALUES (?, ?, ?, ?)",
      [post_id, name, comment, profile_pic || 'https://via.placeholder.com/40']
    );

    res.status(201).json({ comment_id: result.insertId });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
};