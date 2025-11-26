const pool = require("../db");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM Users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const [user] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [req.params.id]);
    if (user.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};