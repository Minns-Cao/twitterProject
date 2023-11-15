import express, { NextFunction, Request, Response } from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
config()

initFolder()

const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
databaseService.connect()

//route mặc định là 3000
app.get('/', (req, res) => {
  res.send('hello world22')
})

app.use('/users', userRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server đang mở trên port ${port}`)
})
