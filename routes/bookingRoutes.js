const express = require('express');
const bookController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.get(
  '/checkout-session/():tourID',
  authController.protect,
  bookController.getCheckoutSession
);
router.use(authController.restrictTO('admin','lead-guide'));

router.route('/')
  .get(bookController.getAllBookings)
  .post(bookController.createBooking);

router. route('/:id')
  .get(bookController.getBooking)
  .patch(bookController.updateBookings)
  .delete(bookController.deleteBooking);

module.exports = router;
