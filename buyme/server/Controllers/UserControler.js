// user controller functions

import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../middleware/Auth.js";

// *********** PUBLIC CONTROLLERS ***********

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;

  try {
    const userExists = await User.findOne({ email });
    // check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    // crypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in database
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });
    // if user created send user data and token
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
    // else send error message
    else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user in database
    const user = await User.findOne({ email });

    // if user exists check password if match send user data and token
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
    // else send error message
    else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** PRIVATE CONTROLLERS ***********

// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;

  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists update user data
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();
      //  if user updated send user data
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        isAdmin: user.isAdmin,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete profile
// @route   DELETE /api/users
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists delete user
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can not delete admin");
      } else {
        await user.remove();
        res.json({ message: "User removed" });
      }
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    change user password
// @route   PUT /api/users/password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists check old password if match crypt new password and save it
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed" });
    }
    // else send error message
    else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get liked movies
// @route   GET /api/users/favorites
// @access  Private
const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies
    if (user) {
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Add liked movie
// @route   POST /api/users/favorites
// @access  Private
const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists add liked movie
    if (user) {
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete all liked movies
// @route   DELETE /api/users/favorites
// @access  Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists delete liked movies
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "All favorites movies removed" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** ADMIN CONTROLLERS ***********

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.params.id);
    // if user exists delete user
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can not delete admin");
      } else {
        await user.remove();
        res.json({ message: "User removed" });
      }
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  changeUserPassword,
  updateUserProfile,
  deleteUserProfile,
  getUsers,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovies,
  deleteUser,
};
