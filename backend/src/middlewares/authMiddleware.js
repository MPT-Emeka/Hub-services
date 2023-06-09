const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, HUB_ACCESS } = process.env;

//Token generator
exports.createToken = (id) => {
    return jwt.sign(
        {id}, 
        JWT_SECRET, 
        { expiresIn : JWT_EXPIRES_IN }
    )
};

//Authorize users
exports.auth = async (req, res, next) => {
    try {
      let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({
            message: "Not logged In",
        });
    }
    const userJWTData = await jwt.verify(token, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      const user = await User.findById(userJWTData.id);
      req.user = user;
      next();
    } catch (error) {
        return res.status(400).json({
            message: "authentication failed",
            error: error.message
        });
  
    }
};


exports.loginCheck = (req) => {
    const user = req.user
    const userId = user._id;
    if (!userId) {
        return true;
    }
}

//Check the role of the user who is logged in
exports.checkUser = (...roles) => {
    return async (req, res, next) => {
    if (!req.user.role.includes(...roles) && req.user.adminCode !== HUB_ACCESS) {
        return res.status(403).json({
        message: "You are not authorized to do this",
        });
    } 
    next();
  };
};
