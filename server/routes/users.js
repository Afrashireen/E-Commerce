const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/usersController");

router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserById);

module.exports = router;