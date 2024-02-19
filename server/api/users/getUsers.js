const User = require("../../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    return res.status(201).json(user);
  } catch (error) {
    throw error.message;
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 1
    const skip = limit * (page - 1);
    const user = await User.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(201).json(user);
  } catch (error) {
    throw error.message;
  }
};
