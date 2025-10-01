import UserJournel from '../models/userJournelModel.js';
// import { decryptedDatas } from "../helper/decrypt.js";


export const createUserJournel = async (req, res, next) => {
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

      await UserJournel.create({
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
    const journal = await UserJournel.findOne({ _id: journalId, user: userId });
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
    const updatedJournal = await journal.save();

    res.status(200).json({
      message: 'Journal updated successfully',
    });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    next(error);
  }
};
  