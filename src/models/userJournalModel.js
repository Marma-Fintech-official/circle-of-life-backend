import mongoose, { Schema } from 'mongoose'

const userJournalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contentSummary: {
    type: String,
    default: ''
  },
  contentHandle: {
    type: String,
    enum: ["public", "private", "friends"], 
    default: "public",
  },
  contentType: { 
    type: String, 
    enum: ["text", "audio"], 
  },
  contentAttachments: {
    type: [String],
    default: []
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

const userJournal = mongoose.model('UserJournal', userJournalSchema)

export default userJournal
