import admin from './firebase.js';
import User from '../models/userModel.js';

export const sendPushNotification = async (userId, title, message) => {
  try {
    const user = await User.findById(userId);

    if (!user) return;
    if (!user.userNotification) return;
    if (!user.fcmTokens || !user.fcmTokens.length) return;

    const messages = user.fcmTokens.map(token => ({
      notification: { title, body: message },
      token,
    }));

    await admin.messaging().sendAll(messages);
  } catch (error) {
    throw new Error('Error sending push notification');
  }
};
