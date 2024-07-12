const express = require('express');
const app = express();

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

app.use('*', (req, res) => {
  res.status(404).json({
    message : 'Resource not found'
  })
})

app.use((error, req, res, next) => {
  res.status(500).json({
    message : 'Somthing went wrong!'
  })
})
module.exports = app
