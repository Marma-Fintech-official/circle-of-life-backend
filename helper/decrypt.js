import { decryptMessage } from '../helper/crypto'; // Make sure crypto.js is using ES modules too

export const decryptedDatas = (req, res) => {
  const { encryptedData, iv } = req.body;

  if (!encryptedData || !iv) {
    return res.status(400).json({ message: 'Missing encrypted data or IV' });
  }

  try {
    const decrypted = decryptMessage(encryptedData, iv);
    const parsed = JSON.parse(decrypted);
    return parsed;
  } catch (error) {
    return res.status(400).json({ message: 'Invalid encrypted data or IV' });
  }
};