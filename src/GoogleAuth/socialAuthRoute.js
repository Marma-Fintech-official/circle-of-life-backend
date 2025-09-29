import express from 'express'
import passport from 'passport'
import { COOKIE_OPTIONS } from '../helper/cookie.js'
import { createToken } from '../helper/jwt.js'
import './googlePassport.js'

const router = express.Router()

// Initiates Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Handles Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,   //Login sessions require session support
    failureRedirect: '/login'
  }),
  async (req, res, next) => {
    try {
      const payload = {
        id: req.user._id,
        authType: req.user.authType,
        userName: req.user.userName
      }

      const token = createToken(payload)
        
      res.cookie("id", req.user._id.toString(), COOKIE_OPTIONS);
      res.cookie("token", token.toString(), COOKIE_OPTIONS);
      // res.redirect('https://www.wikipedia.org/')
      res.json({ message: 'login success' })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
      next(error)
    }
  }
)

router.get('/failure', (req, res) => {
  res.json({ message: 'Fail to login' })
})

export default router
