import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ["google", "App", "web3"],
      default: "App",
    },
    email: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      unique: true,
      sparse: true, // allows null, unique only for non-null
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      default: '',
    },
    walletAddress: {
      type: String,
      default: '',
    },
    walletProvider: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },
    yourName: {
      type: String,
      default: '',
    },
    profilePic: {
      type: String, 
      default: '',
    },
    yourInterests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
