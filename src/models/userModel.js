import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ['google', 'web3', 'X', 'telegram']
    },
    userName: {
      type: String,
      unique: true,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      default: ''
    },
    twitterId: {
      type: String
    },
    googleId: {
      type: String
    },
    walletAddress: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: ''
    },
    referId: {
      type: String,
      unique: true
    },
    profileCompleted: {
      type: Boolean,
      default: false
    },
    profileCompletionPercent: {
      type: Number,
      default: 0
    },
    profileCompletedAt: {
      type: Date,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: 0
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
