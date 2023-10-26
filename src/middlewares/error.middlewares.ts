import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // lỗi từ các nơi sẽ dồn về đây
  // dùng hàm omit từ thư viện lodash để loại bỏ status ra khỏi err (object)

  //nếu lỗi thuộc dạng err with status  thì trả về message và status
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }

  // nếu code chạy xuống được đây thì error sẽ là 1 lỗi mặc định
  // err{message, stack, name}
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  // ném lỗi đó cho người dùng
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    // errorInfor: err //truyền vậy là truyền lên cả stack(full lỗi và đường dẫn của file lỗi)
    errorInfor: omit(err, ['stack']) //truyền vậy là chỉ truyền lên message
  })
}
