import UserWallet from '../models/userWalletModel.js'
import UserTranscation from '../models/userWalletTransModel.js'
// import { decryptedDatas } from "../helper/decrypt.js";

export const getWalletBalance = async (req, res, next) => {
  try {
    const userId = req.user._id
    const walletBalance = await UserWallet.findOne({ userId })
    res.status(200).json({ walletBalance })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    next(error)
  }
}

export const getWalletTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id

    // Extract page and limit from query params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20

    // Calculate skip value
    const skip = (page - 1) * limit

    // Fetch transactions with pagination
    const walletTransactions = await UserTranscation.find({ userId })
      .sort({ createdAt: -1 }) // latest first (optional)
      .skip(skip)
      .limit(limit)

    // Get total count for pagination info
    const total = await UserTranscation.countDocuments({ userId })

    res.status(200).json({
      walletTransactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    next(error)
  }
}



