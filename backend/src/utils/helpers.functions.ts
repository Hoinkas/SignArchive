import { Request } from 'express'

export const param = (req: Request, key: string): string => req.params[key] as string