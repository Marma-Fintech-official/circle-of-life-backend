import UserWallet from '../models/userWalletModel.js'
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


