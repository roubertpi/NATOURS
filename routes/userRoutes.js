const express = require('express');
const userController = require('../controllers/userControler');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// o que estiver abaixo não precisa implementar protect
router.use(authController.protect);

router.patch('/updateMyPassword',authController.updatePassword);
router.get('/me',userController.getMe,userController.getUser);
router.patch('/updateMe',  userController.updateme);
router.delete('/deleteMe', authController.protect, userController.deleteMe);


router.use (authController.restrictTO('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
