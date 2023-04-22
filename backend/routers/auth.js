const {check} = require("express-validator");
const Router = require('express')
const router = new Router()
const authController = require('../controllers/Auth')

router.post('/registration', [
  check('username', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
  ], authController.registration);

router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;