const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')

app.disable('x-powered-by')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((err, req, res, next) => {
    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return res
                .status(409)
                .json({
                    error: 'A user with the provided username already exists',
                })
        }
    }


    console.log("here")

    res.status(500).json({ error: err.message })
})

const userRouter = require('./routers/user')
app.use('/users', userRouter)

const postRouter = require('./routers/post')

app.use('/posts', postRouter)

module.exports = app
