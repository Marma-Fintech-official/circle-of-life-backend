import mongoose from 'mongoose'

const userEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userEntry: { type: String, required: true }
  },
  { timestamps: true }
);

const userEntry = mongoose.model("userEntry", userEntrySchema);
export default userEntry;
