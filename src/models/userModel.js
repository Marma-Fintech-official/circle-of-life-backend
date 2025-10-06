import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ['google', 'web3', 'X', 'telegram']
    },
    userName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      sparse: true 
    },
    twitterId: {
      type: String
    },
    googleId: {
      type: String
    },
    telegramId: {
      type: String
    },
    walletAddress: {
      type: String,
      default: ''
    },
    yourName: {
      type: String,
      unique: true,
      sparse: true 
    },
    profilePic: {
      type: String,
      default: ''
    },
    referId: {
      type: String,
      unique: true,
      sparse: true 
    },
    profileCompletionPercent: {
      type: Number,
      default: 0
    },
    profileCompletedAt: {
      type: Date,
      default: 0
    },
    profileHandle: {
      type: String,
      enum: ["public", "private", "friends"], 
      default: "public",
    },
    userNotification: {
      type: Boolean,
      default: true
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
