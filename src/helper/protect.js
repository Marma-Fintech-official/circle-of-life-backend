import { isTokenBlacklisted } from '../helper/tokenHandler.js'
import { verifyToken } from '../helper/jwt.js'
import User from '../models/userModel.js'

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Check if the token is blacklisted
      if (await isTokenBlacklisted(token)) {
        return res
          .status(401)
          .send({ message: "Unauthorized - Token blacklisted" });
      }

      const decoded = verifyToken(token); // Use verifyToken function from jwt

      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Unauthorized - User not found" });
      }
      return next();
    } else {
      return res
        .status(401)
        .send({ message: "Unauthorized - No or invalid token provided" });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Unauthorized - Token verification failed" });
  }
};
