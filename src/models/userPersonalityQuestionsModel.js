import mongoose from 'mongoose'

const userPersonalityQuestionSchema = new mongoose.Schema(
  {
    titleLogo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const UserPersonalityQuestion = mongoose.model(
  'UserPersonalityQuestion',
  userPersonalityQuestionSchema
)

export default UserPersonalityQuestion
