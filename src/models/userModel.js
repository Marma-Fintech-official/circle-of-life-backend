import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ['google',  'web3', 'X'],
    },
    userName: {
      type: String,
      unique: true,
      default: "",
    },
    twitterId: {
      type: String
    },
    googleId: {
      type: String
    },
    walletAddress: {
      type: String,
      default: "",
    },
    walletProvider: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    referId: {
      type: String,
      unique: true,
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
