const express = require('express');
const reviewControler = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get( reviewControler.getAllReview)
  .post(
    authController.protect,
    authController.restrictTO('user'),
    reviewControler.setTourUserIds,
    reviewControler.createReview
  );

router
  .route('/:id')
  .get(reviewControler.getReview)
  .patch(reviewControler.updateReview)
  .delete(
    reviewControler.deleteReview
  );
module.exports = router;
