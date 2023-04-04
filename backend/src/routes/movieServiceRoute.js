const movieServiceController = require("../controllers/movieServiceController");
const express = require("express");
const { auth, checkUser } = require("../middlewares/authMiddleware");

const router = express.Router();

const {
  uploadMovie,
  getMovie,
  getMovieListing,
  deleteMovie
} = movieServiceController;

router
.route("/")
.post(auth, checkUser("admin"), uploadMovie)    // add middleware for input error handling
.get(getMovieListing)   // return abtracted movie list without link fields


router.route("/:id")
.get(getMovie)   // add middleware to check if user is logged in before having access to link
.delete(auth, checkUser("admin"), deleteMovie)


module.exports = router;
