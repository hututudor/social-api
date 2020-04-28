const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/register',
  middlewares.validate(validators.auth.register),
  controllers.authController.register
);

module.exports = router;
