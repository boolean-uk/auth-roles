const express = require('express');
require('express-async-errors');
const app = express();
const { PrismaClientKnownRequestError } = require("@prisma/client")
const messages = require('./errorMessages.js')

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/user');
app.use('/users', userRouter);

const postRouter = require('./routers/post');
app.use('/posts', postRouter);

app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(409).json({ error: messages.existingUsername })
        }
        if (err.code === "P2025") {
            return res.status(409).json({ error: messages.invalidUserId })
        }
    }

    res.status(500).json({ message: messages.defaultErr })
})

module.exports = app
