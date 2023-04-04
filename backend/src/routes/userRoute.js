const express = require("express");
const UserController = require("../controllers/userController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

app.use(express.json());
const router = express.Router();

const { viewProfile, getAllUsers, deleteUser } = UserController;

router.route("/")
.get(auth, checkUser("admin"), getAllUsers);   // add middlewares for error handling. 

router.route("/:id")
.get(auth, viewProfile)
.delete(auth, checkUser("admin"), deleteUser);

module.exports = router;
