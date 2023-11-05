import { RequestHandler } from 'express'
import { NextFunction, Request, Response } from 'express-serve-static-core'

export const warpAsync = <P>(func: RequestHandler<P>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    // tao ra cau truc try catch
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
