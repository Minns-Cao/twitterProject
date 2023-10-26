import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { warpAsync } from '~/utils/handlers'
// co the thay the bang : import {Router} from 'express'
const userRouter = Router()

// dùng warpAsync để bắt lỗi trong async
userRouter.get('/login', loginValidator, warpAsync(loginController))
userRouter.post('/register', registerValidator, warpAsync(registerController))

/**
 * @description : Đăng xuất
 * @path : /user/logout
 * @method post
 * @Header : {Authorization: 'Bearer <access_token>'}
 * @body : {refresh_token: string}
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, warpAsync(logoutController))

export default userRouter
