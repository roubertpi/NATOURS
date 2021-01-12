const express = require('express');
const { nextTick } = require('process');
const morgan= require('morgan')

const tourRouter = require ('./routes/tourRoutes.js');
const userRouter = require ('./routes/userRoutes.js');

const app = express();

app.use (express.json());

// 1 Middlewares
app.use (morgan('dev')); 

app.use ((req,res, next)=>{
  console.log('teste ok');
  next();
});


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports = app;