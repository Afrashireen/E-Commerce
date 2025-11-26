const express = require("express");
const cors = require("cors");
require("dotenv").config();

const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const likes = require("./routes/likes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/likes", likes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
