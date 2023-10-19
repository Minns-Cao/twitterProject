import express from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'

const app = express()
app.use(express.json())
const PORT = 4000
databaseService.connect()

//route mặc định là 3000
app.get('/', (req, res) => {
  res.send('hello world22')
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server đang mở trên port ${PORT}`)
})
