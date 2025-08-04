import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../helper/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const { userName, password, confirmpassword } = req.body;

    // validate required
    if (!userName || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // check if user exists
    const existing = await User.findOne({ userName });
    if (existing) {
      return res.status(409).json({ message: "Username already taken." });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashed,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        authType: savedUser.authType,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Find user with username and authType "username"
    const user = await User.findOne({ userName, authType: "App" });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate token
    const token = createToken({
      userId: user._id,
      authType: user.authType,
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        userName: user.userName
      },
    });
  } catch (err) {
    next(err);
  }
};
