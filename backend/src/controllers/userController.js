const User = require("../models/userModel");
const QueryMethod = require("../middlewares/query");
// const { HUB_ACCESS } = process.env;

exports.viewProfile = async (req, res) => {
  try {
    const user = req.user; // identify the user
    const userID = user._id;
    const userFound = await User.findById(userID);
    if (!userFound) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        })
    };
    return res.status(200).json({
        status: "success",
        profile: userFound
    });
} catch (error) {
     return res.status(404).json({ error: error.message });
   }
 };



exports.getAllUsers = async (req, res) => {
  try {
    // const admin = req.user;
    // if (admin.adminCode !== HUB_ACCESS) {
    //     return res.status(403).json({
    //     message: "You are not authorized to do this",
    //     });
    // }
    let queriedUsers = new QueryMethod(User.find(), req.query)
      .sort()
      .filter()
      .limit()
      .paginate();
    let users = await queriedUsers.query;
    res.status(200).json({
      status: true,
      message: "Users found",
      count: users.length,
      allUsers: users,
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: "No users found",
      err : error.message
    });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    // const admin = req.user;
    // if (admin.adminCode !== HUB_ACCESS) {
    //     return res.status(403).json({
    //     message: "You are not authorized to do this",
    //     });
    // }
    const id = req.params.id;
    const findUser = await User.findByIdAndDelete(id);
    if (!findUser) {
        return res.status(404).json({
        status: false,
        message: "User not found",
      });
    };
    return res.status(204).json({    // status code 204 no content is used for delete
        status: true,
        message: "User deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({ error: error.message })
  };
};
