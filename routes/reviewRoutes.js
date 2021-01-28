const express = require('express');
const reviewControler = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, reviewControler.getAllReview)
  .post(
    authController.protect,
    authController.restrictTO('user'),
    reviewControler.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewControler.getAllReview)
  .patch(
    authController.protect,
    authController.restrictTO('admin', 'lead-guide'),
    reviewControler.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTO('admin', 'lead-guide'),
    reviewControler.deleteReview
  );
module.exports = router;
