const { default: mongoose } = require("mongoose");
const User = require("../../models/userModel");

exports.deleteUser = async (req, res) => {
  try {
    const { identifier } = req.params;
    let query = {};
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      query = { _id: identifier };
    } else {
      query = { email: identifier };
    }
    const message = await User.deleteOne(query);
    return res.status(201).json(message);
  } catch (error) {
    throw error.message;
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const deleteData = req.body;
    const message = await User.deleteOne(deleteData);
    return res.status(201).json(message);
  } catch (error) {
    throw error.message;
  }
};
