import UserJournel from '../models/userJournelModel.js';
// import { decryptedDatas } from "../helper/decrypt.js";


export const updateUserProfile = async (req, res, next) => {
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
  