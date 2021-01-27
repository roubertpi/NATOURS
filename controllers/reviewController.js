const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.find();
 
  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review,
    },
  });
});

exports.getReview = catchAsync(async(req,res,next)=>{
    const review = await Review.findById(req.params.id)
    if (!review) {
        return next(new AppError('No tour found with that ID', 404));
      }
      res.status(200).json({
        status: 'success',
        data: {
          review,
        },
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  });
  exports.updateReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  });
  exports.deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
  
    if (!review) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  });
  