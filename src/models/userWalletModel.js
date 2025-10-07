import mongoose from 'mongoose'

const { Schema} = mongoose

const userWalletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' // Assumes you have a User model
    },
    walletType: {
      type: String,
      enum: ['CUSTODIAL', 'EXTERNAL']
    },
    provider: {
      type: String,
      enum: ['internal', 'metamask', 'walletconnect'] // Add more if needed
    },
    walletAddress: {
      type: String,
      unique: true, // Ensures no duplicate blockchain addresses
      sparse: true
    },
    pubKey: {
      type: String,
      default: null
    },
    encryptedPrivateKey: {
      type: String,
      default: null
    },
    kdfSalt: {
      type: String,
      default: null
    },
    walletBalance: {
      type: Schema.Types.Decimal128,
      default: 0.0,
      get: v => (v ? parseFloat(v.toString()) : 0)
    },
    lockedBalance: {
      type: Schema.Types.Decimal128,
      default: 0.0,
      get: v => (v ? parseFloat(v.toString()) : 0) // Arrow function: input is 'v' (the stored value)
      // If v exists (not null or undefined)...
      // Convert it to a float
      // First convert Decimal128 to a string (e.g., "0.1234")
      // Otherwise, return 0 (default)
    },
    currency: {
      type: String,
      trim: true // e.g., 'ETH', 'BTC', 'USDT'
    },
    meta: {
      type: Schema.Types.Mixed, // Allows storing arbitrary JSON
      default: {}
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { getters: true },
    toObject: { getters: true }
  }
)

const userWallet= mongoose.model('UserWallet', userWalletSchema)

export default userWallet

