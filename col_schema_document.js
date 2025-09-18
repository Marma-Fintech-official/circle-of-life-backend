//1.User Schema

//This holds basic user information, preferences, and connections to other data.

// This schema defines the structure for a User document in a MongoDB collection using Mongoose. Each field is described below:

// name: A required string that stores the full name of the user.

// email: A required and unique string representing the user's email address, used for identification and communication.

// passwordHash: A required string that stores the hashed version of the user’s password, used for authentication.

// profilePic: An optional string containing the URL or path to the user's profile picture.

// preferences: An embedded object representing user-specific preferences:

// categories: An array of strings indicating the user's areas of interest (e.g., "fitness", "productivity").

// reminderSettings: An object to configure reminders:

// enabled: A boolean indicating if reminders are active (default is true).

// frequency: A string determining how often reminders are sent (e.g., "daily", "weekly", default is "daily").

// activityCategories: An array of strings where each value must match one of the predefined categories such as "fitness", "mental", "productivity", "financial", "travel", "device", "lifeLogging", or "consumption". This represents types of activities the user is involved in or interested in tracking.

// walletAddress: An optional string storing the user's crypto wallet address (default is an empty string).

// walletProvider: An optional string indicating the provider of the user's crypto wallet (default is an empty string).

// authType: A string that defines how the user authenticates. Possible values include:

// "google": Signed in with Google

// "App": Signed in using app-specific credentials

// "web3": Signed in using Web3 authentication
// The default value is "App".

// profileSetting: A string representing the user's profile visibility settings. Allowed values are:

// "private": Only visible to the user

// "public": Visible to everyone

// "friends": Visible only to approved friends
// The default value is "App" (Note: this might be a mistake; more below).

// createdAt: A timestamp indicating when the user was created. Defaults to the current date and time.

// updatedAt: A timestamp showing when the user was last updated. Defaults to the current date and time.

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // if using authentication
  profilePic: { type: String },

  preferences: {
    categories: [String], // e.g., ["fitness", "productivity"]
    reminderSettings: {
      enabled: { type: Boolean, default: true },
      frequency: { type: String, default: 'daily' } // daily, weekly, etc.
    }
  },
  activityCategories: [
    {
      type: String,
      enum: [
        'fitness',
        'mental',
        'productivity',
        'financial',
        'travel',
        'device',
        'lifeLogging',
        'consumption'
      ]
    }
  ],
  walletAddress: {
    type: String,
    default: ''
  },
  walletProvider: {
    type: String,
    default: ''
  },
  authType: {
    type: String,
    enum: ['google', 'App', 'web3'],
    default: 'App'
  },
  profileSetting: {
    type: String,
    enum: ['private', 'public', 'friends'],
    default: 'App'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)

//2.Activity Entry Schema

//Each activity record entered by the user, through any input method.

// userId:
// A required field that stores the ObjectId of the user who created the entry. It references the User model to establish a relationship between users and their activity entries.

// category:
// A required string that categorizes the type of activity being recorded. The value must be one of the following:

// "fitness": Physical activities such as workouts or sports.

// "mental": Emotional or psychological states and practices (e.g., journaling, meditation).

// "productivity": Work, tasks, focus sessions, etc.

// "financial": Budgeting, spending, savings tracking.

// "travel": Location-based activities or trips.

// "device": Usage of digital devices or screen time.

// "lifeLogging": General life events, memories, or journaling.

// "consumption": Food, media, shopping, or other consumption tracking.

// inputMethod:
// A required string indicating how the data was collected. Must be one of:

// "manual": Entered manually by the user.

// "voice": Collected via voice input.

// "image": Submitted through an image or photo.

// "gps": Logged through GPS tracking.

// "wearable": Synced from wearable devices (e.g., fitness trackers).

// "thirdParty": Imported from third-party apps or APIs.

// "chat": Entered through chat-based interfaces or assistants.

// data:
// A flexible field (mongoose.Schema.Types.Mixed) that allows storing structured or unstructured data depending on the activity. It can include JSON, text, numbers, or nested objects.
// Example data structures:

// For fitness:

// {
//   "type": "Workout",
//   "exercise": "Running",
//   "durationMinutes": 45,
//   "caloriesBurned": 320,
//   "heartRate": { "average": 138, "max": 155 }
// }

// For mental health logs (e.g., voice transcription):

