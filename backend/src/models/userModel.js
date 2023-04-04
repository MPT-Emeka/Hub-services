const mongoose = require("mongoose");
const { isEmail } = require("validator");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [4, "minimum character length is 4"],
        maxLength: [30, "maximum character length is 30"],
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "enter a valid email address"]
    },
    password: {        // use validator for password. 
        type: String,
        required: [true, "enter a password"],
        minLength: [5, "password should be more than 5 characters"],
        maxLength: [10, "maximum password character length is 10"],
        select: false
    },
    confirmPassword: {         
        type: String,
        required: [true, "enter a password"],
        minLength: [5, "password should be more than 5 characters"],
        maxLength: [10, "maximum password character length is 10"],
        select: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    adminCode: {
        type: Number,
        minLength: [5],
        maxLength: [5]
    }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;