const router = require("express").Router();
const getUsers = require("../api/users/getUsers");
const createUser = require("../api/users/createUser");
const deleteUser = require("../api/users/deleteUser");
const { authenticateToken } = require("../middleware/auth");

router.get("/get/:identifier", authenticateToken, getUsers.getUser); // identifier should be id or email
router.get("/get", authenticateToken, getUsers.getUsers);
router.post("/create", authenticateToken, createUser.createUser);
router.put("/update/:userId", authenticateToken, createUser.updateUser);
router.post("/delete/:identifier", authenticateToken, deleteUser.deleteUser); // identifier should be id or email

module.exports = router;
