import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400);
    const err = new Error("Please enter name/email/password.!");
    return next(err);
  }

  if (password.length < 8) {
    res.status(400);
    const err = new Error("Password must be atleast 8 characters length!");
    return next(err);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Invalid email address!");
    return next(err);
  }

  try {
    // # using findOne method
    // const userExists = await User.findOne({ email });
    // if (userExists) {
    //   res.status(400);
    //   const err = new Error(
    //     "Email is already registered. Please use a different email!"
    //   );
    //   return next(err);
    // }

    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });

      // res.send("User registered successfully!");
    }
  } catch (error) {
    console.log(error);

    // # using error.code method
    if (error.code === 11000) {
      res.status(400);
      const err = new Error(
        "Email is already registered. Please use a different email!"
      );
      return next(err);
    }

    res.status(500).json({ error: error.message } || "Internal server error!");
  }
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const comparePwd = await user.comparePassword(password);

  if (user && comparePwd) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }

  console.log(email, password);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out!" });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (password && password.length < 8) {
    res.status(400);
    throw new Error("Password must be atleast 8 characters length!");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export { createUser, getProfile, updateProfile, login, logout };
