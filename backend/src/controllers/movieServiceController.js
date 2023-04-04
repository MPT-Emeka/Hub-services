const MovieService = require("../models/movieServiceModel");
const QueryMethod = require("../middlewares/query");
const errorHandler = require("../helpers/errorHandler")
const { loginCheck } = require("../middlewares/authMiddleware")
// const { HUB_ACCESS } = process.env;

exports.uploadMovie = async (req, res) => {
  try {
    // const admin = req.user;
    // if (admin.adminCode !== HUB_ACCESS) {
    //     return res.status(403).json({
    //     message: "You are not authorized to do this",
    //   });
    // };
    const movieUpload = req.body;
    const findMovie = await MovieService.findOne({ accessLink: movieUpload.accessLink }); // check if i'll add .select("+accessLink")
    if (findMovie) {
        return res.status(400).json({
            status: "fail",
            message: "Movie has been uploaded before"
        })
    }
    await movieUpload.save();
    return res.status(201).json({
        status: "success",
        movie: movieUpload
    });
  } catch (err) {
    const error = errorHandler(err);
    res.status(404).json({ error });
  }
};



exports.getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;    
    const check = loginCheck;

    if (check) {    
        const movieFound1 = await MovieService.findById(movieId)
        if (!movieFound1) {
            return res.status(404).json({
                status: "fail",
                message: "Movie not found"
            })
        }
        return res.status(200).json({
            status: "Success",
            movie: movieFound1
        })
    };
    const movieFound2 = await MovieService.findById(movieId).select("+accessLink");
    if (!movieFound2) {
        return res.status(404).json({
            status: "fail",
            message: "Movie not found"
        })
    }
    return res.status(200).json({
        status: "Success",
        movie: movieFound2
    })
} catch (error) {
     return res.status(400).json({ error: error.message });
   }
 };

exports.getMovieListing = async (req, res) => {
  try {
    let queriedMovies = new QueryMethod(MovieService.find(), req.query)
      .sort()
      .filter()
      .limit()
      .paginate();
    let movies = await queriedMovies.query;
    res.status(200).json({
      status: true,
      message: "Movies found",
      count: movies.length,
      allMovies: movies,
    });
  } catch (error) {
    return res.status(404).send({
      status: false,
      message: "No movies found",
      err : error
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const id = request.params.id;
    const findMovie = await MovieService.findByIdAndDelete(id);
    if (!findMovie) {
      return res.status(404).json({    // status code 204 no content is used for delete
        status: "fail",
        message: "movie not found"
    });
    } else {
      return res.status(204).json({
        status: "success",
        message: "movie deleted",
      });
    };
  } catch (error) {
    return response.status(400).json({ error: error.message })  // check herefindMovie
  };
};
