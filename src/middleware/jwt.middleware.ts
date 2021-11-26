import { NextFunction, Request, Response } from 'express'

const jwt = require('jsonwebtoken')

const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.JWT_HASH) {
      return res.status(500).json({
        success: false,
        message: 'Hash not available!',
      })
    }
    const token = req.headers.token
    if (!token) {
      return res.status(500).json({
        success: false,
        message: 'Token not provided!',
      })
    }
    const userData = jwt.verify(token, process.env.JWT_HASH)

    let currentTime = Date.now().valueOf() / 1000
    if (userData.exp < currentTime) {
      return res.json({
        success: false,
        message: 'Token expired!',
      })
    }
    next()
  } catch (err) {
    console.log('ERROR')
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Unknown server error!',
    })
  }
}

export default CheckJWT
