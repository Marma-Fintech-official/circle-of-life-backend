import { isTokenBlacklisted } from '../helper/tokenHandler.js'
import { verifyToken } from '../helper/jwt.js'
import User from '../models/userPersonalityModel.js'

export const protect = async (req, res, next) => {
  let token

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]

      // Check if the token is blacklisted (only once)
      if (await isTokenBlacklisted(token)) {
        return res
          .status(401)
          .send({ message: 'Unauthorized - Token blacklisted' })
      }

      // Verify the token
      const decoded = await verifyToken(token)

      // Attach user to request
      req.user = await User.findById(decoded.id).select('-password')
      return next()
    }

    return res.status(401).send({ message: 'Unauthorized - No token provided' })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
