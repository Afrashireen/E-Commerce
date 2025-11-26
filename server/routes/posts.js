const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const [posts] = await pool.query(`
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

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    const [posts] = await pool.query(`
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
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const [posts] = await pool.query(`
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
      WHERE p.category = ?
      ORDER BY p.created_at DESC
    `, [category]);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts by category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, description, image_url, category } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Posts (user_id, description, image_url, category) VALUES (?, ?, ?, ?)",
      [user_id, description, image_url, category]
    );

    res.status(201).json({ post_id: result.insertId, message: "Post created" });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
