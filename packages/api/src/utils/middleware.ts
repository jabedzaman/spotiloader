import type { Request, Response, NextFunction } from 'express'
import { config } from '~/config'

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key']
  if (apiKey === config.API_KEY) {
    next()
  } else {
    res.status(401).json({ message: 'Invalid API Key' })
  }
}
