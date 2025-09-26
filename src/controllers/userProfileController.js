import User from "../models/userModel.js";
// import { decryptedDatas } from "../helper/decrypt.js";
import Referral from "../models/userReferralDetailsModel.js";

export const addReferral = async (req, res, next) => {
  try {
    const { refId } = req.body;

    if (!refId) {
      return res.status(400).json({ message: "Referral ID is required" });
    }

    const friendId = req.user._id;

    const referrer = await User.findOne({ referId: refId });

    if (!referrer) {
      return res.status(404).json({ message: "Referrer not found" });
    }

    if (referrer._id.toString() === friendId.toString()) {
      return res.status(400).json({ message: "You cannot refer yourself" });
    }

    const alreadyExist = await Referral.findOne({
      referrer: referrer._id,
      referred: friendId,
    });

    if (alreadyExist) {
      return res.status(400).json({ message: "Referral already exists" });
    }

    await Referral.create({
      referrer: referrer,
      referred: friendId,
    });

    return res.status(200).json({
      message: "Referral added successfully",
      referrerId: referrer._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(error);
  }
};
