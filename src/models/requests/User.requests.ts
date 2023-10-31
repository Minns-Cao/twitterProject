import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_pasword: string
  date_of_birth: string
}

//định nghĩa req cho thằng logoutController
export interface LogoutReqBody {
  refresh_token: string
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}
