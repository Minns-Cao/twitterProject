import { Request } from 'express'
import User from './models/schemas/User.schema'

// định nghĩa thêm cho request
// => trong user sẽ có thêm user?, có nghĩa là có thể có hoặc không
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
