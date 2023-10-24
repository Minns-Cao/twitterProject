import { Request, Response } from 'express'
import usersService from '~/services/users.serivces'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = async (req: Request, res: Response) => {
  // lấy user_id từ user của req
  const { user }: any = req
  const user_id = user._id // là đối tượng trên mongoDB nên có _id
  // dùng user_id access_token và refesh_token
  const result = await usersService.login(user_id.toString())
  //res về access_token và refesh_token cho client
  res.json({
    massage: 'Login successfully',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  console.log(result)
  return res.json({
    message: 'Register success',
    result
  })
}
