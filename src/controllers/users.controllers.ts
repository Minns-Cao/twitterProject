import { Request, Response } from 'express'
import usersService from '~/services/users.serivces'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'admin@admin.com' && password === '123123') {
    return res.json({
      message: 'login successfully',
      data: [
        { fname: 'Minh', yob: 2004 },
        { fname: 'Chau', yob: 2011 },
        { fname: 'Linh', yob: 2006 }
      ]
    })
  }
  return res.status(401).json({
    message: 'login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    console.log(result)
    return res.json({
      message: 'Register success',
      result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Register failed', //chỉnh lại thông báo
      err
    })
  }
}
