import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import userRouter from './routers/user.js'
import postRouter from './routers/post.js'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/posts', postRouter)

export default app
