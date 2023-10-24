import { RequestHandler } from 'express'
import { NextFunction, Request, Response } from 'express-serve-static-core'

export const warpAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // tao ra cau truc try catch
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
