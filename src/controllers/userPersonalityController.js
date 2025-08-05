import UserPersonality from '../models/userPersonalityModel.js'
import { decryptedDatas } from '../helper/decrypt.js'

export const createUserPersonality = async (req, res, next) => {  
  try {

    const userId = req.user._id; // Get telegramId from req.user
    const {    
      q1_emotionalControl,
      q2_mentalClarity,
      q3_energyOnWake,
      q4_environmentSupport,
      q5_workAlignment,
      q6_meaningfulConnections,
      q7_senseOfPurpose
    } = req.body

    const newPersonality = new UserPersonality({
      userId,
      q1_emotionalControl,
      q2_mentalClarity,
      q3_energyOnWake,
      q4_environmentSupport,
      q5_workAlignment,
      q6_meaningfulConnections,
      q7_senseOfPurpose
    })

    const saved = await newPersonality.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
