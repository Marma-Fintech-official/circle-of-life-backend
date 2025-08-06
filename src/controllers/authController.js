import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../helper/jwt.js";
import { getUniqueReferId } from "../utils/generateReferrals.js";
// import { decryptedDatas } from "../helper/decrypt.js";

export const signup = async (req, res, next) => {
  
  try {    
    // const { userName, password, confirmpassword } = decryptedDatas(req);

    const { userName, password, confirmpassword } = req.body

    // validate required
    if (!userName || !password || !confirmpassword) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }

    // check if user exists
    const existing = await User.findOne({ userName })
    if (existing) {
      return res.status(409).json({ message: 'Username already taken.' })
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    let referId = "";
    try {
      referId = await getUniqueReferId(User); // may throw if something is wrong
    } catch (err) {
      console.error("Failed to generate unique referId:", err);
      // Option: proceed without referId or return error — here we proceed without blocking signup
    }

    const newUser = new User({
      userName,
      password: hashed,
      referId: referId,
    });

    const savedUser = await newUser.save()

    res.status(201).json({
      message: "Signup Successfully",
      user: {
        username: savedUser.userName,
        referId: savedUser.referId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(error);
  }
}

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' })
    }

    // Find user with username and authType "username"
    const user = await User.findOne({ userName, authType: 'App' })

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    // Generate token
    const token = createToken({
      id: user._id,
      authType: user.authType
    })

    res.status(200).json({
      message: "Login successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(error);
  }
}

export const personalDetails = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { dob, gender, yourName, yourInterests } = req.body
    const profilePic = req.file

    // Validate required fields
    if (!dob || !gender || !yourName || !yourInterests || !profilePic) {
      return res.status(400).json({
        message: 'Missing Fields'
      })
    }

    // Fetch user by ID
    const user = await User.findById(userId)

    // Check if any personal detail already exists
    const hasPersonalDetails =
      user.dob ||
      user.gender ||
      user.yourName ||
      user.profilePic ||
      user.yourInterests?.length > 0

    if (hasPersonalDetails) {
      return res
        .status(400)
        .json({ message: 'Your Personal Details Already Created' })
    }

    // Convert "sports, food" => ['sports', 'food']
    const interestsArray = yourInterests
      .split(',')
      .map(item => item.trim())
      .filter(Boolean) // remove empty strings

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        dob,
        gender,
        yourName,
        profilePic: profilePic.path,
        yourInterests: interestsArray
      },
      { new: true }
    )

    res.status(200).json({
      message: 'Personal Details updated successfully',
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(error);
  }
};
