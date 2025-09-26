import User from '../models/userModel.js'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { createToken } from '../helper/jwt.js'
import { getUniqueReferId } from '../utils/generateReferrals.js'
dotenv.config()

const validateTelegramLogin = (initDataString, botToken) => {
  const debugInfo = {
    receivedInitDataStringLength: initDataString ? initDataString.length : 0,
    botTokenUsed: botToken
      ? botToken.substring(0, 5) +
        '...' +
        botToken.substring(botToken.length - 5)
      : 'NOT PROVIDED'
  }

  if (!initDataString || typeof initDataString !== 'string') {
    return {
      isValid: false,
      error: 'initDataString is missing or not a string.',
      debug: debugInfo
    }
  }

  if (!botToken || typeof botToken !== 'string') {
    return {
      isValid: false,
      error: 'botToken is missing or not a string.',
      debug: debugInfo
    }
  }

  try {
    const urlParams = new URLSearchParams(initDataString)
    const hash = urlParams.get('hash')
    debugInfo.extractedHash = hash

    if (!hash) {
      return {
        isValid: false,
        error: "'hash' parameter not found.",
        debug: debugInfo
      }
    }

    const dataCheckArr = []
    urlParams.forEach((value, key) => {
      if (key !== 'hash') {
        dataCheckArr.push(`${key}=${value}`)
      }
    })

    dataCheckArr.sort()
    const dataCheckString = dataCheckArr.join('\n')
    debugInfo.generatedDataCheckString = dataCheckString

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest()

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    debugInfo.calculatedHash = calculatedHash

    if (calculatedHash === hash) {
      const userString = urlParams.get('user')
      let user = null

      if (userString) {
        try {
          user = JSON.parse(userString)
        } catch (e) {
          console.error(
            'validateTelegramLogin: Failed to parse user JSON string:',
            e,
            userString
          )
          return {
            isValid: false,
            error: 'Failed to parse user JSON.',
            userString,
            debug: debugInfo
          }
        }
      }

      const authDate = urlParams.get('auth_date')
      return { isValid: true, user, authDate, debug: debugInfo }
    } else {
      return { isValid: false, error: 'Hash mismatch.', debug: debugInfo }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}

export const handleTelegramAuth = async authDataPayload => {
  try {
    if (!authDataPayload || !authDataPayload.initData) {
      throw new Error('Bad Request: initData field is missing.')
    }

    const rawInitDataString = authDataPayload.initData
    const botToken = process.env.TELEGRAM_TOKEN
    const validationResult = validateTelegramLogin(rawInitDataString, botToken)

    if (!validationResult.isValid) {
      throw new Error('Authentication failed. Invalid data.')
    }

    const telegramUserObject = validationResult.user

    if (!telegramUserObject || !telegramUserObject.id) {
      throw new Error('User data not found in authentication details.')
    }

    let user = await User.findOne({
      telegramId: telegramUserObject.id.toString()
    })

    if (user) {
      // Update existing user
      user.userName =
        telegramUserObject.first_name +
        (telegramUserObject.last_name ? ` ${telegramUserObject.last_name}` : '')
      if (telegramUserObject.photo_url) {
        user.profilePic = telegramUserObject.photo_url
      }
      await user.save()
    } else {
      // Create new user
      user = await User.create({
        userName:
          telegramUserObject.first_name +
          (telegramUserObject.last_name
            ? ` ${telegramUserObject.last_name}`
            : ''),
        telegramId: telegramUserObject.id.toString(),
        profilePic: telegramUserObject.photo_url,
        referId: getUniqueReferId(User),
        provider: 'telegram'
      })
    }

    // Generate JWT token
    const token = createToken({
      id: user._id,
      telegramId: user.telegramId,
      provider: user.provider
    })

    // Return user data with token
    return {
      user: {
        id: user._id,
        userName: user.userName,
        telegramId: user.telegramId,
        profilePic: user.profilePic,
        provider: user.provider,
        referId: user.referId
      },
      token
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error)
  }
}