// {
//   "text": "Felt stressed and anxious throughout the afternoon. Tried deep breathing exercises for 15 minutes.",
//   "emotion": "anxious",
//   "copingStrategy": "deep breathing",
//   "durationMinutes": 15
// }

// imageUrl:
// A string representing a URL to an uploaded image related to the activity. Default is an empty string.

// audioUrl:
// A string representing a URL to an uploaded audio file (e.g., voice log). Default is an empty string.

// tags:
// An array used to store custom labels or keywords associated with the activity. This helps with search, filtering, and categorization. Defaults to an empty array.

// timestamp:
// A date field representing when the activity was logged. Defaults to the current date and time.

const activityEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  category: {
    type: String,
    enum: [
      'fitness',
      'mental',
      'productivity',
      'financial',
      'travel',
      'device',
      'lifeLogging',
      'consumption'
    ],
    required: true
  },

  inputMethod: {
    type: String,
    enum: ['manual', 'voice', 'image', 'gps', 'wearable', 'thirdParty', 'chat'],
    required: true
  },

  data: { type: mongoose.Schema.Types.Mixed }, // flexible to store JSON, text, numbers, etc.
  // "data": {
  // "type": "Workout",
  // "exercise": "Running",
  // "durationMinutes": 45,
  // "caloriesBurned": 320,
  // "heartRate": {
  //   "average": 138,
  //   "max": 155
  // }  //text

  //  "data": {
  //   "text": "Felt stressed and anxious throughout the afternoon. Tried deep breathing exercises for 15 minutes.",
  //   "emotion": "anxious",
  //   "copingStrategy": "deep breathing",
  //   "durationMinutes": 15
  // }, //voice

  imageUrl: {
    type: String,
    default: ''
  },
  audioUrl: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: []
  },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ActivityEntry', activityEntrySchema)

//3.predictionSchema

// Prediction Schema Documentation

// This schema defines the structure for a Prediction document, which stores AI-generated or user-generated predictions related to a user’s activity or behavior, potentially based on past entries or patterns.

// 🧾 Fields Description:

// userId:
// A required field that stores the ObjectId of the user associated with this prediction. It references the User model, enabling linkage between predictions and users.

// category:
// A string representing the category or context of the prediction. This could align with other tracked areas such as "fitness", "mental", "productivity", etc., but is left flexible.

// prediction:
// A string that contains the predicted outcome, summary, or insight generated by the system. This might be a statement like "You are likely to feel more focused tomorrow if you maintain your current sleep pattern."

// confidence:
// A number representing the confidence level of the prediction, typically expressed as a percentage (e.g., 0.85 = 85% confident). This helps users understand how reliable the prediction is.

// generatedAt:
// A timestamp indicating when the prediction was generated. Defaults to the current date and time.

// 🧠 Example Use Cases:

// After logging sleep and mood data for a week, the system generates a "mental" category prediction like:
// "High chance of improved mood with consistent 8-hour sleep."

// A "fitness" prediction might say:
// "You're likely to burn 300+ calories if you continue your current workout trend."

// A "productivity" insight may note:
// "Peak focus hours observed between 9–11 AM. Consider scheduling deep work then."

//4.predicationSchema

// 🔮 Prediction Schema Documentation

// The Prediction schema defines the structure for storing predictive insights related to a user. These predictions can be generated based on user activity, behavioral patterns, or external data analysis.

// 🧾 Field Descriptions:

// userId:
// A required field containing the ObjectId of the user for whom the prediction was generated. This field references the User model, establishing a link between predictions and their associated users.

// category:
// A string indicating the area or type of prediction. This can represent domains such as "fitness", "mental", "productivity", etc. The field is flexible and does not enforce enum validation, allowing for custom or evolving categories.

// prediction:
// A string containing the prediction or summary itself. This field holds the main insight, outcome, or forecast.
// Example: "Based on your recent workouts, you are likely to improve endurance by 15% over the next month."

// confidence:
// A number (typically between 0 and 1) that represents the confidence level of the prediction. For instance, 0.92 means the system is 92% confident in the accuracy of the prediction.

// generatedAt:
// A timestamp indicating when the prediction was generated. It defaults to the current date and time when the document is created.

// ✅ Example Use Cases:

// A wellness app uses historical user data to generate a mental health prediction:
// "You're likely to experience reduced stress levels with continued journaling."

// A fitness app analyzes weekly activity and generates a forecast:
// "If current trends continue, expect a 5% increase in stamina by next month."

