import Notification from '../models/userNotificationModel'
import User from '../models/userModel.js'
// import { decryptedDatas } from "../helper/decrypt.js";
            
export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user._id

    const findUserId = await User.findOne({ _id: userId });

    if (!findUserId) {
      return res.status(404).json({ message: "Invalid userId" });
    }
    const { id } = req.params // Notification ID
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true, readByDate: new Date() },
      { new: true }
    )
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }
    res
      .status(200)
      .json({ message: 'Notification marked as read', notification })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const markAllNotificationsRead = async (req, res) => {
  try {
    const { userId } = req.user._id

    const findUserId = await User.findOne({ _id: userId });

    if (!findUserId) {
      return res.status(404).json({ message: "Invalid userId" });
    }

    const result = await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true, readByDate: new Date() }
    )
    res
      .status(200)
      .json({
        message: 'All notifications marked as read',
        modifiedCount: result.modifiedCount
      })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
