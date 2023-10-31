import { Router } from 'express'
import {
  emailVerifyTokenController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordValidator
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

/**
 * @description resend email verify token
 * khi email bị thất lạc, hoặc email_verify_token hết hạn, thì người dùng có nhu cầu resend email_verify_token
 * @path /users/resend-email-verify
 * @method post
 * @headers {Authorization: Bearer <access_token>} //đăng nhập mới cho resend email verify
 */
userRouter.post('/resend-email-verify', accessTokenValidator, warpAsync(resendEmailVerifyController))

/**
 * @description forgot password
 * khi người dùng quên mật khẩu, họ gửi email để xin mình tạo cho họ forgot password
 * @path /users/forgot-password
 * @method post
 * @body {email: string}
 */
userRouter.post('/forgot-password', forgotPasswordValidator, warpAsync(forgotPasswordController))

/**
 * @description reset password
 * khi người dùng nhấp vào link trong email để resetpassword họ sẽ gửi 1 req kềm theo forgot_pasword_token lên server
 * server sẽ kiểm tra forgot_password_token xem có hợp lệ hay không
 * @path /users/verify-forgot-password
 * @method post
 * @body {forgot_password_token: string}
 */
userRouter.post('/verify-forgot-password', verifyForgotPasswordValidator, warpAsync(verifyForgotPasswordController))

export default userRouter
