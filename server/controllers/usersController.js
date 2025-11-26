const pool = require("../db");

exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM Users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [user] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [req.params.id]);
    if (user.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
