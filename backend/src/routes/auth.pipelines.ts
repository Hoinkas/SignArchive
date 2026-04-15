import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'

const authRouter = Router()

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { user, password } = req.body

    if (user === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET!, { expiresIn: '7d' })
      res.json({ token })
    } else {
      res.status(401).json({ error: 'Nieprawidłowe dane' })
    }
  })
)

export default authRouter
