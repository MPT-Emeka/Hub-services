const authController = require("../controllers/auth-controller");
const express = require("express");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

const {
  signIn,
  signUp,
  forgotPasswordController,
  resetPasswordController,
  logout,
} = authController;

router.post("/new", signUp);  // add middleware for input error handling

router.post("/", signIn);   // add middleware for input error handling

router.post("/:id", auth, logout);

router
  .route("/forgotpassword")
  .put(forgotPasswordController)
router
  .post("/reset-password/:token", resetPasswordController);

module.exports = router;
