import mongoose from 'mongoose'

const { Schema} = mongoose
const userTranscationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null // null for mint
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null // null for burn
    },
    userJournalId: {
      type: Schema.Types.ObjectId,
      ref: 'UserJournal',
      default: null
    },
    amount: {
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
    type: {
      type: String,
      enum: [
        'inspire_buy',
        'inspire_sell',
        'reward',
        'mint_nft',
        'fee',
        'transfer',
        'burn',
        'deposit',
        'withdraw'
      ]
    },
    metadata: {
      type: Schema.Types.Mixed, // Flexible JSON
      default: {}
    },
    blockRef: {
      type: String,
      default: null // Optional on-chain hash
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
)

const userTranscation = mongoose.model('UserTranscation', userTranscationSchema)
export default userTranscation
