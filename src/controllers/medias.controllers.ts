import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESS,
    result: url
  })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.params
  res.sendFile(path.resolve(UPLOAD_DIR, filename), (error) => {
    if (error) {
      return res.status((error as any).status).send('File not found')
    }
  })
}
