import { Router } from 'express'
import {
  changePasswordController,
  emailVerifyTokenController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oAuthController,
  refreshTokenController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  unfollowController,
  updateMeController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middleware'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
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

/** 
 * @description: reset password
  * @path: '/reset-password'
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {forgot_password_token: string, password: string, confirm_password: string}
*/

userRouter.post(
  '/reset-password',
  resetPasswordValidator,
  verifyForgotPasswordValidator,
  warpAsync(resetPasswordController)
)

/*
des: get profile của user
path: '/me'
method: get
Header: {Authorization: Bearer <access_token>}
body: {}
*/
userRouter.get('/me', accessTokenValidator, warpAsync(getMeController))

userRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  updateMeValidator,
  warpAsync(updateMeController)
)

userRouter.get('/:username', warpAsync(getProfileController))

/*
des: Follow someone
path: '/follow'
method: post
headers: {Authorization: Bearer <access_token>}
body: {followed_user_id: string}
*/
userRouter.post('/follow', accessTokenValidator, verifiedUserValidator, followValidator, warpAsync(followController))

//accessTokenValidator dùng dể kiểm tra xem ngta có đăng nhập hay chưa, và có đc user_id của người dùng từ req.decoded_authorization
//verifiedUserValidator dùng để kiễm tra xem ngta đã verify email hay chưa, rồi thì mới cho follow người khác
//trong req.body có followed_user_id  là mã của người mà ngta muốn follow
//followValidator: kiểm tra followed_user_id truyền lên có đúng định dạng objectId hay không
//  account đó có tồn tại hay không
//followController: tiến hành thao tác tạo document vào collection followers

//test code follow
//user caom500 : 654c897aceecda98179fbc8b
//user caom400@admin.com : 654c89c07c0271dbae04b35d

/*
    des: unfollow someone
    path: '/unfollow/:user_id'
    method: delete
    headers: {Authorization: Bearer <access_token>}
  g}
    */
userRouter.delete(
  '/unfollow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  warpAsync(unfollowController)
)
//unfollowValidator: kiểm tra user_id truyền qua params có hợp lệ hay k?

/*
  des: change password
  path: 'users/change-password'
  method: PUT
  headers: {Authorization: Bearer <access_token>}
  Body: {old_password: string, password: string, confirm_password: string}
g}
  */
userRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  warpAsync(changePasswordController)
)
//changePasswordValidator kiểm tra các giá trị truyền lên trên body cớ valid k ?

/*
  des: refreshtoken
  path: '/refresh-token'
  method: POST
  Body: {refresh_token: string}
g}
  */
userRouter.post('/refresh-token', refreshTokenValidator, warpAsync(refreshTokenController))
//khỏi kiểm tra accesstoken, tại nó hết hạn rồi mà

userRouter.get('/oauth/google', warpAsync(oAuthController))
export default userRouter
