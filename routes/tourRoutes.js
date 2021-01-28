const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use('/:tourId/reviews',reviewRouter)
//router .param('id',tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTurStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTours)
  .patch(
    authController.protect,
    authController.restrictTO('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTO('admin', 'lead-guide'),
    tourController.deleteTour
  );

// POST/tour/234dadjf/reviews
// GET/tour/234dadjf/reviews
// GET/tour/234dadjf/reviews/232kdsfjksdf


module.exports = router;
