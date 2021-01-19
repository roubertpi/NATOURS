/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/erroController');


const tourRouter = require ('./routes/tourRoutes.js');
const userRouter = require ('./routes/userRoutes.js');

const app = express();
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV ==='development'){
  app.use (morgan('dev')); 
}
// 1 Middlewares

app.use (express.json());
app.use (express.static(`${__dirname}/public`));


app.use ((req,res, next)=>{
  console.log('teste ok');
  next();
});


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

app.all('*',(req,res,next)=>{
  next(new AppError (`Can't find ${req.originalUrl} on this server!`));
});

app.use (globalErrorHandler);

module.exports=app;