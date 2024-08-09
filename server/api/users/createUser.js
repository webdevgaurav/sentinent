const User = require("../../models/userModel");
const { hashPassword } = require("../../services/Common");

exports.createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      details,
      userType,
      status,
      profile
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      details,
      userType,
      status,
      profile
    });
    const user = await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    if(updateData.password){
      updateData.password = await hashPassword(updateData.password);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