// The system assigns a confidence score (e.g., 0.85) to quantify the reliability of the prediction.

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  prediction: String, // summary or outcome
  confidence: Number,
  generatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Prediction', predictionSchema)

// //{
//   "_id": "64f2e1a5b2f3c7a1d4e5f678",
//   "userId": "64f1c3b1e1b3f5a7c0d1a123",
//   "category": "fitness",
//   "prediction": "Based on your recent activity, it’s recommended to increase your cardio sessions to 4 times a week to improve endurance.",
//   "confidence": 0.87,
//   "generatedAt": "2025-09-17T07:10:00.000Z"
// }


//5.ReminderSchema

// ⏰ Reminder Schema Documentation

// The Reminder schema defines the structure for storing scheduled reminders tied to a specific user. These reminders help users stay consistent with their activities, habits, or goals across different categories.

// 🧾 Field Descriptions:

// userId:
// A required field that stores the ObjectId of the user who owns the reminder. This field references the User model, linking the reminder to a specific user in the system.

// category:
// A string representing the category or context of the reminder. This might correspond to areas such as "fitness", "mental", "productivity", etc. The field is flexible and not currently validated by an enum, allowing for custom categories.

// message:
// A string that holds the content or body of the reminder message that will be sent or shown to the user.
// Example: "Don't forget to do your meditation today!"

// scheduledAt:
// A required Date field indicating when the reminder is scheduled to be triggered or delivered. This controls the timing of the reminder.

// status:
// A string representing the current status of the reminder. It must be one of the following:

// "pending": The reminder is scheduled but has not been sent yet (default).

// "sent": The reminder has been sent or triggered.

// "completed": The user has acknowledged or completed the task related to the reminder.

// ✅ Example Use Cases:

// A user schedules a "fitness" reminder with the message: "Time for your evening walk!" to be sent at 6:00 PM.

// Once the reminder is sent via push notification, the status is updated to "sent".

// If the user completes the walk and confirms it in the app, the status is updated to "completed".



const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  message: String,
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'sent', 'completed'],
    default: 'pending'
  }
})

module.exports = mongoose.model('Reminder', reminderSchema)

//6.tokenRewardSchema

// The TokenReward schema stores reward transactions for users, linking each reward to a specific user (userId) 
// and optionally to an activity (activityId). It records the reward amount, the reason for granting the reward, 
// and the timestamp (createdAt) when the reward was created.
const tokenRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityLog' },
  amount: { type: Number, default: 0 },
  reason: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('TokenReward', tokenRewardSchema)

//7.Feed schema
// The Feed schema represents user-generated posts in the system, 
// linking each post to a userId. It stores the post content, its category, 
// the number of likes, and associated comments. 
// Each feed item also records the creation time (createdAt) for activity tracking.

const feedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  category: String,
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Feed', feedSchema)

//8.recommendationSchema
//The Recommendation schema stores personalized suggestions for each user (userId), with an array of recommendations that include the category of activity, 
// the suggested action (suggestion), the underlying reason, and a confidence score. It also tracks when the recommendations were last updated (updatedAt).
const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recommendations: [
    {
      category: String,
      suggestion: String,
      reason: String,
      confidence: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Recommendation', recommendationSchema)

// //{
//   "_id": "64f3b2d7c1a4e8b2f9d0e789",
//   "userId": "64f1c3b1e1b3f5a7c0d1a123",
//   "recommendations": [
//     {
//       "category": "fitness",
//       "suggestion": "Start incorporating strength training twice a week to build muscle.",
//       "reason": "You’ve been focusing mainly on cardio exercises and may benefit from a balanced routine.",
//       "confidence": 0.92
//     },
//     {
//       "category": "mental",
//       "suggestion": "Try 10 minutes of daily meditation to reduce stress.",
//       "reason": "Your recent activity shows increased screen time and irregular sleep patterns.",
//       "confidence": 0.85
//     },
//     {
//       "category": "financial",
//       "suggestion": "Track your monthly subscriptions to reduce unnecessary expenses.",
//       "reason": "You have multiple recurring charges that could be optimized.",
//       "confidence": 0.78
//     }
//   ],
//   "updatedAt": "2025-09-17T07:25:00.000Z"
// }

//9.comment schema
//The Comment schema stores user comments linked to a specific feed (feedId) and the 
// commenting user (userId). It includes the comment message and the timestamp 
// (createdAt) when the comment was made.
const commentSchema = new mongoose.Schema({
  feedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Feed', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', commentSchema)
