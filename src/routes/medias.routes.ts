import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { warpAsync } from '~/utils/handlers'

const mediasRouter = Router()

// middlewares  accessTokenValidator, verifiedUserValidator để đảm bảo rằng, phải đăng nhập mới đc đăng ảnh
mediasRouter.post('/upload-image', accessTokenValidator, verifiedUserValidator, warpAsync(uploadImageController))

export default mediasRouter
