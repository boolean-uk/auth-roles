const express = require('express');
require('express-async-errors');
const app = express();
const { PrismaClientKnownRequestError } = require("@prisma/client")

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
          return res.status(409).json({ error: "A user with the provided username already exists" })
        }
        if (err.code === "P2025") {
            return res.status(409).json({ error: "A user with the provided ID does not exist" })
        }
    }

    res.status(500).json({ message: "Oops, something went wrong." })
})

module.exports = app
