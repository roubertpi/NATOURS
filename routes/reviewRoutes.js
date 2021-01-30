const express = require('express');
const reviewControler = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get( reviewControler.getAllReview)
  .post(
    authController.restrictTO('user'),
    reviewControler.setTourUserIds,
    reviewControler.createReview
  );

router
  .route('/:id')
  .get(reviewControler.getReview)
  .patch(authController.restrictTO('user','admin'),reviewControler.updateReview)
  .delete(authController.restrictTO('user','admin'),reviewControler.deleteReview);
module.exports = router;
