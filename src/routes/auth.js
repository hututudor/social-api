const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/register',
  middlewares.validate(validators.auth.register),
  controllers.authController.register
);

router.post(
  '/login',
  middlewares.validate(validators.auth.login),
  controllers.authController.login
);

router.get('/confirm/:confirmation', controllers.authController.confirm);

module.exports = router;
