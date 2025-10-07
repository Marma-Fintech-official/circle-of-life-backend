import admin from './firebase.js';
import User from '../models/userModel.js';

export const sendPushNotification = async (userId, title, message) => {
  try {
    const user = await User.findById(userId);

    if (!user || !user.fcmTokens.length) {
      console.log('No FCM tokens found for user', userId);
      return;
    }

    const messages = user.fcmTokens.map(token => ({
      notification: { title, body: message },
      token,
    }));

    // Send notifications in batch
    const response = await admin.messaging().sendAll(messages);
    console.log('Push notifications sent:', response.successCount);
  } catch (error) {
    throw new Error("Error sending push notification", error);
  }
};
