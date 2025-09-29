import User from '../models/userModel.js'
import UserProfile from '../models/userProfileDetailsModel.js'
import Referral from '../models/userReferralDetailsModel.js'
import { isTokenBlacklisted, addToBlacklist } from '../helper/tokenHandler.js'
// import { decryptedDatas } from "../helper/decrypt.js";

export const updateUserProfile = async(req,res,next) => {
  try {
    const userId = req.user._id

    // Safely handle missing/empty body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Fields required' })
    }

    const {
      yourName,
      profileHandle,
      userNotification,
      tagline,
      inspireEnabled,
      publicSummary
    } = req.body || {}

    const userUpdates = {}
    if (typeof yourName !== 'undefined') userUpdates.yourName = yourName
    if (typeof profileHandle !== 'undefined') userUpdates.profileHandle = profileHandle
    if (typeof userNotification !== 'undefined') userUpdates.userNotification = userNotification

    const profileUpdates = {}
    if (typeof tagline !== 'undefined') profileUpdates.tagline = tagline
    if (typeof inspireEnabled !== 'undefined') profileUpdates.inspireEnabled = inspireEnabled
    if (typeof publicSummary !== 'undefined') profileUpdates.publicSummary = publicSummary

    if (Object.keys(userUpdates).length === 0 && Object.keys(profileUpdates).length === 0) {
      return res.status(400).json({ message: 'Fields required' })
    }

    let updatedUser = null
    if (Object.keys(userUpdates).length > 0) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: userUpdates },
        { new: true }
      )
    } else {
      updatedUser = await User.findById(userId)
    }

    let updatedProfile = null
    if (Object.keys(profileUpdates).length > 0) {
      updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { $set: { ...profileUpdates }, $setOnInsert: { userId } },
        { new: true, upsert: true }
      )
    } else {
      updatedProfile = await UserProfile.findOne({ userId })
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser?._id,
        yourName: updatedUser?.yourName,
        profileHandle: updatedUser?.profileHandle,
        userNotification: updatedUser?.userNotification
      },
      profile: updatedProfile
        ? {
            userId: updatedProfile.userId,
            tagline: updatedProfile.tagline,
            inspireEnabled: updatedProfile.inspireEnabled,
            publicSummary: updatedProfile.publicSummary
          }
        : null
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const addReferral = async (req, res, next) => {
  try {
    const { refId } = req.body

    if (!refId) {
      return res.status(400).json({ message: 'Referral ID is required' })
    }

    const friendId = req.user._id

    const referrer = await User.findOne({ referId: refId })

    if (!referrer) {
      return res.status(404).json({ message: 'Referrer not found' })
    }

    if (referrer._id.toString() === friendId.toString()) {
      return res.status(400).json({ message: 'You cannot refer yourself' })
    }

    const alreadyExist = await Referral.findOne({
      referrer: referrer._id,
      referred: friendId
    })

    if (alreadyExist) {
      return res.status(400).json({ message: 'Referral already exists' })
    }

    await Referral.create({
      referrer: referrer,
      referred: friendId
    })

    return res.status(200).json({
      message: 'Referral added successfully',
      referrerId: referrer._id
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.token

    // Check if the token is already blacklisted
    if (await isTokenBlacklisted(token)) {
      res.status(401).send({ message: 'Token is already blacklisted' })
      return
    }

    // Add the token to the blacklist
    await addToBlacklist(token)

    // Clear the cookies in the response
    res.clearCookie('token')

    res.status(201).send({ message: 'User logged out successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
