/* eslint-disable prettier/prettier */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/erroController');

const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');


const app = express();
// 1 Global  Middlewares
// Set security HTTP headers
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1'
  })
);
app.options('*',cors());


//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same Api
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Muitas requisições desse IP, Por favor tente em uma hora!',
});
app.use('/api', limiter);

// Body passer, reading data from body into req req.body
app.use(express.json({ limit: '10kb' }));
app.use (express.urlencoded({ extended:true, limit: '10kb'}))
app.use(cookieParser());




// Data sanatization against noSQL query injection
app.use(mongoSanatize());

// Data sanitization agains XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  // eslint-disable-next-line no-console
  next();
});



app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//
