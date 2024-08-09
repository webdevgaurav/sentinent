require("dotenv").config();
const router = require("express").Router();
const {
  generateToken,
  authenticateToken,
  refreshToken,
  authStatus,
  removeCookies,
} = require("../middleware/auth");

router.post("/login", generateToken);
router.post("/refreshToken", refreshToken);
router.get("/profile", authenticateToken);
router.get("/auth/status", authenticateToken, authStatus);
router.post("/logout", authenticateToken, removeCookies);

module.exports = router;
