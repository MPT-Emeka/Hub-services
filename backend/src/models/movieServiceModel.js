const mongoose = require("mongoose");
const movieServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "movie title is required"],
        minLength: [2, "minimum title character is 2"],
        maxLength: [20, "Maximum title character length is 20"]
    },
    description: {
        type: String,
        minLength: [15, "minimum title character is 15"],
        maxLength: [300, "Maximum title character length is 300"]
    },
    posterImage: {
        type: String,
        required: [true, "enter url for movie poster"] 
    },
    posterImage2: {
        type: String,
        required: [true, "enter url for movie poster"] 
    },
    accessLink: {
        type: String,
        required: [true, "enter url for access link"],
        select: false
    },
    genre: {
        type: Array,
        required : [true, "please put in a genre"],
        minlength : [3, "genre should have more than 4 characters"],
        maxlength : [15, "genre should be less than 15 characters"]
    }
    },
    { timestamps: true }
)

const MovieService = mongoose.model("MovieService", movieServiceSchema);
module.exports = MovieService;