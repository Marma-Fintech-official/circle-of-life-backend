import mongoose from 'mongoose'

const { Schema } = mongoose

const userProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    handle: {
      type: String,
      unique: true
    },
    tagline: {
      type: String,
      default: ''
    },
    inspireEnabled: {
      type: Boolean,
      default: false
    },
    inspireSupply: {
      type: Number,
      default: ''
    },
    inspireBasePrice: {
      type: Schema.Types.Decimal128,
      default: 0
    },
    inspireExponent: {
      type: Schema.Types.Decimal128,
      default: 0
    },
    inspireFloor: {
      type: Schema.Types.Decimal128,
      default: 0
    },
    currentRank: {
      type: Number,
      default: 0
    },
    publicSummary: {
      type: String,
      default: ''
    },
    consentVersion: {
      type: String,
      default: ''
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
  {
    timestamps: true
  }
)

export default mongoose.model('UserProfile', userProfileSchema)
