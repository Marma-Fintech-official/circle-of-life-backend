import mongoose from "mongoose";

const interestSchema = new mongoose.Schema(
  {
    intrestType: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Interest = mongoose.model("Interest", interestSchema);
export default Interest;

