import { Router } from 'express'
import { serveImageController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:filename', serveImageController)

export default staticRouter
