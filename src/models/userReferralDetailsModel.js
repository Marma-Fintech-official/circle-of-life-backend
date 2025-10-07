import mongoose from "mongoose";

const userReferralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referred: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const userReferral = mongoose.model('UserReferral', userReferralSchema)

export default userReferral
