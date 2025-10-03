import UserJournal from '../models/userJournalModel.js';
// import { decryptedDatas } from "../helper/decrypt.js";


export const createUserJournal = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Fields required' });
    }

    const {
      contentSummary,
      contentHandle,
      contentType,
    } = req.body;

    // Handle uploaded files (if any)
    let contentAttachments = [];
    if (req.files && req.files.length > 0) {
      contentAttachments = req.files.map(file => file.path); 
      // OR file.filename if you're storing only the name
    }

      await UserJournal.create({
      user: userId,
      contentSummary,
      contentHandle,
      contentType,
      contentAttachments,
    });

    res.status(201).json({
      message: 'User journal created successfully',
    });

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
    next(error);
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const journalId = req.params.id;

    if (!req.body && !req.files) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const {
      contentSummary,
      contentHandle,
      contentType,
    } = req.body;

    // Collect new files if uploaded
    let newAttachments = [];
    if (req.files && req.files.length > 0) {
      newAttachments = req.files.map(file => file.path); 
      // OR file.filename depending on how you store it
    }

    // Find existing journal
    const journal = await UserJournal.findOne({ _id: journalId, user: userId });
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Update fields if provided
    if (contentSummary) journal.contentSummary = contentSummary;
    if (contentHandle) journal.contentHandle = contentHandle;
    if (contentType) journal.contentType = contentType;

    // Append new attachments (instead of overwriting)
    if (newAttachments.length > 0) {
      journal.contentAttachments = [
        ...journal.contentAttachments,
        ...newAttachments
      ];
    }

    // Save updated journal
    await journal.save();

    res.status(200).json({
      message: 'Journal updated successfully',
    });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    next(error);
  }
};

export const getUserJournals = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const journalId = req.query.id; // if provided, fetch single journal

    //1. Fetch single journal by ID
    if (journalId) {
      const journal = await UserJournal.findOne({ _id: journalId, user: userId });
      if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
      }
      return res.status(200).json({
        success: true,
        data: journal
      });
    }

    //2. Fetch all journals with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await UserJournal.countDocuments({ user: userId });

    const journals = await UserJournal.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      data: journals
    });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    next(error);
  }
};


export const discardUserInput = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const journalId = req.query.id; 

    if (!journalId) {
      return res.status(400).json({ message: "Journal ID is required" });
    }

    // find and update journal entry
    const journal = await UserJournal.findOneAndUpdate(
      { _id: journalId, userId, isDeleted: false }, // ensure user owns it & not already deleted
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal not found or already deleted" });
    }

    res.status(200).json({
      message: "Journal discarded successfully",
      data: journal
    });

  } catch (error) {
    next(error);
  }
};
  