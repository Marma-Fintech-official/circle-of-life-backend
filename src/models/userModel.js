import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ["google", "App", "web3"],
      required: true,
    },
    email: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
      sparse: true, // allows null, unique only for non-null
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    walletProvider: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
