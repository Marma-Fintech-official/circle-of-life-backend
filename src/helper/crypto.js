import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();  

const secretKey = process.env.SECRET_KEY;
const ivKey = process.env.IV_KEY;

if (!secretKey || !ivKey) {
  throw new Error("SECRET_KEY or IV_KEY is missing");
}

const iv = CryptoJS.enc.Utf8.parse(ivKey);

export const decryptMessage = (encryptedMessage) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedMessage,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedMessage) throw new Error("Decryption failed");
    return decryptedMessage;
  } catch (error) {
    throw new Error("Decryption failed or invalid input");
  }
};