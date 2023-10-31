import { Router } from 'express'
import {
  emailVerifyTokenController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
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

/**
 * @description : Verify email token
 * khi người dùng đăng ký họ sẽ nhận được email có link dạng
 * http://localhost:4000/users/verify-email?token=<>
 * nếu mà nhấp vào link thì sẽ tạo ra req gửi lên email_verify_token lên server
 * server kiểm tra email_verify_token có hợp lệ hay không ?
 * thì từ decoded_email_verify_token lấy ra user_id
 * và vào user_id đó để có update email_verify_token thành '', verify thành 1, update_at
 * @path users/verify-email
 * @method post
 * @body {email_verify_token: string}
 */
userRouter.post('/verify-email', emailVerifyTokenValidator, warpAsync(emailVerifyTokenController))
export default userRouter
