import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { warpAsync } from '~/utils/handlers'
// co the thay the bang : import {Router} from 'express'
const userRouter = Router()

userRouter.get('/login', loginValidator, loginController)
userRouter.post('/register', registerValidator, warpAsync(registerController))

export default userRouter
