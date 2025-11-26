const pool = require("../db");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.post_id,
        p.user_id,
        u.name,
        u.profile_pic,
        p.image_url,
        p.description,
        p.category,
        p.created_at,
        (SELECT COUNT(*) FROM Likes l WHERE l.post_id = p.post_id) AS likes_count
      FROM Posts p
      JOIN Users u ON p.user_id = u.user_id
      ORDER BY p.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { user_id, description, image_url, category } = req.body;

  if (!user_id || !description) {
    return res.status(400).json({ message: "user_id and description are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Posts (user_id, image_url, description, category) VALUES (?, ?, ?, ?)",
      [user_id, image_url || "", description, category || ""]
    );

    res.status(201).json({ post_id: result.insertId });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error" });
  }
};