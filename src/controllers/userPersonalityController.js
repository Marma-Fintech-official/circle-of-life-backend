import UserPersonality from '../models/userPersonalityModel.js'
import { decryptedDatas } from '../helper/decrypt.js'

export const createUserPersonality = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Check if the user already has a personality entry
    const existingPersonality = await UserPersonality.findOne({ userId });
    if (existingPersonality) {
      return res.status(400).json({ message: "Personality already created for this user." });
    }

    const {
      q1_emotionalControl,
      q2_mentalClarity,
      q3_energyOnWake,
      q4_environmentSupport,
      q5_workAlignment,
      q6_meaningfulConnections,
      q7_senseOfPurpose
    } = req.body;

    const newPersonality = new UserPersonality({
      userId,
      q1_emotionalControl,
      q2_mentalClarity,
      q3_energyOnWake,
      q4_environmentSupport,
      q5_workAlignment,
      q6_meaningfulConnections,
      q7_senseOfPurpose
    });

    const saved = await newPersonality.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error); // You don't need to call res.status here if you're passing to error handler
  }
};

