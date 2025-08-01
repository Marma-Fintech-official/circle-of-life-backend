import mongoose from 'mongoose'

const { Schema, model } = mongoose

const AnswerEnum = [
  'Strongly Agree',
  'Agree',
  'Neutral',
  'Disagree',
  'Strongly Disagree'
]

const userPersonalitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    q1_emotionalControl: { type: String, enum: AnswerEnum, required: true },
    q2_mentalClarity: { type: String, enum: AnswerEnum, required: true },
    q3_energyOnWake: { type: String, enum: AnswerEnum, required: true },
    q4_environmentSupport: { type: String, enum: AnswerEnum, required: true },
    q5_workAlignment: { type: String, enum: AnswerEnum, required: true },
    q6_meaningfulConnections: {
      type: String,
      enum: AnswerEnum,
      required: true
    },
    q7_senseOfPurpose: { type: String, enum: AnswerEnum, required: true }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
)

const UserPersonality = model('UserPersonality', userPersonalitySchema)

export default UserPersonality
