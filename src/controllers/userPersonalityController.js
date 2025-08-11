import UserPersonality from '../models/userPersonalityModel.js'
import userPersonalityQuestions from '../models/userPersonalityQuestionsModel.js'
import {
  personalityWords,
  personalityDescriptions
} from '../helper/personality_data.js'
// import { decryptedDatas } from "../helper/decrypt.js";

export const createUserPersonality = async (req, res, next) => {
  try {
    const userId = req.user._id

    // Check if the user already has a personality entry
    const existingPersonality = await UserPersonality.findOne({ userId })
    if (existingPersonality) {
      return res
        .status(400)
        .json({ message: 'Your Personality Details Already Created' })
    }

    const {
      q1_emotionalControl,
      q2_mentalClarity,
      q3_energyOnWake,
      q4_environmentSupport,
      q5_workAlignment,
      q6_meaningfulConnections,
      q7_senseOfPurpose,
      answerArray // [5,4,3,2,1,5,3]
    } = req.body

    // Hashing function: takes a string and produces a consistent positive integer
    function djb2Hash (str) {
      let hash = 5381 // starting "seed" value for djb2 algorithm

      // Loop through each character in the string
      for (let i = 0; i < str.length; i++) {
        // Multiply hash by 33 (shift left by 5 bits = multiply by 32, then add hash once more)
        // Then add the Unicode value of the current character
        hash = (hash << 5) + hash + str.charCodeAt(i)

        // Keep hash value within 32-bit unsigned integer range
        hash = hash & 0xffffffff
      }

      // Return a positive number (avoids negative indices later)
      return Math.abs(hash)
    }

    // Convert answer array into a single string, e.g. [5,4,3] -> "5,4,3"
    const hash = djb2Hash(answerArray.join(','))

    // Use modulus to ensure index is within personalityWords array length
    const index = hash % personalityWords.length

    // Pick the personality word using the calculated index
    const personalityWord = personalityWords[index]

    // Pick the matching personality description
    const personalityDescription = personalityDescriptions[index]

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

    await newPersonality.save()

    // 6. Send back result
    res.status(201).json({
      message: 'Your Personality Details Created Successfully',
      personalityWord,
      personalityDescription,
      index,
      hash
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const getUserPersonalityDetails = async (req, res, next) => {
  try {
    const userId = req.user._id
    const personality = await UserPersonality.findOne({ userId })
    if (!personality) {
      return res.status(404).json({ message: 'No Personality Details Found' })
    }
    res.status(200).json(personality)
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const createPersonalityQuestions = async (req, res, next) => {
  try {
    const { title, question } = req.body

    const existingPersonalityQuestion = await userPersonalityQuestions.findOne({
      title
    })
    if (existingPersonalityQuestion) {
      return res
        .status(400)
        .json({ message: 'Your Personality Question Already Created' })
    }
    const titleLogo = req.file

    if (!title || !question || !titleLogo) {
      return res.status(400).json({
        message: 'Missing fields'
      })
    }

    const newQuestion = new userPersonalityQuestions({
      title,
      question,
      titleLogo: titleLogo.path // or titleLogo.filename based on your multer config
    })

    await newQuestion.save()

    res.status(201).json({
      message: 'Personality question created successfully'
    })
  } catch (error) {
    console.error('Error creating personality question:', error)
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const getUserPersonalityQuestions = async (req, res, next) => {
  try {
    const questions = await userPersonalityQuestions.find()

    res.status(200).json({
      message: 'Personality questions fetched successfully',
      data: questions
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
