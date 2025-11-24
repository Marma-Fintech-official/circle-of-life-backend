import UserWallet from '../models/userWalletModel.js'
import UserTranscation from '../models/userWalletTransModel.js'
import User from '../models/userModel.js'
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


export const transferCoins = async (req, res, next) => {
  try {
    const senderId = req.user._id
    const { receiverId, amount } = req.body

    // Basic validations
    if (!receiverId || !amount) {
      return res.status(400).json({ message: 'receiverId and amount are required' })
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' })
    }

    // Fetch sender and receiver
    const sender = await User.findById(senderId)
    const receiver = await User.findById(receiverId)

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' })
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: 'You cannot transfer to yourself' })
    }

    // Check sender balance
    if (sender.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' })
    }

    // Deduct from sender, add to receiver
    sender.walletBalance -= amount
    receiver.walletBalance += amount

    await sender.save()
    await receiver.save()

    // Log transactions for both users
    await UserTranscation.create([
      {
        userId: senderId,
        fromUser: senderId,
        toUser: receiverId,
        type: 'transfer',
        amount,
        currency: 'COL',
        metadata: { note: `Transferred ${amount} COL to ${receiver.username || receiver._id}` }
      },
      {
        userId: receiverId,
        fromUser: senderId,
        toUser: receiverId,
        type: 'transfer',
        amount,
        currency: 'COL',
        metadata: { note: `Received ${amount} COL from ${sender.yourName || sender._id}` }
      }
    ])
    

    res.status(200).json({
      message: `Successfully transferred ${amount} COL to ${receiver.yourName || receiver._id}`,
      senderBalance: sender.walletBalance,
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    next(error)
  }
}



