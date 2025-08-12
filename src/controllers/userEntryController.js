import axios from "axios";
import userEntries from '../models/userDailyEntryModel.js'

export const addUserEntry = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { userEntry } = req.body

    if (!userEntry) {
      return res.status(400).json({ message: 'userEntry is required' })
    }

    const newEntry = new userEntries({
      userId,
      userEntry
    })
    await newEntry.save()

    // Prepare the 4 fields to send
    const payload = {
      userId: newEntry.userId,
      userEntry: newEntry.userEntry,
      _id: newEntry._id,
      createdAt: newEntry.createdAt
    }

    // Send to local FastAPI (running at localhost:8000)
    await axios.post("http://localhost:8000/api/receive-entry", payload);

    res.status(201).json({
      message: 'Entry saved successfully'
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    next(error)
  }
}
