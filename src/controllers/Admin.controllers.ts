import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

if (!USERNAME || !PASSWORD) {
  throw new Error('Missing USERNAME or PASSWORD')
}

export const SignIn = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(500).json({
      success: false,
      message: 'Invalid creds!',
    })
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'OKAY', {
    expiresIn: '5h',
  })
  return res.status(200).json({
    success: true,
    token,
  })
}
