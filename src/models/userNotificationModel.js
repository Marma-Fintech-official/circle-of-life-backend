import mongoose from 'mongoose';

const userNotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to users collection
    required: true,
  },
  type: {
    type: String,
    enum: ['profile_inspired', 'nft_minted', 'expiry_warning', 'other'], // Add more types as needed
  },
  payload: {
    type: mongoose.Schema.Types.Mixed, // Can store any JSON object
    default: {},
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const userNotification = mongoose.model('UserNotification', userNotificationSchema);

export default userNotification;