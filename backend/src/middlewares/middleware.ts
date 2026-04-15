import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err)
  res.status(500).json({ error: err.message ?? 'Internal server error' })
}

export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not found' })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Brak tokenu' })
    return
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    next()
  } catch {
    res.status(403).json({ error: 'Nieprawidłowy token' })
  }
}
